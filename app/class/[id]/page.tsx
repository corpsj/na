import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // 1시간마다 재생성

export default async function ClassDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    // 클래스 상세 정보 및 스케줄 조회
    const { data: classDetail, error } = await supabase
        .from('classes')
        .select(`
            *,
            schedules:class_schedules(*)
        `)
        .eq('id', id)
        .single();

    if (error || !classDetail) {
        notFound();
    }

    // 스케줄 정보 정리
    const schedules = classDetail.schedules || [];

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={classDetail.image_url}
                    alt={classDetail.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <FadeIn>
                        {classDetail.category && (
                            <p className="text-primary text-sm tracking-widest uppercase mb-4 font-medium">
                                {classDetail.category}
                            </p>
                        )}
                        <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
                            {classDetail.title}
                        </h1>
                        {classDetail.subtitle && (
                            <p className="text-gray-200 text-lg font-light">
                                {classDetail.subtitle}
                            </p>
                        )}
                    </FadeIn>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-10">
                {/* Info Grid */}
                <FadeIn delay={200}>
                    <div className="bg-black/80 backdrop-blur-md border border-gray-800 mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    소요 시간
                                </h3>
                                <p className="text-white text-lg font-serif">{classDetail.duration}</p>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    장소
                                </h3>
                                <p className="text-white text-lg font-serif">{classDetail.location}</p>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    난이도 및 정원
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {classDetail.level && (
                                        <span className="text-white text-lg font-serif">{classDetail.level}</span>
                                    )}
                                    {classDetail.capacity && (
                                        <span className="text-gray-400 text-sm">{classDetail.capacity}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    수강료
                                </h3>
                                <p className="text-white text-lg font-serif">{classDetail.price_display}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Description */}
                    <div className="md:col-span-8 space-y-12">
                        <FadeIn delay={300}>
                            <h3 className="text-white text-xl font-serif mb-8 border-l-2 border-primary pl-4">
                                클래스 소개
                            </h3>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 leading-loose text-lg font-light whitespace-pre-line break-keep">
                                    {classDetail.description}
                                </p>
                            </div>
                        </FadeIn>

                        {/* Curriculum */}
                        {classDetail.curriculum && classDetail.curriculum.length > 0 && (
                            <FadeIn delay={400}>
                                <h3 className="text-white text-xl font-serif mb-8 border-l-2 border-primary pl-4">
                                    커리큘럼
                                </h3>
                                <div className="space-y-6">
                                    {classDetail.curriculum.map((item: any, index: number) => (
                                        <div key={index} className="flex gap-6 group">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-full border-2 border-primary/30 group-hover:border-primary flex items-center justify-center transition-colors">
                                                    <span className="text-primary font-bold">{item.step}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h4 className="text-white font-serif text-lg mb-2">{item.title}</h4>
                                                <p className="text-gray-400 leading-relaxed">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        )}

                        {/* Schedules */}
                        {schedules.length > 0 && (
                            <FadeIn delay={500}>
                                <h3 className="text-white text-xl font-serif mb-8 border-l-2 border-primary pl-4">
                                    수업 일정
                                </h3>
                                <div className="space-y-3">
                                    {schedules.map((schedule: any) => (
                                        <div
                                            key={schedule.id}
                                            className="flex items-center justify-between p-4 border border-gray-800 hover:border-primary/30 transition-colors"
                                        >
                                            <span className="text-white">{schedule.schedule_display}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-gray-400">
                                                    {schedule.available_seats}석 남음
                                                </span>
                                                {schedule.is_available ? (
                                                    <span className="text-xs text-green-500 border border-green-500/30 px-2 py-1 rounded-full">
                                                        예약 가능
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded-full">
                                                        마감
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        )}
                    </div>

                    {/* Sidebar - Policy & Bank Info */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Policy */}
                        {classDetail.policy && (
                            <FadeIn delay={400}>
                                <div className="bg-gray-900/30 border border-gray-800 p-8 sticky top-32">
                                    <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6 text-left">
                                        환불 규정 및 유의사항
                                    </h3>
                                    <div className="space-y-4">
                                        {classDetail.policy.refund && (
                                            <div className="text-left">
                                                <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">환불 규정</p>
                                                <p className="text-gray-300 text-sm leading-relaxed font-light whitespace-pre-line">
                                                    {classDetail.policy.refund}
                                                </p>
                                            </div>
                                        )}
                                        {classDetail.policy.note && (
                                            <>
                                                <div className="w-full h-px bg-gray-800/50"></div>
                                                <div className="text-left">
                                                    <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">유의사항</p>
                                                    <p className="text-gray-300 text-sm leading-relaxed font-light whitespace-pre-line">
                                                        {classDetail.policy.note}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </FadeIn>
                        )}

                        {/* Bank Info */}
                        {classDetail.bank_info && (
                            <FadeIn delay={500}>
                                <div className="bg-gray-900/30 border border-gray-800 p-8">
                                    <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6 text-left">
                                        입금 정보
                                    </h3>
                                    <div className="space-y-3 text-left">
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">은행</p>
                                            <p className="text-white">{classDetail.bank_info.bank}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">계좌번호</p>
                                            <p className="text-white font-mono">{classDetail.bank_info.account}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">예금주</p>
                                            <p className="text-white">{classDetail.bank_info.holder}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky CTA */}
            {classDetail.is_active && (
                <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 p-4 z-50">
                    <div className="container mx-auto max-w-4xl flex justify-between items-center">
                        <div className="hidden md:block">
                            <p className="text-white font-medium">{classDetail.title}</p>
                            <p className="text-gray-500 text-sm">{classDetail.duration}</p>
                        </div>
                        <Link
                            href={`/class/${id}/apply`}
                            className="w-full md:w-auto bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors text-center"
                        >
                            수강 신청하기
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
