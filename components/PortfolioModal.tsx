"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    images: string[];
    description?: string;
}

interface PortfolioModalProps {
    item: PortfolioItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PortfolioModal({ item, isOpen, onClose }: PortfolioModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setCurrentImageIndex(0); // Reset to first image when opening
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item && currentImageIndex < item.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Close Button (Mobile/Desktop) */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[110] text-white p-2 hover:opacity-70 transition-opacity"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Modal Content */}
            <div
                className={cn(
                    "relative w-full max-w-6xl bg-black border border-gray-800 overflow-hidden shadow-2xl transition-all duration-500 transform flex flex-col md:flex-row max-h-[90vh]",
                    isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
                )}
            >
                {item && (
                    <>
                        {/* Image Section (Carousel) */}
                        <div className="relative w-full md:w-[60%] aspect-square bg-black flex items-center justify-center group">
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.images[currentImageIndex]}
                                    alt={item.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>

                            {/* Preload adjacent images */}
                            <div className="hidden">
                                {item.images.map((src, idx) => {
                                    // Preload prev and next images
                                    if (idx === currentImageIndex - 1 || idx === currentImageIndex + 1) {
                                        return (
                                            <Image
                                                key={src}
                                                src={src}
                                                alt="preload"
                                                width={100}
                                                height={100}
                                                priority
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Image Counter Badge */}
                            {item.images.length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm z-10">
                                    {currentImageIndex + 1} / {item.images.length}
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            {currentImageIndex > 0 && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all backdrop-blur-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            )}
                            {currentImageIndex < item.images.length - 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all backdrop-blur-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}

                            {/* Pagination Dots */}
                            {item.images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {item.images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-colors",
                                                idx === currentImageIndex ? "bg-white" : "bg-white/40"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Section (Clean Style) */}
                        <div className="w-full md:w-[40%] flex flex-col bg-gray-900 border-l border-gray-800 h-full">
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                                <div>
                                    <p className="text-primary text-sm tracking-widest uppercase mb-3 font-medium">
                                        {item.category}
                                    </p>
                                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                                        {item.title}
                                    </h2>
                                </div>

                                <div className="space-y-6 text-gray-300 font-light leading-relaxed text-sm md:text-base">
                                    <p>
                                        {item.description || "자연스러운 흐름과 색감의 조화를 통해 공간에 생기를 불어넣는 디자인입니다. 계절의 변화를 담아 가장 아름다운 순간을 포착했습니다."}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-800">
                                    <button className="w-full py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm uppercase">
                                        Inquire about this
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
