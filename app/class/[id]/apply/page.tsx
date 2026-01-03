"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Class, ClassSchedule } from "@/types/database";

export default function ClassApplyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [classInfo, setClassInfo] = useState<Class | null>(null);
    const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [selectedScheduleId, setSelectedScheduleId] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const supabase = createClient();

    // 클래스 정보 및 스케줄 로드
    useEffect(() => {
        async function loadClassInfo() {
            try {
                const { data: classData, error: classError } = await supabase
                    .from('classes')
                    .select(`
                        *,
                        schedules:class_schedules(*)
                    `)
                    .eq('id', id)
                    .single();

                if (classError) {
                    console.error('Error loading class:', classError);
                    router.push('/class');
                    return;
                }

                setClassInfo(classData);
                setSchedules(classData.schedules || []);
            } catch (error) {
                console.error('Unexpected error:', error);
                router.push('/class');
            } finally {
                setIsLoading(false);
            }
        }

        loadClassInfo();
    }, [id, router]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "이름을 입력해주세요.";
        if (!phone.trim()) newErrors.phone = "연락처를 입력해주세요.";
        if (!selectedSchedule) newErrors.schedule = "일정을 선택해주세요.";
        if (!agreed) newErrors.agreement = "환불 규정 및 유의사항에 동의해주세요.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !classInfo) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class_id: id,
                    schedule_id: selectedScheduleId || null,
                    name,
                    phone,
                    email: email || null,
                    schedule_display: selectedSchedule,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || '신청에 실패했습니다.');
            }

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error: any) {
            console.error('Submit error:', error);
            alert(error.message || '신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-400">클래스 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    // 클래스를 찾을 수 없음
    if (!classInfo) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">클래스를 찾을 수 없습니다.</p>
                    <Link href="/class" className="text-primary hover:underline">
                        클래스 목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    // 성공 화면
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
                        {classInfo.bank_info ? '아래 계좌로 입금해주시면 예약이 확정됩니다.' : '곧 연락드리겠습니다.'}
                    </p>

                    {classInfo.bank_info && (
                        <div className="bg-black p-6 mb-8 border border-gray-800">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">입금 계좌 안내</p>
                            <p className="text-white text-lg font-medium mb-1">{classInfo.bank_info.bank}</p>
                            <p className="text-primary text-xl font-bold mb-2">{classInfo.bank_info.account}</p>
                            <p className="text-gray-400 text-sm">예금주: {classInfo.bank_info.holder}</p>
                            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm">
                                <span className="text-gray-500">결제 금액</span>
                                <span className="text-white">{classInfo.price_display}</span>
                            </div>
                        </div>
                    )}

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
                        {classInfo.subtitle && (
                            <p className="text-gray-400 text-lg mb-6">{classInfo.subtitle}</p>
                        )}
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
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">이름 *</label>
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
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">연락처 *</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="010-0000-0000"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2 font-medium">이메일 (선택)</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="email@example.com"
                                    />
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
                            {schedules.length > 0 ? (
                                <div className="space-y-3">
                                    {schedules.map((schedule) => (
                                        <label
                                            key={schedule.id}
                                            className={`relative flex items-center justify-between p-5 border cursor-pointer transition-all duration-300 group ${
                                                selectedSchedule === schedule.schedule_display
                                                    ? "border-primary bg-primary/5"
                                                    : "border-gray-800 bg-gray-900/30 hover:border-gray-600 hover:bg-gray-900"
                                            } ${!schedule.is_available || schedule.available_seats <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="flex items-center flex-1">
                                                <input
                                                    type="radio"
                                                    name="schedule"
                                                    value={schedule.schedule_display}
                                                    checked={selectedSchedule === schedule.schedule_display}
                                                    onChange={(e) => {
                                                        setSelectedSchedule(e.target.value);
                                                        setSelectedScheduleId(schedule.id);
                                                    }}
                                                    disabled={!schedule.is_available || schedule.available_seats <= 0}
                                                    className="hidden"
                                                />
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-5 transition-colors ${
                                                    selectedSchedule === schedule.schedule_display
                                                        ? "border-primary"
                                                        : "border-gray-600 group-hover:border-gray-400"
                                                }`}>
                                                    {selectedSchedule === schedule.schedule_display && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                                    )}
                                                </div>
                                                <span className={`text-base transition-colors ${
                                                    selectedSchedule === schedule.schedule_display
                                                        ? "text-white font-medium"
                                                        : "text-gray-400 group-hover:text-gray-300"
                                                }`}>
                                                    {schedule.schedule_display}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 ml-4">
                                                {schedule.is_available && schedule.available_seats > 0 ? (
                                                    <span>{schedule.available_seats}석 남음</span>
                                                ) : (
                                                    <span className="text-red-500">마감</span>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">등록된 일정이 없습니다.</p>
                            )}
                            {errors.schedule && <p className="text-red-500 text-xs mt-2 ml-1">{errors.schedule}</p>}
                        </section>

                        {/* Refund Policy & Notes */}
                        {classInfo.policy && (
                            <section>
                                <div className="border-b border-gray-800 pb-4 mb-8">
                                    <h3 className="text-white text-xl font-serif">
                                        03. 환불 규정 및 유의사항
                                    </h3>
                                </div>
                                <div className="bg-gray-900/50 p-6 md:p-8 border border-gray-800 mb-6">
                                    <div className="text-gray-400 text-sm space-y-4 font-sans leading-relaxed break-keep">
                                        {classInfo.policy.refund && (
                                            <div>
                                                <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">환불 규정</p>
                                                <p className="whitespace-pre-line">{classInfo.policy.refund}</p>
                                            </div>
                                        )}
                                        {classInfo.policy.note && (
                                            <div>
                                                <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">유의사항</p>
                                                <p className="whitespace-pre-line">{classInfo.policy.note}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <label className="flex items-center cursor-pointer group select-none">
                                    <div className={`w-5 h-5 border flex items-center justify-center mr-3 transition-colors flex-shrink-0 ${
                                        agreed ? "border-primary bg-primary" : "border-gray-600 group-hover:border-gray-400"
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
                        )}

                        {/* Submit Button */}
                        <div className="pt-8 pb-10">
                            <button
                                type="submit"
                                disabled={isSubmitting || schedules.length === 0}
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
