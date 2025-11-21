"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Clock, XCircle, Phone, Mail, CreditCard } from "lucide-react";

interface OrderManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: any;
    onUpdateStatus: (orderId: string, newStatus: string) => void;
}

export default function OrderManagementModal({
    isOpen,
    onClose,
    order,
    onUpdateStatus,
}: OrderManagementModalProps) {
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (order) {
            setStatus(order.status);
            setNote(order.note || "");
        }
    }, [order]);

    if (!isOpen || !order) return null;

    const handleSave = () => {
        onUpdateStatus(order.id, status);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-serif text-white">수강 신청 관리</h2>
                        <p className="text-sm text-gray-500 mt-1 font-mono">{order.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-lg font-bold text-white">
                            {order.name[0]}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-medium text-lg">{order.name}</h3>
                            <div className="flex flex-col gap-1 mt-1 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Phone size={14} />
                                    <span>010-1234-5678</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} />
                                    <span>user@example.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Class Info */}
                    <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-gray-800">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">클래스</span>
                            <span className="text-white font-medium text-right">{order.class}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">일정</span>
                            <span className="text-white text-right">{order.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">결제 금액</span>
                            <span className="text-primary font-bold text-right">₩ {order.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-gray-500">결제 수단</span>
                            <span className="text-gray-300 flex items-center gap-1">
                                <CreditCard size={14} /> 카드 결제
                            </span>
                        </div>
                    </div>

                    {/* Status Control */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">상태 변경</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setStatus("대기")}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${status === "대기"
                                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                                        : "bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                <Clock size={20} className="mb-1" />
                                <span className="text-xs">대기</span>
                            </button>
                            <button
                                onClick={() => setStatus("확정")}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${status === "확정"
                                        ? "bg-green-500/10 border-green-500 text-green-500"
                                        : "bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                <CheckCircle2 size={20} className="mb-1" />
                                <span className="text-xs">확정</span>
                            </button>
                            <button
                                onClick={() => setStatus("취소")}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${status === "취소"
                                        ? "bg-red-500/10 border-red-500 text-red-500"
                                        : "bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                <XCircle size={20} className="mb-1" />
                                <span className="text-xs">취소</span>
                            </button>
                        </div>
                    </div>

                    {/* Admin Note */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">관리자 메모</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-primary resize-none"
                            rows={3}
                            placeholder="특이사항을 입력하세요..."
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors"
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}
