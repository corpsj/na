"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface PortfolioFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export default function PortfolioFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: PortfolioFormModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        category: "Wedding",
        date: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                category: "Wedding",
                date: new Date().toISOString().split("T")[0],
                description: "",
                image: "",
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-serif text-white">
                        {initialData ? "작품 수정" : "새 작품 등록"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload Mock */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                            대표 이미지
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-black/20">
                            {formData.image ? (
                                <div className="relative w-full h-48">
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "" })}
                                        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 text-gray-500 mb-3" />
                                    <p className="text-sm text-gray-400">
                                        클릭하여 이미지를 업로드하세요
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        JPG, PNG up to 10MB
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                제목
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="작품 제목을 입력하세요"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                카테고리
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            >
                                <option value="Wedding">Wedding</option>
                                <option value="Bouquet">Bouquet</option>
                                <option value="Centerpiece">Centerpiece</option>
                                <option value="Installation">Installation</option>
                                <option value="Gardening">Gardening</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                날짜
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                            설명
                        </label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="작품에 대한 설명을 입력하세요"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors"
                        >
                            {initialData ? "수정 완료" : "등록하기"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
