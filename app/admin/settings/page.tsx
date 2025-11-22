"use client";

import { useState, useEffect } from "react";
import { Lock, Power, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
    const [password, setPassword] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [settings, setSettings] = useState({
        maintenanceMode: false,
        notifications: true,
    });

    const [isLoadingSettings, setIsLoadingSettings] = useState(true);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const supabase = createClient();

    // 설정 로드
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoadingSettings(true);
            const { data, error } = await supabase
                .from('admin_settings')
                .select('*')
                .in('key', ['maintenance_mode', 'notifications_enabled']);

            if (error) throw error;

            const settingsMap: Record<string, string> = {};
            data?.forEach((setting) => {
                settingsMap[setting.key] = setting.value || 'false';
            });

            setSettings({
                maintenanceMode: settingsMap['maintenance_mode'] === 'true',
                notifications: settingsMap['notifications_enabled'] === 'true',
            });
        } catch (error) {
            console.error('Error loading settings:', error);
            toast.error('설정을 불러오는데 실패했습니다.');
        } finally {
            setIsLoadingSettings(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.current || !password.new || !password.confirm) {
            toast.error('모든 필드를 입력해주세요.');
            return;
        }

        if (password.new !== password.confirm) {
            toast.error('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        if (password.new.length < 6) {
            toast.error('새 비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        setIsChangingPassword(true);

        try {
            // 1. 현재 로그인된 사용자 정보 가져오기
            const { data: { user } } = await supabase.auth.getUser();

            if (!user || !user.email) {
                throw new Error('로그인 정보를 찾을 수 없습니다.');
            }

            // 2. 현재 비밀번호 검증 (재로그인 시도)
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: password.current,
            });

            if (signInError) {
                throw new Error('현재 비밀번호가 올바르지 않습니다.');
            }

            // 3. 비밀번호 변경
            const { error: updateError } = await supabase.auth.updateUser({
                password: password.new,
            });

            if (updateError) throw updateError;

            toast.success('비밀번호가 변경되었습니다.');
            setPassword({ current: "", new: "", confirm: "" });
        } catch (error: any) {
            console.error('Password change error:', error);
            toast.error(error.message || '비밀번호 변경에 실패했습니다.');
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleSettingChange = async (key: string, value: boolean) => {
        const settingKey = key === 'maintenanceMode' ? 'maintenance_mode' : 'notifications_enabled';

        try {
            // Upsert (Update or Insert) 설정
            const { error } = await supabase
                .from('admin_settings')
                .upsert({
                    key: settingKey,
                    value: value.toString(),
                    description: key === 'maintenanceMode'
                        ? '사이트 유지보수 모드 활성화 여부'
                        : '새 수강 신청 알림 활성화 여부',
                }, {
                    onConflict: 'key'
                });

            if (error) throw error;

            setSettings({ ...settings, [key]: value });
            toast.success('설정이 저장되었습니다.');
        } catch (error) {
            console.error('Setting update error:', error);
            toast.error('설정 저장에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-2xl space-y-8">
            <h1 className="text-2xl font-serif text-white">설정</h1>

            {/* Password Change */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-medium text-white">관리자 비밀번호 변경</h2>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">현재 비밀번호</label>
                        <input
                            type="password"
                            value={password.current}
                            onChange={(e) => setPassword({ ...password, current: e.target.value })}
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                            placeholder="현재 비밀번호 입력"
                            disabled={isChangingPassword}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            value={password.new}
                            onChange={(e) => setPassword({ ...password, new: e.target.value })}
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                            placeholder="새 비밀번호 입력 (최소 6자)"
                            disabled={isChangingPassword}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={password.confirm}
                            onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                            placeholder="새 비밀번호 다시 입력"
                            disabled={isChangingPassword}
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={isChangingPassword}
                            className="bg-primary text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isChangingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isChangingPassword ? '변경 중...' : '변경하기'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Site Settings */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Power className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-medium text-white">사이트 설정</h2>
                </div>

                {isLoadingSettings ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                            <div>
                                <p className="text-white font-medium">유지보수 모드</p>
                                <p className="text-xs text-gray-500 mt-1">사이트 접속을 일시적으로 차단합니다.</p>
                            </div>
                            <button
                                onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenanceMode ? 'bg-primary' : 'bg-gray-700'}`}
                                aria-label="유지보수 모드 토글"
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                            <div>
                                <p className="text-white font-medium">수강 신청 알림</p>
                                <p className="text-xs text-gray-500 mt-1">새로운 수강 신청 시 이메일로 알림을 받습니다.</p>
                            </div>
                            <button
                                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings.notifications ? 'bg-primary' : 'bg-gray-700'}`}
                                aria-label="알림 토글"
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notifications ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Info Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                    💡 <strong>참고:</strong> 비밀번호는 Supabase Auth에서 관리되며, 설정 값은 데이터베이스에 저장됩니다.
                </p>
            </div>
        </div>
    );
}
