"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useParams } from "next/navigation";

import { getClassById } from "@/data/classData";

export default function ClassDetailPage() {
    const params = useParams();
    const id = Number(params.id) || 1; // Default to 1 for now
    const classDetail = getClassById(id);

    if (!classDetail) return <div>Class not found</div>;

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={classDetail.image}
                    alt={classDetail.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <FadeIn>
                        <p className="text-primary text-sm tracking-widest uppercase mb-4 font-medium">
                            {classDetail.category}
                        </p>
                        <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
                            {classDetail.title}
                        </h1>
                        <p className="text-gray-200 text-lg font-light">
                            {classDetail.subtitle}
                        </p>
                    </FadeIn>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-10">
                {/* Info Grid - Compact & Refined */}
                <FadeIn delay={200}>
                    <div className="bg-black/80 backdrop-blur-md border-y border-gray-800 mb-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800/50">
                            <div className="p-6 text-center hover:bg-white/5 transition-colors">
                                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2">일시</h3>
                                <p className="text-white text-sm md:text-base font-serif">{classDetail.date}</p>
                                <p className="text-gray-500 text-xs mt-1">{classDetail.time}</p>
                            </div>
                            <div className="p-6 text-center hover:bg-white/5 transition-colors">
                                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2">장소</h3>
                                <p className="text-white text-sm md:text-base font-serif">{classDetail.location}</p>
                            </div>
                            <div className="p-6 text-center hover:bg-white/5 transition-colors">
                                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2">난이도 / 정원</h3>
                                <p className="text-white text-sm md:text-base font-serif">
                                    {classDetail.level} <span className="text-gray-600 mx-1">|</span> {classDetail.capacity}
                                </p>
                            </div>
                            <div className="p-6 text-center hover:bg-white/5 transition-colors">
                                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2">수강료</h3>
                                <p className="text-white text-sm md:text-base font-serif">{classDetail.price}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* About */}
                <FadeIn delay={300}>
                    <div className="mb-20 max-w-2xl mx-auto text-center">
                        <p className="text-gray-300 leading-loose text-base md:text-lg font-light whitespace-pre-line break-keep">
                            {classDetail.description}
                        </p>
                    </div>
                </FadeIn>

                {/* Policy */}
                <FadeIn delay={400}>
                    <div className="max-w-3xl mx-auto border-t border-gray-800 pt-12 pb-8">
                        <h2 className="font-serif text-lg text-white mb-6 text-center">
                            Refund Policy & Notes
                        </h2>
                        <div className="text-gray-500 space-y-2 text-xs md:text-sm leading-relaxed font-light text-center">
                            <p>{classDetail.policy.refund}</p>
                            <p>{classDetail.policy.note}</p>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Sticky CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 p-4 z-50">
                <div className="container mx-auto max-w-4xl flex justify-between items-center">
                    <div className="hidden md:block">
                        <p className="text-white font-medium">{classDetail.title}</p>
                        <p className="text-gray-500 text-sm">{classDetail.date}</p>
                    </div>
                    <Link
                        href={`/class/${id}/apply`}
                        className="w-full md:w-auto bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors text-center"
                    >
                        수강 신청하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
