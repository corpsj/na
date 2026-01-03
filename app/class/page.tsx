import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // 1시간마다 재생성

export default async function ClassPage() {
    const supabase = await createClient();

    // 활성화된 클래스 조회 (현재 모집 중)
    const { data: activeClasses } = await supabase
        .from('classes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

    // 비활성화된 클래스 조회 (지난 클래스)
    const { data: pastClasses } = await supabase
        .from('classes')
        .select('*')
        .eq('is_active', false)
        .order('created_at', { ascending: false })
        .limit(6);

    const currentClass = activeClasses?.[0] || null;

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen bg-background">
            <div className="container mx-auto max-w-5xl">
                <FadeIn>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-16 text-center">Class</h1>
                </FadeIn>

                {/* Current Class Section */}
                <section className="mb-24">
                    <FadeIn delay={200}>
                        <h2 className="font-serif text-2xl text-primary mb-8 border-b border-gray-800 pb-4">Current Class</h2>
                    </FadeIn>

                    {currentClass ? (
                        <FadeIn delay={400}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                                <div className="relative aspect-video lg:aspect-square bg-gray-900 overflow-hidden group cursor-pointer rounded-sm">
                                    <Link href={`/class/${currentClass.id}`}>
                                        <Image
                                            src={currentClass.image_url}
                                            alt={currentClass.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-xs font-mono text-primary border border-primary px-2 py-1 rounded-full animate-pulse">
                                            모집중
                                        </span>
                                        <span className="text-base md:text-lg text-white font-medium">
                                            {currentClass.duration}
                                        </span>
                                    </div>

                                    <Link href={`/class/${currentClass.id}`} className="block group">
                                        <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight group-hover:text-primary transition-colors">
                                            {currentClass.title}
                                        </h3>
                                        {currentClass.subtitle && (
                                            <p className="text-gray-400 text-lg mt-2">{currentClass.subtitle}</p>
                                        )}
                                    </Link>

                                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                                        {currentClass.description}
                                    </p>

                                    <div className="pt-4">
                                        <p className="text-2xl font-light text-white mb-8">{currentClass.price_display}</p>
                                        <Link
                                            href={`/class/${currentClass.id}`}
                                            className="inline-block w-full md:w-auto text-center px-12 py-4 bg-primary text-white font-bold tracking-widest hover:bg-red-900 transition-colors"
                                        >
                                            VIEW DETAILS
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ) : (
                        <FadeIn delay={400}>
                            <div className="text-center py-20 border border-gray-800 text-gray-500 rounded-sm">
                                <p className="text-lg">현재 모집 중인 클래스가 없습니다.</p>
                                <p className="text-sm mt-2">새로운 클래스 소식은 인스타그램을 확인해주세요.</p>
                                <a
                                    href="https://instagram.com/bye.on.hwa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-6 text-primary hover:underline"
                                >
                                    @bye.on.hwa
                                </a>
                            </div>
                        </FadeIn>
                    )}
                </section>

                {/* Past Classes Section */}
                {pastClasses && pastClasses.length > 0 && (
                    <section>
                        <FadeIn delay={600}>
                            <h2 className="font-serif text-2xl text-gray-500 mb-8 border-b border-gray-800 pb-4">Past Classes</h2>
                        </FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                            {pastClasses.map((cls, index) => (
                                <FadeIn key={cls.id} delay={800 + (index * 100)}>
                                    <Link href={`/class/${cls.id}`} className="group cursor-pointer block">
                                        <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden mb-4 rounded-sm">
                                            <Image
                                                src={cls.image_url}
                                                alt={cls.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <h3 className="font-serif text-base md:text-lg text-gray-300 group-hover:text-white transition-colors">
                                            {cls.title}
                                        </h3>
                                        {cls.subtitle && (
                                            <p className="text-xs md:text-sm text-gray-600 mt-1">{cls.subtitle}</p>
                                        )}
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
