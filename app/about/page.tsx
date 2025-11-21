import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen bg-background">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <FadeIn>
                        <div className="relative aspect-[3/4] w-full max-w-sm md:max-w-none mx-auto md:mx-0 bg-gray-900 overflow-hidden">
                            <Image
                                src="/images/florist_portrait.jpg"
                                alt="Florist Byunhwa"
                                fill
                                className="object-cover grayscale"
                            />
                        </div>
                    </FadeIn>

                    {/* Content */}
                    <FadeIn delay={300}>
                        <div className="space-y-8">
                            <h1 className="font-serif text-white">
                                <span className="text-3xl md:text-4xl block mb-3 text-gray-300 font-medium">Florist.</span>
                                <span className="text-5xl md:text-6xl font-bold tracking-tight">Na HoSeong</span>
                            </h1>
                            <div className="space-y-6 text-gray-300 leading-relaxed font-light">
                                <p>
                                    안녕하세요, 플로리스트 <strong>나호성</strong>입니다.
                                </p>
                                <p>
                                    꽃은 저에게 단순한 식물이 아닌, 감정을 표현하는 언어입니다.
                                    거친 질감과 부드러운 색감의 조화, 그리고 그 안에서 피어나는
                                    생명력을 통해 공간에 새로운 숨결을 불어넣습니다.
                                </p>
                                <p>
                                    정형화된 아름다움보다는, 자연스러운 흐름과
                                    예상치 못한 변주를 사랑합니다.
                                    당신의 특별한 순간이 더욱 빛날 수 있도록,
                                    진심을 담아 디자인합니다.
                                </p>
                            </div>

                            <div className="pt-8 border-t border-gray-800">
                                <h3 className="font-serif text-xl text-white mb-4">Contact</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Instagram: @bye.on.hwa</li>
                                    <li>Email: hoss0225@naver.com</li>
                                    <li>Tel: 010-4086-6231</li>
                                </ul>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
