"use client";

import { useState } from "react";
import {
    Plus,
    MoreVertical,
    Users,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react";
import Image from "next/image";

// --- Mock Data ---
const classes = [
    {
        id: 1,
        title: "Winter Wreath Masterclass",
        category: "One-day Class",
        status: "모집중",
        applicants: 12,
        capacity: 15,
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop",
        price: "150,000"
    },
    {
        id: 2,
        title: "Hand-tied Basics",
        category: "Regular Course",
        status: "마감",
        applicants: 8,
        capacity: 8,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2187&auto=format&fit=crop",
        price: "450,000"
    },
    {
        id: 3,
        title: "Wedding Bouquet",
        category: "Master Class",
        status: "종료",
        applicants: 6,
        capacity: 6,
        image: "https://images.unsplash.com/photo-1551751299-1b51bc6175d6?q=80&w=2072&auto=format&fit=crop",
        price: "250,000"
    }
];

const orders = [
    { id: "ORD-001", name: "김민지", class: "Winter Wreath", date: "2024.12.14", status: "대기", amount: "150,000" },
    { id: "ORD-002", name: "이준호", class: "Winter Wreath", date: "2024.12.15", status: "확정", amount: "150,000" },
    { id: "ORD-003", name: "박소연", class: "Hand-tied Basics", date: "2024.11.20", status: "확정", amount: "450,000" },
    { id: "ORD-004", name: "최우성", class: "Winter Wreath", date: "2024.12.14", status: "취소", amount: "150,000" },
    { id: "ORD-005", name: "정해린", class: "Wedding Bouquet", date: "2024.10.05", status: "확정", amount: "250,000" },
];

import ClassFormModal from "@/components/admin/ClassFormModal";
import ScheduleManagementModal from "@/components/admin/ScheduleManagementModal";
import OrderManagementModal from "@/components/admin/OrderManagementModal";

export default function AdminClassPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "applications">("overview");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    // Order Management State
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleCreate = (data: any) => {
        console.log("Create Class:", data);
        alert("새 클래스가 등록되었습니다. (데모)");
    };

    const handleOrderClick = (order: any) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const handleOrderStatusUpdate = (orderId: string, newStatus: string) => {
        console.log(`Update Order ${orderId} to ${newStatus}`);
        alert("주문 상태가 변경되었습니다. (데모)");
        // In a real app, you would update the 'orders' state here
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
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <Plus size={16} />
                        새 클래스 등록
                    </button>
                )}
            </div>

            <ClassFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />

            <ScheduleManagementModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
            />

            <OrderManagementModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                order={selectedOrder}
                onUpdateStatus={handleOrderStatusUpdate}
            />

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="group bg-gray-900/50 border border-gray-800 rounded-xl md:rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 flex flex-col">
                                <div className="relative h-32 md:h-48 w-full overflow-hidden shrink-0">
                                    <Image
                                        src={cls.image}
                                        alt={cls.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                        <button className="bg-black/50 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-black transition-colors">
                                            <MoreVertical size={14} className="md:w-4 md:h-4" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                                        <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-md ${cls.status === '모집중' ? 'bg-green-500/80 text-white' :
                                            cls.status === '마감' ? 'bg-yellow-500/80 text-black' :
                                                'bg-gray-500/80 text-white'
                                            }`}>
                                            {cls.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6 flex flex-col flex-1">
                                    <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest font-medium mb-1 md:mb-2 truncate">{cls.category}</p>
                                    <h3 className="text-sm md:text-xl text-white font-serif mb-2 md:mb-4 line-clamp-1">{cls.title}</h3>

                                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-6 mt-auto">
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <Users size={12} className="md:w-3.5 md:h-3.5" />
                                            <span>{cls.applicants}/{cls.capacity}</span>
                                        </div>
                                        <div className="font-medium text-white">
                                            ₩ {cls.price.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="px-2 py-1.5 md:px-4 md:py-2 bg-gray-800 text-white text-xs md:text-sm rounded-md md:rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => setIsScheduleModalOpen(true)}
                                            className="px-2 py-1.5 md:px-4 md:py-2 border border-gray-700 text-gray-300 text-xs md:text-sm rounded-md md:rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                                        >
                                            일정
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === "applications" && (
                    <div className="space-y-4">
                        {/* Mobile View (Cards) */}
                        <div className="md:hidden grid grid-cols-2 gap-3">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${order.status === '확정' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            order.status === '대기' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {order.status}
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
                                        <p className="text-xs text-gray-500 truncate">{order.class}</p>
                                        <p className="text-xs text-gray-400">{order.date}</p>
                                    </div>

                                    <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
                                        <span className="text-xs text-white font-medium">₩ {order.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View (Table) */}
                        <div className="hidden md:block bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[800px]">
                                    <thead className="bg-black/50 text-gray-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">주문번호</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">신청자</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">클래스</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">날짜</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">결제금액</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">상태</th>
                                            <th className="px-6 py-4 font-medium text-right whitespace-nowrap">관리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-gray-500 text-sm font-mono whitespace-nowrap">{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-white font-medium">{order.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">{order.class}</td>
                                                <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{order.date}</td>
                                                <td className="px-6 py-4 text-white text-sm whitespace-nowrap">₩ {order.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === '확정' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        order.status === '대기' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-500 border-red-500/20'
                                                        }`}>
                                                        {order.status === '확정' && <CheckCircle2 size={12} />}
                                                        {order.status === '대기' && <Clock size={12} />}
                                                        {order.status === '취소' && <XCircle size={12} />}
                                                        {order.status}
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
