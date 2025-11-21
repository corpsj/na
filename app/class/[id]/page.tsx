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

            <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
                {/* Info Grid */}
                <FadeIn delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 border border-gray-800 mb-24 shadow-2xl">
                        <div className="bg-gray-900/90 p-8 md:p-10 space-y-2 hover:bg-gray-900 transition-colors">
                            <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">일시</h3>
                            <p className="text-white text-xl md:text-2xl font-serif">{classDetail.date}</p>
                            <p className="text-gray-400 text-sm">{classDetail.time}</p>
                        </div>
                        <div className="bg-gray-900/90 p-8 md:p-10 space-y-2 hover:bg-gray-900 transition-colors">
                            <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">장소</h3>
                            <p className="text-white text-xl md:text-2xl font-serif">{classDetail.location}</p>
                        </div>
                        <div className="bg-gray-900/90 p-8 md:p-10 space-y-2 hover:bg-gray-900 transition-colors">
                            <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">난이도 및 정원</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-white text-xl md:text-2xl font-serif">{classDetail.level}</span>
                                <span className="text-gray-500 text-sm">|</span>
                                <span className="text-gray-400 text-sm">{classDetail.capacity}</span>
                            </div>
                        </div>
                        <div className="bg-gray-900/90 p-8 md:p-10 space-y-2 hover:bg-gray-900 transition-colors">
                            <h3 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">수강료</h3>
                            <p className="text-white text-xl md:text-2xl font-serif">{classDetail.price}</p>
                        </div>
                    </div>
                </FadeIn>

                {/* About */}
                <FadeIn delay={300}>
                    <div className="mb-24 max-w-2xl mx-auto text-center">
                        <span className="block w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mb-8"></span>
                        <p className="text-gray-200 leading-loose text-lg md:text-xl font-light whitespace-pre-line break-keep">
                            {classDetail.description}
                        </p>
                        <span className="block w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mt-8"></span>
                    </div>
                </FadeIn>

                {/* Curriculum */}
                <FadeIn delay={400}>
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl text-white mb-4">Curriculum</h2>
                            <p className="text-gray-500 text-sm tracking-widest uppercase">체계적인 커리큘럼</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {classDetail.curriculum.map((item, index) => (
                                <div key={item.step} className="group relative bg-gray-900/50 border border-gray-800 p-8 hover:border-primary/50 transition-all duration-500 hover:bg-gray-900">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                                        <span className="text-4xl font-serif text-gray-800 group-hover:text-primary/20 transition-colors duration-500">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h3 className="text-white text-xl mb-3 font-serif group-hover:text-primary transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed font-light">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Policy */}
                <FadeIn delay={500}>
                    <div className="bg-gray-900/30 border border-gray-800 p-8 md:p-12">
                        <h2 className="font-serif text-xl text-white mb-8 pb-4 border-b border-gray-800 inline-block">
                            Refund Policy & Notes
                        </h2>
                        <div className="text-gray-400 space-y-4 text-sm leading-relaxed font-light">
                            <p className="flex items-start">
                                <span className="text-primary mr-3 mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
                                <span>{classDetail.policy.refund}</span>
                            </p>
                            <p className="flex items-start">
                                <span className="text-primary mr-3 mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
                                <span>{classDetail.policy.note}</span>
                            </p>
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
