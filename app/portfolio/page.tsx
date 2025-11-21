"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import PortfolioModal from "@/components/PortfolioModal";

const portfolioItems = [
    {
        id: 1,
        title: "Wedding Bouquet",
        category: "Wedding",
        images: [
            "https://images.unsplash.com/photo-1551751299-1b51bc6175d6?q=80&w=2072&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2187&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
        ],
        likes: 124,
        date: "2 DAYS AGO"
    },
    {
        id: 2,
        title: "Centerpiece",
        category: "Arrangement",
        images: [
            "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=2090&auto=format&fit=crop"
        ],
        likes: 89,
        date: "5 DAYS AGO"
    },
    {
        id: 3,
        title: "Wreath",
        category: "Wreath",
        images: [
            "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?q=80&w=2070&auto=format&fit=crop"
        ],
        likes: 245,
        date: "1 WEEK AGO"
    },
    {
        id: 4,
        title: "Hand-tied",
        category: "Bouquet",
        images: [
            "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2187&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551751299-1b51bc6175d6?q=80&w=2072&auto=format&fit=crop"
        ],
        likes: 167,
        date: "2 WEEKS AGO"
    },
    {
        id: 5,
        title: "Vase Arrangement",
        category: "Arrangement",
        images: [
            "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=2090&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
        ],
        likes: 92,
        date: "3 WEEKS AGO"
    },
    {
        id: 6,
        title: "Bridal Shower",
        category: "Event",
        images: [
            "https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop"
        ],
        likes: 312,
        date: "1 MONTH AGO"
    },
];

export default function PortfolioPage() {
    const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen bg-background">
            <div className="container mx-auto">
                <FadeIn>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-12 text-center">Portfolio</h1>
                </FadeIn>

                {/* Filter Placeholder */}
                <FadeIn delay={200}>
                    <div className="flex justify-center gap-6 mb-16 text-sm text-gray-400 overflow-x-auto pb-2">
                        <button className="text-primary font-bold whitespace-nowrap">All</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Wedding</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Bouquet</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Wreath</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Classes</button>
                    </div>
                </FadeIn>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-1 md:gap-2">
                    {portfolioItems.map((item, index) => (
                        <FadeIn key={item.id} delay={index * 100}>
                            <div
                                className="group relative aspect-square overflow-hidden bg-gray-900 cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            >
                                <Image
                                    src={item.images[0]}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                        <span>{item.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* Portfolio Modal */}
            <PortfolioModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    );
}
