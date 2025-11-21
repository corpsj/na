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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 border-y border-gray-800 py-12">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">일시</h3>
                                <p className="text-white text-lg">{classDetail.date}</p>
                                <p className="text-gray-400">{classDetail.time}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">장소</h3>
                                <p className="text-white text-lg">{classDetail.location}</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">난이도 및 정원</h3>
                                <p className="text-white text-lg">{classDetail.level}</p>
                                <p className="text-gray-400">{classDetail.capacity}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">수강료</h3>
                                <p className="text-white text-lg">{classDetail.price}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* About */}
                <FadeIn delay={300}>
                    <div className="mb-20">
                        <p className="text-gray-300 leading-loose text-lg font-light whitespace-pre-line">
                            {classDetail.description}
                        </p>
                    </div>
                </FadeIn>

                {/* Curriculum */}
                <FadeIn delay={400}>
                    <div className="mb-20">
                        <h2 className="font-serif text-2xl text-white mb-8">Curriculum</h2>
                        <div className="space-y-8">
                            {classDetail.curriculum.map((item) => (
                                <div key={item.step} className="flex gap-6 group">
                                    <span className="text-primary font-serif text-xl opacity-50 group-hover:opacity-100 transition-opacity">
                                        {item.step}
                                    </span>
                                    <div>
                                        <h3 className="text-white text-lg mb-2 font-medium">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Policy */}
                <FadeIn delay={500}>
                    <div className="bg-gray-900 p-8 border border-gray-800">
                        <h2 className="font-serif text-xl text-white mb-6">Refund Policy & Notes</h2>
                        <div className="text-gray-400 space-y-2 text-sm leading-relaxed">
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
