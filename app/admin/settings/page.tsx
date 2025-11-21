```typescript
"use client";

import { useState } from "react";
import { Save, Lock, Bell, Power } from "lucide-react";
import { toast } from "sonner";

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

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("Change Password:", password);
        toast.success("비밀번호가 변경되었습니다.");
        setPassword({ current: "", new: "", confirm: "" });
    };

    const handleSettingChange = (key: string, value: boolean) => {
        setSettings({ ...settings, [key]: value });
        toast.success("설정이 저장되었습니다.");
    };

    return (
        <div className="max-w-2xl space-y-8">
            <h1 className="text-2xl font-serif text-white">설정</h1>

            {/* Password Change */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">관리자 비밀번호 변경</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">현재 비밀번호</label>
                        <input
                            type="password"
                            value={password.current}
                            onChange={(e) => setPassword({ ...password, current: e.target.value })}
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">새 비밀번호 확인</label>
                        <input
                            type="password"
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-red-900 transition-colors"
                        >
                            변경하기
                        </button>
                    </div>
                </form>
            </div>

            {/* Site Settings */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">사이트 설정</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">유지보수 모드</p>
                            <p className="text-xs text-gray-500">사이트 접속을 일시적으로 차단합니다.</p>
                        </div>
                        <button className="w-12 h-6 bg-gray-800 rounded-full relative transition-colors">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-gray-500 rounded-full transition-transform"></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">수강 신청 알림</p>
                            <p className="text-xs text-gray-500">새로운 수강 신청 시 이메일로 알림을 받습니다.</p>
                        </div>
                        <button className="w-12 h-6 bg-primary rounded-full relative transition-colors">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
