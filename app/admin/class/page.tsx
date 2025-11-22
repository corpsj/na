"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    MoreVertical,
    Users,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react";
import Image from "next/image";
import ClassFormModal from "@/components/admin/ClassFormModal";
import ScheduleManagementModal from "@/components/admin/ScheduleManagementModal";
import OrderManagementModal from "@/components/admin/OrderManagementModal";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Class, Order } from "@/types/database";

// 클래스 + 신청자 수 통계
interface ClassWithStats extends Class {
    applicantCount?: number;
    maxCapacity?: number;
}

export default function AdminClassPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "applications">("overview");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

    // Data State
    const [classes, setClasses] = useState<ClassWithStats[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    // Order Management State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const supabase = createClient();

    // 클래스 데이터 로드
    const loadClasses = async () => {
        try {
            setIsLoadingClasses(true);
            const { data, error } = await supabase
                .from('classes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // 각 클래스별 신청자 수 가져오기
            const classesWithStats = await Promise.all(
                (data || []).map(async (cls) => {
                    const { count } = await supabase
                        .from('orders')
                        .select('*', { count: 'exact', head: true })
                        .eq('class_id', cls.id)
                        .in('status', ['pending', 'confirmed']);

                    return {
                        ...cls,
                        applicantCount: count || 0,
                        maxCapacity: cls.capacity ? parseInt(cls.capacity) : 0
                    };
                })
            );

            setClasses(classesWithStats);
        } catch (error) {
            console.error('Error loading classes:', error);
            toast.error('클래스를 불러오는데 실패했습니다.');
        } finally {
            setIsLoadingClasses(false);
        }
    };

    // 주문 데이터 로드
    const loadOrders = async () => {
        try {
            setIsLoadingOrders(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.error('주문을 불러오는데 실패했습니다.');
        } finally {
            setIsLoadingOrders(false);
        }
    };

    useEffect(() => {
        loadClasses();
        loadOrders();
    }, []);

    const handleCreate = async (data: any) => {
        try {
            if (editingClass) {
                // 수정
                const response = await fetch(`/api/classes/${editingClass.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('수정 실패');
                toast.success("클래스가 수정되었습니다.");
            } else {
                // 생성
                const response = await fetch('/api/classes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('등록 실패');
                toast.success("새 클래스가 등록되었습니다.");
            }

            await loadClasses();
            setEditingClass(null);
        } catch (error) {
            console.error('Error saving class:', error);
            toast.error(editingClass ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
        }
    };

    const handleEdit = (cls: Class) => {
        setEditingClass(cls);
        setIsModalOpen(true);
    };

    const handleDelete = async (classId: string) => {
        if (!confirm('정말로 이 클래스를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return;
        }

        try {
            const response = await fetch(`/api/classes/${classId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || '삭제 실패');
            }

            toast.success('클래스가 삭제되었습니다.');
            await loadClasses();
        } catch (error: any) {
            console.error('Error deleting class:', error);
            toast.error(error.message || '클래스 삭제에 실패했습니다.');
        }
    };

    const handleScheduleManagement = (classId: string) => {
        setSelectedClassId(classId);
        setIsScheduleModalOpen(true);
    };

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const handleOrderStatusUpdate = async (orderId: string, newStatus: string, notes?: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, notes }),
            });

            if (!response.ok) throw new Error('상태 변경 실패');
            toast.success("주문 상태가 변경되었습니다.");
            await loadOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('상태 변경에 실패했습니다.');
        }
    };

    const getStatusBadge = (cls: Class) => {
        if (!cls.is_active) return { label: '종료', className: 'bg-gray-500/80 text-white' };
        return { label: '모집중', className: 'bg-green-500/80 text-white' };
    };

    const getOrderStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            'pending': '대기',
            'confirmed': '확정',
            'cancelled': '취소'
        };
        return statusMap[status] || status;
    };

    const getOrderStatusClass = (status: string) => {
        const classMap: Record<string, string> = {
            'confirmed': 'bg-green-500/10 text-green-500 border-green-500/20',
            'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20'
        };
        return classMap[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    };

    return (
        <div className="space-y-8">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "overview"
                            ? "bg-white text-black shadow"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        클래스 현황
                    </button>
                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "applications"
                            ? "bg-white text-black shadow"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        수강 신청 관리
                    </button>
                </div>

                {activeTab === "overview" && (
                    <button
                        onClick={() => {
                            setEditingClass(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <Plus size={16} />
                        새 클래스 등록
                    </button>
                )}
            </div>

            <ClassFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingClass(null);
                }}
                onSubmit={handleCreate}
                initialData={editingClass}
            />

            <ScheduleManagementModal
                isOpen={isScheduleModalOpen}
                onClose={() => {
                    setIsScheduleModalOpen(false);
                    setSelectedClassId(null);
                }}
                classId={selectedClassId || ""}
                className={classes.find(c => c.id === selectedClassId)?.title || ""}
                onSave={() => {
                    loadClasses();
                }}
            />

            <OrderManagementModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                order={selectedOrder}
                classTitle={selectedOrder ? classes.find(c => c.id === selectedOrder.class_id)?.title : undefined}
                classPrice={selectedOrder ? classes.find(c => c.id === selectedOrder.class_id)?.price_display : undefined}
                onUpdateStatus={handleOrderStatusUpdate}
            />

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <>
                        {isLoadingClasses ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                                <p className="text-gray-400 mt-4">로딩 중...</p>
                            </div>
                        ) : classes.length === 0 ? (
                            <div className="text-center py-20 border border-gray-800 rounded-lg">
                                <p className="text-gray-400">등록된 클래스가 없습니다.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                {classes.map((cls) => {
                                    const statusBadge = getStatusBadge(cls);
                                    return (
                                        <div key={cls.id} className="group bg-gray-900/50 border border-gray-800 rounded-xl md:rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 flex flex-col">
                                            <div className="relative h-32 md:h-48 w-full overflow-hidden shrink-0">
                                                <Image
                                                    src={cls.image_url}
                                                    alt={cls.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                                    <button
                                                        onClick={() => handleEdit(cls)}
                                                        className="bg-black/50 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-black transition-colors"
                                                    >
                                                        <MoreVertical size={14} className="md:w-4 md:h-4" />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                                                    <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-md ${statusBadge.className}`}>
                                                        {statusBadge.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-3 md:p-6 flex flex-col flex-1">
                                                <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest font-medium mb-1 md:mb-2 truncate">{cls.category || 'One-day Class'}</p>
                                                <h3 className="text-sm md:text-xl text-white font-serif mb-2 md:mb-4 line-clamp-1">{cls.title}</h3>

                                                <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-6 mt-auto">
                                                    <div className="flex items-center gap-1 md:gap-2">
                                                        <Users size={12} className="md:w-3.5 md:h-3.5" />
                                                        <span>{cls.applicantCount || 0}/{cls.maxCapacity || 0}</span>
                                                    </div>
                                                    <div className="font-medium text-white">
                                                        {cls.price_display || `₩ ${cls.price?.toLocaleString()}`}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() => handleEdit(cls)}
                                                            className="px-2 py-1.5 md:px-4 md:py-2 bg-gray-800 text-white text-xs md:text-sm rounded-md md:rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                                                        >
                                                            수정
                                                        </button>
                                                        <button
                                                            onClick={() => handleScheduleManagement(cls.id)}
                                                            className="px-2 py-1.5 md:px-4 md:py-2 border border-gray-700 text-gray-300 text-xs md:text-sm rounded-md md:rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                                                        >
                                                            일정
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(cls.id)}
                                                        className="px-2 py-1.5 md:px-4 md:py-2 border border-red-500/30 text-red-500 text-xs md:text-sm rounded-md md:rounded-lg hover:bg-red-500/10 transition-colors whitespace-nowrap"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === "applications" && (
                    <>
                        {isLoadingOrders ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                                <p className="text-gray-400 mt-4">로딩 중...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20 border border-gray-800 rounded-lg">
                                <p className="text-gray-400">신청 내역이 없습니다.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Mobile View (Cards) */}
                                <div className="md:hidden grid grid-cols-2 gap-3">
                                    {orders.map((order) => {
                                        const statusLabel = getOrderStatusLabel(order.status);
                                        const statusClass = getOrderStatusClass(order.status);
                                        return (
                                            <div key={order.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusClass}`}>
                                                        {statusLabel}
                                                    </span>
                                                    <button
                                                        onClick={() => handleOrderClick(order)}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <MoreVertical size={14} />
                                                    </button>
                                                </div>

                                                <div className="flex-1 space-y-1 mb-3">
                                                    <h3 className="text-white text-sm font-medium truncate">{order.name}</h3>
                                                    <p className="text-xs text-gray-500 truncate">{order.schedule_display || '일정 미정'}</p>
                                                    <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('ko-KR')}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Desktop View (Table) */}
                                <div className="hidden md:block bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead className="bg-black/50 text-gray-500 text-xs uppercase tracking-wider">
                                                <tr>
                                                    <th className="px-6 py-4 font-medium whitespace-nowrap">신청자</th>
                                                    <th className="px-6 py-4 font-medium whitespace-nowrap">연락처</th>
                                                    <th className="px-6 py-4 font-medium whitespace-nowrap">일정</th>
                                                    <th className="px-6 py-4 font-medium whitespace-nowrap">신청일</th>
                                                    <th className="px-6 py-4 font-medium whitespace-nowrap">상태</th>
                                                    <th className="px-6 py-4 font-medium text-right whitespace-nowrap">관리</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {orders.map((order) => {
                                                    const statusLabel = getOrderStatusLabel(order.status);
                                                    const statusClass = getOrderStatusClass(order.status);
                                                    return (
                                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-white font-medium">{order.name}</div>
                                                                {order.email && <div className="text-gray-500 text-xs">{order.email}</div>}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{order.phone}</td>
                                                            <td className="px-6 py-4 text-gray-400 text-sm">{order.schedule_display || '일정 미정'}</td>
                                                            <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">
                                                                {new Date(order.created_at).toLocaleDateString('ko-KR')}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
                                                                    {order.status === 'confirmed' && <CheckCircle2 size={12} />}
                                                                    {order.status === 'pending' && <Clock size={12} />}
                                                                    {order.status === 'cancelled' && <XCircle size={12} />}
                                                                    {statusLabel}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                                <button
                                                                    onClick={() => handleOrderClick(order)}
                                                                    className="text-gray-400 hover:text-white p-2"
                                                                >
                                                                    <MoreVertical size={16} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
