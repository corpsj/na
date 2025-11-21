"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

import { getClassById } from "@/data/classData";

export default function ClassApplyPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id) || 1;
    const classInfo = getClassById(id);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!classInfo) return <div>Class not found</div>;

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "Please enter your name.";
        if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
        if (!selectedSchedule) newErrors.schedule = "Please select a schedule.";
        if (!agreed) newErrors.agreement = "You must agree to the policy.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-gray-900 p-8 border border-gray-800 text-center shadow-2xl">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-3xl text-white mb-4">신청이 접수되었습니다</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        신청해주셔서 감사합니다.<br />
                        아래 계좌로 입금해주시면 예약이 확정됩니다.
                    </p>

                    <div className="bg-black p-6 mb-8 border border-gray-800">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">입금 계좌 안내</p>
                        <p className="text-white text-lg font-medium mb-1">{classInfo.bankInfo.bank}</p>
                        <p className="text-primary text-xl font-bold mb-2">{classInfo.bankInfo.account}</p>
                        <p className="text-gray-400 text-sm">예금주: {classInfo.bankInfo.holder}</p>
                        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm">
                            <span className="text-gray-500">결제 금액</span>
                            <span className="text-white">{classInfo.price}</span>
                        </div>
                    </div>

                    <Link
                        href="/class"
                        className="block w-full py-4 bg-white text-black font-bold tracking-widest hover:bg-gray-200 transition-colors uppercase text-sm"
                    >
                        클래스 목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-xl">
                <FadeIn>
                    <div className="text-center mb-16">
                        <p className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase mb-4 font-medium">
                            APPLICATION
                        </p>
                        <h1 className="font-serif text-3xl md:text-4xl text-white mb-6">
                            {classInfo.title}
                        </h1>
                        <div className="w-12 h-px bg-gray-800 mx-auto"></div>
                    </div>
                </FadeIn>

                <FadeIn delay={200}>
                    <form onSubmit={handleSubmit} className="space-y-16">
                        {/* Student Info */}
                        <section>
                            <div className="flex items-baseline justify-between border-b border-gray-800 pb-4 mb-8">
                                <h3 className="text-white text-xl font-serif">
                                    01. 수강생 정보
                                </h3>
                                <span className="text-xs text-gray-500">* 필수 입력</span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">이름</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="이름을 입력하세요"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-2 ml-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">연락처</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="010-0000-0000"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Schedule Selection */}
                        <section>
                            <div className="flex items-baseline justify-between border-b border-gray-800 pb-4 mb-8">
                                <h3 className="text-white text-xl font-serif">
                                    02. 일정 선택
                                </h3>
                                <span className="text-xs text-gray-500">택 1</span>
                            </div>
                            <div className="space-y-3">
                                {classInfo.schedules.map((schedule) => (
                                    <label
                                        key={schedule}
                                        className={`relative flex items-center p-5 border cursor-pointer transition-all duration-300 group ${selectedSchedule === schedule
                                            ? "border-primary bg-primary/5"
                                            : "border-gray-800 bg-gray-900/30 hover:border-gray-600 hover:bg-gray-900"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="schedule"
                                            value={schedule}
                                            checked={selectedSchedule === schedule}
                                            onChange={(e) => setSelectedSchedule(e.target.value)}
                                            className="hidden"
                                        />
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-5 transition-colors ${selectedSchedule === schedule ? "border-primary" : "border-gray-600 group-hover:border-gray-400"
                                            }`}>
                                            {selectedSchedule === schedule && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className={`text-base transition-colors ${selectedSchedule === schedule ? "text-white font-medium" : "text-gray-400 group-hover:text-gray-300"}`}>
                                            {schedule}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.schedule && <p className="text-red-500 text-xs mt-2 ml-1">{errors.schedule}</p>}
                        </section>

                        {/* Refund Policy & Notes */}
                        <section>
                            <div className="border-b border-gray-800 pb-4 mb-8">
                                <h3 className="text-white text-xl font-serif">
                                    03. 환불 규정 및 유의사항
                                </h3>
                            </div>
                            <div className="bg-gray-900/50 p-6 md:p-8 border border-gray-800 mb-6">
                                <div className="text-gray-400 text-sm space-y-3 font-sans leading-relaxed break-keep">
                                    <p className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {classInfo.policy.refund}
                                    </p>
                                    <p className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {classInfo.policy.note}
                                    </p>
                                </div>
                            </div>
                            <label className="flex items-center cursor-pointer group select-none">
                                <div className={`w-5 h-5 border flex items-center justify-center mr-3 transition-colors flex-shrink-0 ${agreed ? "border-primary bg-primary" : "border-gray-600 group-hover:border-gray-400"
                                    }`}>
                                    {agreed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-black">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="hidden"
                                />
                                <span className={`text-sm transition-colors ${agreed ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                                    위 내용을 확인하였으며 동의합니다.
                                </span>
                            </label>
                            {errors.agreement && <p className="text-red-500 text-xs mt-2 ml-1">{errors.agreement}</p>}
                        </section>

                        {/* Submit Button */}
                        <div className="pt-8 pb-10">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-5 text-lg hover:bg-gray-100 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                            >
                                {isSubmitting ? "처리 중..." : "신청하기"}
                            </button>
                        </div>
                    </form>
                </FadeIn>
            </div>
        </div>
    );
}
