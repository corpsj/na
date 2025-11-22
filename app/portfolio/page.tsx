"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import PortfolioModal from "@/components/PortfolioModal";
import { createClient } from "@/lib/supabase/client";
import type { Portfolio } from "@/types/database";

// PortfolioModal에 전달할 형식
interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    images: string[];
    description?: string;
}

// 카테고리 목록
const CATEGORIES = ['All', 'Wedding', 'Bouquet', 'Wreath', 'Class', 'Others'];

export default function PortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    // 포트폴리오 데이터 로드
    useEffect(() => {
        async function loadPortfolios() {
            try {
                setIsLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from('portfolios')
                    .select('*')
                    .order('display_order', { ascending: true })
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Portfolio fetch error:', error);
                    setError('포트폴리오를 불러올 수 없습니다.');
                    return;
                }

                setPortfolios(data || []);
                setFilteredPortfolios(data || []);
            } catch (err) {
                console.error('Unexpected error:', err);
                setError('예상치 못한 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        }

        loadPortfolios();
    }, []);

    // 카테고리 필터링
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredPortfolios(portfolios);
        } else {
            setFilteredPortfolios(
                portfolios.filter(item => item.category === selectedCategory)
            );
        }
    }, [selectedCategory, portfolios]);

    // Portfolio를 PortfolioItem으로 변환
    const handleItemClick = (portfolio: Portfolio) => {
        // image_urls가 있으면 사용하고, 없으면 image_url을 배열로 감싸서 사용
        const images = portfolio.image_urls && portfolio.image_urls.length > 0
            ? portfolio.image_urls
            : [portfolio.image_url];

        const item: PortfolioItem = {
            id: portfolio.id,
            title: portfolio.title,
            category: portfolio.category,
            images: images,
            description: portfolio.description
        };
        setSelectedItem(item);
    };

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen bg-background">
            <div className="container mx-auto">
                <FadeIn>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-12 text-center">Portfolio</h1>
                </FadeIn>

                {/* Category Filter */}
                <FadeIn delay={200}>
                    <div className="flex justify-center gap-6 mb-16 text-sm text-gray-400 overflow-x-auto pb-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`${selectedCategory === category
                                    ? 'text-primary font-bold'
                                    : 'hover:text-white'
                                    } transition-colors whitespace-nowrap`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </FadeIn>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="text-gray-400 mt-4">포트폴리오를 불러오는 중...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-primary hover:underline"
                        >
                            다시 시도
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredPortfolios.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400">
                            {selectedCategory === 'All'
                                ? '아직 포트폴리오가 없습니다.'
                                : `${selectedCategory} 카테고리에 작품이 없습니다.`}
                        </p>
                    </div>
                )}

                {/* Grid */}
                {!isLoading && !error && filteredPortfolios.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                        {filteredPortfolios.map((portfolio, index) => (
                            <FadeIn key={portfolio.id} delay={index * 100}>
                                <div
                                    className="group relative aspect-square overflow-hidden bg-gray-900 cursor-pointer rounded-sm"
                                    onClick={() => handleItemClick(portfolio)}
                                >
                                    <Image
                                        src={portfolio.image_url}
                                        alt={portfolio.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                                        <p className="text-primary text-xs uppercase tracking-wider mb-2">
                                            {portfolio.category}
                                        </p>
                                        <h3 className="text-white font-serif text-lg md:text-xl text-center">
                                            {portfolio.title}
                                        </h3>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                )}
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
