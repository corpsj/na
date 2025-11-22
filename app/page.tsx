import FadeIn from "@/components/FadeIn";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/florist_portrait.jpg')] bg-cover bg-center opacity-60" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4">
                    <FadeIn delay={200}>
                        <h1 className="font-serif text-4xl md:text-7xl text-white mb-6 tracking-wider">
                            BYUNHWA
                        </h1>
                    </FadeIn>
                    <FadeIn delay={600}>
                        <p className="text-gray-200 text-lg md:text-2xl font-light tracking-widest uppercase">
                            FLORAL ARTISTRY & CLASSES
                        </p>
                    </FadeIn>
                    <FadeIn delay={1000}>
                        <div className="mt-12">
                            <a href="/portfolio" className="inline-block border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition-colors duration-300 tracking-widest text-sm">
                                EXPLORE WORK
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-24 px-4 bg-background">
                <div className="container mx-auto max-w-4xl text-center space-y-8">
                    <FadeIn>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">
                            변화(變花)
                        </h2>
                    </FadeIn>
                    <FadeIn delay={200}>
                        <p className="text-gray-400 leading-loose text-lg font-light">
                            꽃은 단순히 아름다운 사물이 아닙니다.<br />
                            공간의 분위기를 바꾸고, 감정을 전달하는 매개체입니다.<br />
                            변화는 당신의 일상에 새로운 감각을 불어넣는 꽃을 디자인합니다.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
