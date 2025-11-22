"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Image as ImageIcon, Calendar } from "lucide-react";

interface DashboardStats {
    totalPortfolios: number;
    activeClasses: number;
    totalOrders: number;
    pendingOrders: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalPortfolios: 0,
        activeClasses: 0,
        totalOrders: 0,
        pendingOrders: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        async function loadStats() {
            try {
                setIsLoading(true);

                // 포트폴리오 개수
                const { count: portfolioCount } = await supabase
                    .from('portfolios')
                    .select('*', { count: 'exact', head: true });

                // 활성 클래스 개수
                const { count: activeClassCount } = await supabase
                    .from('classes')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_active', true);

                // 전체 주문 개수
                const { count: totalOrderCount } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true });

                // 대기 중인 주문 개수
                const { count: pendingOrderCount } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending');

                setStats({
                    totalPortfolios: portfolioCount || 0,
                    activeClasses: activeClassCount || 0,
                    totalOrders: totalOrderCount || 0,
                    pendingOrders: pendingOrderCount || 0,
                });
            } catch (error) {
                console.error('Error loading stats:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadStats();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <p className="text-gray-400 mt-4">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl md:text-3xl font-serif text-white mb-2">대시보드</h1>
                <p className="text-gray-400">Byunhwa 관리자 현황</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">총 포트폴리오</h3>
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ImageIcon size={20} className="text-primary" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-white">{stats.totalPortfolios}</span>
                        <span className="text-xs text-gray-500">개</span>
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">모집 중인 클래스</h3>
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Calendar size={20} className="text-green-500" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-white">{stats.activeClasses}</span>
                        <span className="text-xs text-gray-500">개</span>
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">총 신청 건수</h3>
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Users size={20} className="text-blue-500" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-white">{stats.totalOrders}</span>
                        <span className="text-xs text-gray-500">건</span>
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">대기 중인 신청</h3>
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Users size={20} className="text-yellow-500" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-white">{stats.pendingOrders}</span>
                        <span className="text-xs text-gray-500">건</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-serif text-white mb-4">빠른 실행</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <a
                        href="/admin/portfolio"
                        className="p-4 bg-gray-800/50 rounded-lg text-center hover:bg-gray-800 transition-colors"
                    >
                        <ImageIcon size={24} className="mx-auto mb-2 text-primary" />
                        <p className="text-sm text-white">포트폴리오 관리</p>
                    </a>
                    <a
                        href="/admin/class"
                        className="p-4 bg-gray-800/50 rounded-lg text-center hover:bg-gray-800 transition-colors"
                    >
                        <Calendar size={24} className="mx-auto mb-2 text-green-500" />
                        <p className="text-sm text-white">클래스 관리</p>
                    </a>
                    <a
                        href="/admin/class"
                        className="p-4 bg-gray-800/50 rounded-lg text-center hover:bg-gray-800 transition-colors"
                    >
                        <Users size={24} className="mx-auto mb-2 text-blue-500" />
                        <p className="text-sm text-white">신청 관리</p>
                    </a>
                    <a
                        href="/admin/settings"
                        className="p-4 bg-gray-800/50 rounded-lg text-center hover:bg-gray-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-white">설정</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
