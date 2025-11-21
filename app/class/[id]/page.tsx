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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 md:p-12">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Date & Time</h3>
                                    <p className="text-white text-lg font-medium">{classDetail.date}</p>
                                    <p className="text-gray-400">{classDetail.time}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Location</h3>
                                    <p className="text-white text-lg font-medium">{classDetail.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Level & Capacity</h3>
                                    <p className="text-white text-lg font-medium">{classDetail.level}</p>
                                    <p className="text-gray-400">{classDetail.capacity}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Price</h3>
                                    <p className="text-white text-lg font-medium">{classDetail.price}</p>
                                </div>
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
                        <h2 className="font-serif text-2xl text-white mb-10">Curriculum</h2>
                        <div className="relative border-l border-gray-800 ml-3 space-y-12 pl-10">
                            {classDetail.curriculum.map((item, index) => (
                                <div key={item.step} className="relative group">
                                    {/* Timeline Dot */}
                                    <span className="absolute -left-[45px] top-1 h-4 w-4 rounded-full border border-gray-600 bg-black group-hover:border-primary group-hover:bg-primary transition-all duration-300" />

                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                        <span className="text-primary font-serif text-sm tracking-widest uppercase">
                                            {item.step}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="text-white text-xl mb-3 font-medium group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
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
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
