"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Users } from "lucide-react";

interface ScheduleManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string; // Class name for display
    initialSchedules?: any[];
}

export default function ScheduleManagementModal({
    isOpen,
    onClose,
    className = "Winter Wreath Masterclass",
    initialSchedules = [],
}: ScheduleManagementModalProps) {
    const [schedules, setSchedules] = useState([
        { id: 1, date: "2024.12.14 (Sat) 14:00", capacity: 6, enrolled: 4, status: "Open" },
        { id: 2, date: "2024.12.15 (Sun) 14:00", capacity: 6, enrolled: 6, status: "Full" },
    ]);

    if (!isOpen) return null;

    const handleAddSchedule = () => {
        const newId = Math.max(...schedules.map(s => s.id), 0) + 1;
        setSchedules([...schedules, {
            id: newId,
            date: "",
            capacity: 6,
            enrolled: 0,
            status: "Open"
        }]);
    };

    const handleRemoveSchedule = (id: number) => {
        setSchedules(schedules.filter(s => s.id !== id));
    };

    const handleUpdateSchedule = (id: number, field: string, value: any) => {
        setSchedules(schedules.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                    <div>
                        <h2 className="text-xl font-serif text-white">일정 관리</h2>
                        <p className="text-sm text-primary mt-1">{className}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddSchedule}
                            className="text-primary text-sm font-bold flex items-center gap-1 hover:text-red-400"
                        >
                            <Plus size={16} /> 일정 추가
                        </button>
                    </div>

                    <div className="space-y-4">
                        {schedules.map((schedule) => (
                            <div key={schedule.id} className="bg-black/30 border border-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs text-gray-500 mb-1">날짜 및 시간</label>
                                    <input
                                        type="text"
                                        value={schedule.date}
                                        onChange={(e) => handleUpdateSchedule(schedule.id, "date", e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                        placeholder="예: 2024.12.14 (Sat) 14:00"
                                    />
                                </div>
                                <div className="w-full md:w-24">
                                    <label className="block text-xs text-gray-500 mb-1">정원</label>
                                    <input
                                        type="number"
                                        value={schedule.capacity}
                                        onChange={(e) => handleUpdateSchedule(schedule.id, "capacity", parseInt(e.target.value))}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="w-full md:w-32">
                                    <label className="block text-xs text-gray-500 mb-1">현황</label>
                                    <div className="flex items-center gap-2 text-sm text-gray-300 h-[38px]">
                                        <Users size={14} />
                                        <span>{schedule.enrolled} / {schedule.capacity}</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto flex justify-end mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleRemoveSchedule(schedule.id)}
                                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => {
                            alert("일정이 저장되었습니다.");
                            onClose();
                        }}
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors"
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}
