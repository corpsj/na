"use client";

import { useState, useEffect } from "react";
import PortfolioFormModal from "@/components/admin/PortfolioFormModal";
import { Plus, MoreVertical } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Portfolio } from "@/types/database";

export default function AdminPortfolioPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();

    // 포트폴리오 데이터 로드
    const loadPortfolios = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('portfolios')
                .select('*')
                .order('display_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPortfolios(data || []);
        } catch (error) {
            console.error('Error loading portfolios:', error);
            toast.error('포트폴리오를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPortfolios();
    }, []);

    const handleCreate = async (data: any) => {
        try {
            if (editingItem) {
                // 수정
                const response = await fetch(`/api/portfolios/${editingItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('수정 실패');
                toast.success("작품이 수정되었습니다.");
            } else {
                // 생성
                const response = await fetch('/api/portfolios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('등록 실패');
                toast.success("새 작품이 등록되었습니다.");
            }

            await loadPortfolios(); // 데이터 새로고침
            setEditingItem(null);
        } catch (error) {
            console.error('Error saving portfolio:', error);
            toast.error(editingItem ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
        }
    };

    const handleEdit = (item: Portfolio) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/portfolios/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('삭제 실패');
            toast.success('작품이 삭제되었습니다.');
            await loadPortfolios(); // 데이터 새로고침
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            toast.error('삭제에 실패했습니다.');
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif text-white">포트폴리오 관리</h1>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                    <Plus size={16} />
                    새 작품 등록
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <p className="text-gray-400 mt-4">로딩 중...</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && portfolios.length === 0 && (
                <div className="text-center py-20 border border-gray-800 rounded-lg">
                    <p className="text-gray-400">등록된 포트폴리오가 없습니다.</p>
                </div>
            )}

            {/* Mobile View (Cards) */}
            {!isLoading && portfolios.length > 0 && (
                <div className="md:hidden grid grid-cols-2 gap-3">
                    {portfolios.map((item) => (
                        <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden flex flex-col">
                            <div className="relative aspect-square w-full bg-gray-800">
                                {item.image_url ? (
                                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black transition-colors"
                                    >
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                                <span className="text-[10px] text-primary uppercase tracking-wider font-medium mb-1">{item.category}</span>
                                <h3 className="text-sm text-white font-medium line-clamp-2 mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-500 mt-auto">{new Date(item.created_at).toLocaleDateString('ko-KR')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Desktop View (Table) */}
            {!isLoading && portfolios.length > 0 && (
                <div className="hidden md:block bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[600px]">
                            <thead className="bg-gray-900 text-gray-400 font-medium border-b border-gray-800">
                                <tr>
                                    <th className="px-6 py-4 whitespace-nowrap">이미지</th>
                                    <th className="px-6 py-4 whitespace-nowrap">제목</th>
                                    <th className="px-6 py-4 whitespace-nowrap">카테고리</th>
                                    <th className="px-6 py-4 whitespace-nowrap">날짜</th>
                                    <th className="px-6 py-4 text-right whitespace-nowrap">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                {portfolios.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 bg-gray-800 rounded-md relative overflow-hidden">
                                                {item.image_url && (
                                                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs whitespace-nowrap">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {new Date(item.created_at).toLocaleDateString('ko-KR')}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-400 transition-colors"
                                            >
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <PortfolioFormModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSubmit={handleCreate}
                initialData={editingItem}
            />
        </div>
    );
}
