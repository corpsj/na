"use client";

import { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ClassFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export default function ClassFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: ClassFormModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        category: "One-day Class",
        level: "Beginner",
        location: "Byunhwa Studio, Hannam-dong",
        price: "",
        capacity: "",
        image: "",
        description: "",
        schedules: [""],
        curriculum: [{ step: "01", title: "", content: "" }],
        policy: {
            refund: "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
            note: "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 수업 중 촬영된 사진은 포트폴리오로 활용될 수 있습니다.",
        },
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleScheduleChange = (index: number, value: string) => {
        const newSchedules = [...formData.schedules];
        newSchedules[index] = value;
        setFormData({ ...formData, schedules: newSchedules });
    };

    const addSchedule = () => {
        setFormData({ ...formData, schedules: [...formData.schedules, ""] });
    };

    const removeSchedule = (index: number) => {
        const newSchedules = formData.schedules.filter((_, i) => i !== index);
        setFormData({ ...formData, schedules: newSchedules });
    };

    const handleCurriculumChange = (index: number, field: string, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index] = { ...newCurriculum[index], [field]: value };
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const addCurriculumStep = () => {
        const nextStep = (formData.curriculum.length + 1).toString().padStart(2, "0");
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { step: nextStep, title: "", content: "" }],
        });
    };

    const removeCurriculumStep = (index: number) => {
        const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
        // Re-index steps
        const reIndexed = newCurriculum.map((item, i) => ({
            ...item,
            step: (i + 1).toString().padStart(2, "0"),
        }));
        setFormData({ ...formData, curriculum: reIndexed });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                    <h2 className="text-xl font-serif text-white">
                        {initialData ? "클래스 수정" : "새 클래스 등록"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">클래스명</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">부제 (한글)</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">카테고리</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                >
                                    <option>One-day Class</option>
                                    <option>Regular Course</option>
                                    <option>Master Class</option>
                                    <option>Workshop</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">난이도</label>
                                <input
                                    type="text"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">수강료</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="예: 150,000 KRW"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">정원</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="예: Max 6 people"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">장소</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">설명</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                            />
                        </div>
                    </section>

                    {/* Image */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">이미지</h3>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-black/20">
                            {formData.image ? (
                                <div className="relative w-full h-64">
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "" })}
                                        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 text-gray-500 mb-3" />
                                    <p className="text-sm text-gray-400">클릭하여 이미지를 업로드하세요</p>
                                </>
                            )}
                        </div>
                    </section>

                    {/* Schedules */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <h3 className="text-lg font-medium text-white">일정</h3>
                            <button type="button" onClick={addSchedule} className="text-primary text-sm font-bold flex items-center gap-1 hover:text-red-400">
                                <Plus size={16} /> 일정 추가
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.schedules.map((schedule, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={schedule}
                                        onChange={(e) => handleScheduleChange(index, e.target.value)}
                                        className="flex-1 bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                        placeholder="예: 12월 14일 (토) 14:00"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSchedule(index)}
                                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Curriculum */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <h3 className="text-lg font-medium text-white">커리큘럼</h3>
                            <button type="button" onClick={addCurriculumStep} className="text-primary text-sm font-bold flex items-center gap-1 hover:text-red-400">
                                <Plus size={16} /> 단계 추가
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.curriculum.map((item, index) => (
                                <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 relative">
                                    <button
                                        type="button"
                                        onClick={() => removeCurriculumStep(index)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div className="md:col-span-1">
                                            <label className="block text-xs text-gray-500 mb-1">Step</label>
                                            <input
                                                type="text"
                                                value={item.step}
                                                readOnly
                                                className="w-full bg-black/30 border border-gray-700 rounded px-2 py-1 text-white text-center"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="block text-xs text-gray-500 mb-1">제목</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleCurriculumChange(index, "title", e.target.value)}
                                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="md:col-span-7">
                                            <label className="block text-xs text-gray-500 mb-1">내용</label>
                                            <input
                                                type="text"
                                                value={item.content}
                                                onChange={(e) => handleCurriculumChange(index, "content", e.target.value)}
                                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Policy */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">규정 및 유의사항</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">환불 규정</label>
                                <textarea
                                    rows={4}
                                    value={formData.policy.refund}
                                    onChange={(e) => setFormData({ ...formData, policy: { ...formData.policy, refund: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">유의사항</label>
                                <textarea
                                    rows={4}
                                    value={formData.policy.note}
                                    onChange={(e) => setFormData({ ...formData, policy: { ...formData.policy, note: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 sticky bottom-0 bg-gray-900 py-4 -mx-6 px-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors"
                        >
                            {initialData ? "수정 완료" : "등록하기"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
