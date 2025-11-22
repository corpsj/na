"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Schedule {
    id: string;
    schedule_date: string;
    schedule_display: string;
    available_seats: number;
    total_seats: number;
    is_available: boolean;
    enrolled: number;
}

interface ScheduleManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    classId: string;
    className?: string;
    onSave?: () => void;
}

export default function ScheduleManagementModal({
    isOpen,
    onClose,
    classId,
    className = "",
    onSave,
}: ScheduleManagementModalProps) {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newSchedules, setNewSchedules] = useState<{date: string, display: string, seats: number}[]>([]);

    // 스케줄 로드
    useEffect(() => {
        if (isOpen && classId) {
            loadSchedules();
        }
    }, [isOpen, classId]);

    const loadSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/classes/${classId}/schedules`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '스케줄 로드 실패');
            }

            // schedules가 배열인지 확인 후 처리
            const schedulesList = Array.isArray(data.schedules) ? data.schedules : [];

            // enrolled 계산 (total_seats - available_seats)
            const schedulesWithEnrolled = schedulesList.map((s: any) => ({
                ...s,
                enrolled: s.total_seats - s.available_seats,
            }));

            setSchedules(schedulesWithEnrolled);
        } catch (error: any) {
            console.error('Load schedules error:', error);
            toast.error(error.message || '스케줄을 불러올 수 없습니다.');
            setSchedules([]); // 에러 시 빈 배열로 설정
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNewScheduleInput = () => {
        setNewSchedules([...newSchedules, { date: "", display: "", seats: 6 }]);
    };

    const handleNewScheduleChange = (index: number, field: string, value: any) => {
        const updated = [...newSchedules];
        updated[index] = { ...updated[index], [field]: value };
        setNewSchedules(updated);
    };

    const handleRemoveNewSchedule = (index: number) => {
        setNewSchedules(newSchedules.filter((_, i) => i !== index));
    };

    const handleDeleteSchedule = async (scheduleId: string) => {
        if (!confirm('이 일정을 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/classes/${classId}/schedules?schedule_id=${scheduleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || '삭제 실패');
            }

            toast.success('일정이 삭제되었습니다.');
            loadSchedules(); // 새로고침
        } catch (error: any) {
            console.error('Delete schedule error:', error);
            toast.error(error.message || '일정 삭제에 실패했습니다.');
        }
    };

    const handleSave = async () => {
        // 새 스케줄만 저장 (기존 스케줄은 삭제만 가능)
        if (newSchedules.length === 0) {
            toast.info('추가할 일정이 없습니다.');
            onClose();
            return;
        }

        // 검증
        for (const schedule of newSchedules) {
            if (!schedule.date.trim() || !schedule.display.trim()) {
                toast.error('날짜와 표시 정보를 모두 입력해주세요.');
                return;
            }
            if (schedule.seats <= 0) {
                toast.error('정원은 1명 이상이어야 합니다.');
                return;
            }
        }

        setIsSaving(true);

        try {
            // 각 새 스케줄을 API로 전송
            for (const schedule of newSchedules) {
                const response = await fetch(`/api/classes/${classId}/schedules`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        schedule_date: schedule.date,
                        schedule_display: schedule.display,
                        total_seats: schedule.seats,
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || '일정 추가 실패');
                }
            }

            toast.success('일정이 저장되었습니다.');
            setNewSchedules([]); // 초기화
            loadSchedules(); // 새로고침
            if (onSave) onSave();
            onClose();
        } catch (error: any) {
            console.error('Save schedules error:', error);
            toast.error(error.message || '일정 저장에 실패했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                    <div>
                        <h2 className="text-xl font-serif text-white">일정 관리</h2>
                        {className && <p className="text-sm text-primary mt-1">{className}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* 기존 스케줄 */}
                            {schedules.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-400">등록된 일정</h3>
                                    {schedules.map((schedule) => (
                                        <div key={schedule.id} className="bg-black/30 border border-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            <div className="flex-1 w-full">
                                                <p className="text-white">{schedule.schedule_display}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(schedule.schedule_date).toLocaleString('ko-KR')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm text-gray-400">
                                                    <Users className="inline w-4 h-4 mr-1" />
                                                    <span>{schedule.enrolled} / {schedule.total_seats}</span>
                                                </div>
                                                <div className={`text-xs px-2 py-1 rounded-full ${
                                                    schedule.is_available
                                                        ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                                                        : 'bg-gray-700 text-gray-500 border border-gray-600'
                                                }`}>
                                                    {schedule.is_available ? '예약 가능' : '마감'}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteSchedule(schedule.id)}
                                                    disabled={schedule.enrolled > 0}
                                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                    title={schedule.enrolled > 0 ? '수강생이 있어 삭제할 수 없습니다' : '삭제'}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 새 스케줄 추가 */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-medium text-gray-400">새 일정 추가</h3>
                                    <button
                                        onClick={handleAddNewScheduleInput}
                                        className="text-primary text-sm font-bold flex items-center gap-1 hover:text-red-400"
                                    >
                                        <Plus size={16} /> 일정 추가
                                    </button>
                                </div>

                                {newSchedules.length > 0 && (
                                    <div className="space-y-3">
                                        {newSchedules.map((schedule, index) => (
                                            <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                                                    <div className="md:col-span-5">
                                                        <label className="block text-xs text-gray-500 mb-1">날짜/시간 (YYYY-MM-DD HH:MM)</label>
                                                        <input
                                                            type="text"
                                                            value={schedule.date}
                                                            onChange={(e) => handleNewScheduleChange(index, "date", e.target.value)}
                                                            className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                                            placeholder="2024-12-14 14:00"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-5">
                                                        <label className="block text-xs text-gray-500 mb-1">표시 텍스트</label>
                                                        <input
                                                            type="text"
                                                            value={schedule.display}
                                                            onChange={(e) => handleNewScheduleChange(index, "display", e.target.value)}
                                                            className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                                            placeholder="12월 14일 (토) 14:00"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs text-gray-500 mb-1">정원</label>
                                                        <input
                                                            type="number"
                                                            value={schedule.seats}
                                                            onChange={(e) => handleNewScheduleChange(index, "seats", parseInt(e.target.value) || 0)}
                                                            className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveNewSchedule(index)}
                                                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="inline w-3 h-3 mr-1" /> 제거
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900 sticky bottom-0">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSaving ? '저장 중...' : '저장하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}
