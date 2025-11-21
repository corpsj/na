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

            <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-10">
                {/* Info Grid - Left Aligned & Structured */}
                <FadeIn delay={200}>
                    <div className="bg-black/80 backdrop-blur-md border border-gray-800 mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">Date & Time</h3>
                                <p className="text-white text-lg font-serif mb-1">{classDetail.date}</p>
                                <p className="text-gray-500 text-sm font-light">{classDetail.time}</p>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">Location</h3>
                                <p className="text-white text-lg font-serif">{classDetail.location}</p>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">Level / Capacity</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-lg font-serif">{classDetail.level}</span>
                                    <span className="w-px h-3 bg-gray-700"></span>
                                    <span className="text-gray-400 text-sm">{classDetail.capacity}</span>
                                </div>
                            </div>
                            <div className="p-8 text-left group hover:bg-white/5 transition-colors duration-300">
                                <h3 className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-3 opacity-80 group-hover:opacity-100 transition-opacity">Price</h3>
                                <p className="text-white text-lg font-serif">{classDetail.price}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Description - Left Aligned */}
                    <div className="md:col-span-8">
                        <FadeIn delay={300}>
                            <h3 className="text-white text-xl font-serif mb-8 border-l-2 border-primary pl-4">
                                Class Overview
                            </h3>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 leading-loose text-lg font-light whitespace-pre-line break-keep">
                                    {classDetail.description}
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Policy - Sidebar Style */}
                    <div className="md:col-span-4">
                        <FadeIn delay={400}>
                            <div className="bg-gray-900/30 border border-gray-800 p-8 sticky top-32">
                                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6 text-left">
                                    Refund Policy & Notes
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-left">
                                        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Refund</p>
                                        <p className="text-gray-300 text-sm leading-relaxed font-light">{classDetail.policy.refund}</p>
                                    </div>
                                    <div className="w-full h-px bg-gray-800/50"></div>
                                    <div className="text-left">
                                        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Note</p>
                                        <p className="text-gray-300 text-sm leading-relaxed font-light">{classDetail.policy.note}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
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
