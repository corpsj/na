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

export default function AdminClassPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "applications">("overview");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const handleCreate = (data: any) => {
        console.log("Create Class:", data);
        alert("새 클래스가 등록되었습니다. (데모)");
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

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="group bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={cls.image}
                                        alt={cls.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <button className="bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-black transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${cls.status === '모집중' ? 'bg-green-500/80 text-white' :
                                            cls.status === '마감' ? 'bg-yellow-500/80 text-black' :
                                                'bg-gray-500/80 text-white'
                                            }`}>
                                            {cls.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-primary text-xs uppercase tracking-widest font-medium mb-2">{cls.category}</p>
                                    <h3 className="text-xl text-white font-serif mb-4">{cls.title}</h3>

                                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Users size={14} />
                                            <span>{cls.applicants} / {cls.capacity}</span>
                                        </div>
                                        <div className="font-medium text-white">
                                            ₩ {cls.price}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            상세 수정
                                        </button>
                                        <button
                                            onClick={() => setIsScheduleModalOpen(true)}
                                            className="px-4 py-2 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            일정 관리
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
                        <div className="md:hidden space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs text-gray-500 font-mono">{order.id}</span>
                                            <h3 className="text-white font-medium mt-1">{order.name}</h3>
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === '확정' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            order.status === '대기' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-400">
                                        <div className="flex justify-between">
                                            <span>클래스</span>
                                            <span className="text-white">{order.class}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>날짜</span>
                                            <span className="text-white">{order.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>결제금액</span>
                                            <span className="text-white">₩ {order.amount}</span>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-gray-800 flex justify-end">
                                        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                                            <MoreVertical size={14} /> 관리
                                        </button>
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
                                                    <button className="text-gray-400 hover:text-white p-2">
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
