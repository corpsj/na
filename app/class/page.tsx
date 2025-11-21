import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

// Mock data for current class (can be null if no active class)
const currentClass = {
    id: 1,
    title: "Winter Wreath Masterclass",
    date: "2024. 12. 14 (Sat) 14:00",
    price: "150,000 KRW",
    description: "겨울의 무드를 담은 리스를 제작하는 원데이 클래스입니다. 소재의 질감을 살려 거칠지만 따뜻한 느낌을 연출합니다.",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop",
    status: "Recruiting"
};

// Mock data for past classes
const pastClasses = [
    {
        id: 101,
        title: "Hand-tied Basics",
        date: "2024. 10. 20",
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2187&auto=format&fit=crop"
    },
    {
        id: 102,
        title: "Vase Arrangement",
        date: "2024. 09. 15",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 103,
        title: "Wedding Bouquet",
        date: "2024. 08. 01",
        image: "https://images.unsplash.com/photo-1551751299-1b51bc6175d6?q=80&w=2072&auto=format&fit=crop"
    }
];

export default function ClassPage() {
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
                                <div className="relative aspect-video lg:aspect-square bg-gray-900 overflow-hidden group cursor-pointer">
                                    <Link href={`/class/${currentClass.id}`}>
                                        <Image
                                            src={currentClass.image}
                                            alt={currentClass.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-primary border border-primary px-2 py-1 rounded-full animate-pulse">
                                            모집중
                                        </span>
                                        <span className="text-lg text-white font-medium">{currentClass.date}</span>
                                    </div>

                                    <Link href={`/class/${currentClass.id}`} className="block group">
                                        <h3 className="font-serif text-4xl text-white leading-tight group-hover:text-primary transition-colors">
                                            {currentClass.title}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-400 leading-relaxed text-lg">
                                        {currentClass.description}
                                    </p>

                                    <div className="pt-4">
                                        <p className="text-2xl font-light text-white mb-8">{currentClass.price}</p>
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
                        <div className="text-center py-20 border border-gray-800 text-gray-500">
                            <p>현재 모집 중인 클래스가 없습니다.</p>
                            <p className="text-sm mt-2">새로운 클래스 소식은 인스타그램을 확인해주세요.</p>
                        </div>
                    )}
                </section>

                {/* Past Classes Section */}
                <section>
                    <FadeIn delay={600}>
                        <h2 className="font-serif text-2xl text-gray-500 mb-8 border-b border-gray-800 pb-4">Past Classes</h2>
                    </FadeIn>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {pastClasses.map((cls, index) => (
                            <FadeIn key={cls.id} delay={800 + (index * 100)}>
                                <Link href={`/class/${cls.id}`} className="group cursor-pointer block">
                                    <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden mb-4">
                                        <Image
                                            src={cls.image}
                                            alt={cls.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <h3 className="font-serif text-lg text-gray-300 group-hover:text-white transition-colors">{cls.title}</h3>
                                    <p className="text-sm text-gray-600">{cls.date}</p>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
