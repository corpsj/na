"use client";

import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ClassFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export default function ClassFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: ClassFormModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        category: "One-day Class",
        level: "Beginner - Intermediate",
        location: "Byunhwa Studio, Hannam-dong",
        duration: "14:00 - 16:30 (2.5h)",
        price: 150000,
        price_display: "150,000 KRW",
        capacity: "Max 6 people",
        description: "",
        curriculum: [{ step: "01", title: "", content: "" }],
        policy: {
            refund: "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
            note: "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 수업 중 촬영된 사진은 포트폴리오로 활용될 수 있습니다.",
        },
        bank_info: {
            bank: "Shinhan Bank",
            account: "110-123-456789",
            holder: "Byunhwa (Na HoSeong)",
        },
        is_active: true,
    });

    const [imageUrl, setImageUrl] = useState<string>("");
    const [uploadedImagePath, setUploadedImagePath] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                subtitle: initialData.subtitle || "",
                category: initialData.category || "One-day Class",
                level: initialData.level || "Beginner - Intermediate",
                location: initialData.location || "Byunhwa Studio, Hannam-dong",
                duration: initialData.duration || "14:00 - 16:30 (2.5h)",
                price: initialData.price || 150000,
                price_display: initialData.price_display || "150,000 KRW",
                capacity: initialData.capacity || "Max 6 people",
                description: initialData.description || "",
                curriculum: initialData.curriculum || [{ step: "01", title: "", content: "" }],
                policy: initialData.policy || {
                    refund: "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
                    note: "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 수업 중 촬영된 사진은 포트폴리오로 활용될 수 있습니다.",
                },
                bank_info: initialData.bank_info || {
                    bank: "Shinhan Bank",
                    account: "110-123-456789",
                    holder: "Byunhwa (Na HoSeong)",
                },
                is_active: initialData.is_active !== undefined ? initialData.is_active : true,
            });
            // 기존 이미지 로드
            const existingImage = initialData.image_url || "";
            setImageUrl(existingImage);
            setUploadedImagePath("");
        } else {
            // Reset to defaults for new class
            setFormData({
                title: "",
                subtitle: "",
                category: "One-day Class",
                level: "Beginner - Intermediate",
                location: "Byunhwa Studio, Hannam-dong",
                duration: "14:00 - 16:30 (2.5h)",
                price: 150000,
                price_display: "150,000 KRW",
                capacity: "Max 6 people",
                description: "",
                curriculum: [{ step: "01", title: "", content: "" }],
                policy: {
                    refund: "- 수업 7일 전: 100% 환불\n- 수업 3일 전: 50% 환불\n- 이후: 환불 불가",
                    note: "- 시장 상황에 따라 소재가 변경될 수 있습니다.\n- 수업 시작 10분 전까지 도착 부탁드립니다.\n- 꽃 알러지가 있으신 분은 미리 말씀해 주시기 바랍니다.\n- 수업 중 촬영된 사진은 포트폴리오로 활용될 수 있습니다.",
                },
                bank_info: {
                    bank: "Shinhan Bank",
                    account: "110-123-456789",
                    holder: "Byunhwa (Na HoSeong)",
                },
                is_active: true,
            });
            setImageUrl("");
            setUploadedImagePath("");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const uploadFile = async (file: File) => {
        // 파일 검증
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            toast.error('JPG, PNG, WebP 파일만 업로드 가능합니다.');
            return;
        }
        if (file.size > maxSize) {
            toast.error('파일 크기는 5MB 이하여야 합니다.');
            return;
        }

        setIsUploading(true);

        try {
            // 기존 이미지가 있으면 삭제
            if (uploadedImagePath) {
                try {
                    await fetch('/api/upload', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ path: uploadedImagePath }),
                    });
                } catch (error) {
                    console.error('Previous image delete error:', error);
                }
            }

            const formDataToUpload = new FormData();
            formDataToUpload.append('file', file);
            formDataToUpload.append('folder', 'classes');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataToUpload,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || '업로드 실패');
            }

            setImageUrl(result.url);
            setUploadedImagePath(result.path);
            toast.success('이미지가 업로드되었습니다.');
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(error.message || '이미지 업로드에 실패했습니다.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        await uploadFile(files[0]); // 첫 번째 파일만 사용
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await uploadFile(files[0]); // 첫 번째 파일만 사용
        }
    };

    const handleImageDelete = async () => {
        if (uploadedImagePath) {
            try {
                const response = await fetch('/api/upload', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: uploadedImagePath }),
                });

                if (!response.ok) {
                    throw new Error('삭제 실패');
                }
            } catch (error) {
                console.error('Delete error:', error);
                toast.error('이미지 삭제에 실패했습니다.');
                return;
            }
        }

        setImageUrl("");
        setUploadedImagePath("");
        toast.success('이미지가 삭제되었습니다.');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 필수 필드 검증
        if (!formData.title.trim()) {
            toast.error('클래스명을 입력해주세요.');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('설명을 입력해주세요.');
            return;
        }
        if (!imageUrl) {
            toast.error('이미지를 업로드해주세요.');
            return;
        }
        if (!formData.location.trim()) {
            toast.error('장소를 입력해주세요.');
            return;
        }
        if (!formData.duration.trim()) {
            toast.error('소요 시간을 입력해주세요.');
            return;
        }
        if (!formData.price || formData.price <= 0) {
            toast.error('수강료를 입력해주세요.');
            return;
        }

        const submitData = {
            ...formData,
            image_url: imageUrl,
        };

        onSubmit(submitData);
        onClose();
    };

    const handleCurriculumChange = (index: number, field: string, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index] = { ...newCurriculum[index], [field]: value };
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const addCurriculumStep = () => {
        const nextStep = (formData.curriculum.length + 1).toString().padStart(2, "0");
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { step: nextStep, title: "", content: "" }],
        });
    };

    const removeCurriculumStep = (index: number) => {
        const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
        const reIndexed = newCurriculum.map((item, i) => ({
            ...item,
            step: (i + 1).toString().padStart(2, "0"),
        }));
        setFormData({ ...formData, curriculum: reIndexed });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                    <h2 className="text-xl font-serif text-white">
                        {initialData ? "클래스 수정" : "새 클래스 등록"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">클래스명 *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="Winter Wreath Masterclass"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">부제 (한글)</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="겨울의 무드를 담은 리스 제작"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">카테고리</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="One-day Class"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">난이도</label>
                                <input
                                    type="text"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="Beginner - Intermediate"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">수강료 (숫자) *</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="150000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">수강료 (표시) *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.price_display}
                                    onChange={(e) => setFormData({ ...formData, price_display: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="150,000 KRW"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">정원</label>
                                <input
                                    type="text"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="Max 6 people"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">소요 시간 *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="14:00 - 16:30 (2.5h)"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">장소 *</label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                placeholder="Byunhwa Studio, Hannam-dong"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">설명 *</label>
                            <textarea
                                rows={4}
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                placeholder="클래스에 대한 설명을 입력하세요"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label htmlFor="is_active" className="text-sm text-gray-400 cursor-pointer">
                                활성화 (모집 중으로 표시)
                            </label>
                        </div>
                    </section>

                    {/* Image Upload - Single Image with Drag & Drop */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">이미지 *</h3>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {!imageUrl ? (
                            // 드래그 앤 드롭 영역 (이미지가 없을 때)
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                                    isDragging
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-700 hover:border-primary/50 bg-black/20'
                                } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-12 h-12 text-primary mb-3 animate-spin" />
                                        <p className="text-sm text-gray-400">업로드 중...</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-500 mb-3" />
                                        <p className="text-base text-white font-medium mb-2">
                                            클릭하거나 이미지를 드래그하세요
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            JPG, PNG, WebP (최대 5MB)
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            // 이미지 프리뷰 (이미지가 있을 때)
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative aspect-video rounded-lg overflow-hidden border-2 border-dashed transition-colors ${
                                    isDragging ? 'border-primary bg-primary/10' : 'border-transparent'
                                }`}
                            >
                                <Image
                                    src={imageUrl}
                                    alt="Class Image"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        변경
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleImageDelete}
                                        className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="text-xs text-gray-500">
                            💡 이미지를 드래그하거나 클릭하여 업로드하세요. 기존 이미지 위에 드래그하면 교체됩니다.
                        </p>
                    </section>

                    {/* Curriculum */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <h3 className="text-lg font-medium text-white">커리큘럼</h3>
                            <button type="button" onClick={addCurriculumStep} className="text-primary text-sm font-bold flex items-center gap-1 hover:text-red-400">
                                <Plus size={16} /> 단계 추가
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.curriculum.map((item, index) => (
                                <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 relative">
                                    <button
                                        type="button"
                                        onClick={() => removeCurriculumStep(index)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div className="md:col-span-1">
                                            <label className="block text-xs text-gray-500 mb-1">Step</label>
                                            <input
                                                type="text"
                                                value={item.step}
                                                readOnly
                                                className="w-full bg-black/30 border border-gray-700 rounded px-2 py-1 text-white text-center"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="block text-xs text-gray-500 mb-1">제목</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleCurriculumChange(index, "title", e.target.value)}
                                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:border-primary"
                                                placeholder="Theory & Demo"
                                            />
                                        </div>
                                        <div className="md:col-span-7">
                                            <label className="block text-xs text-gray-500 mb-1">내용</label>
                                            <input
                                                type="text"
                                                value={item.content}
                                                onChange={(e) => handleCurriculumChange(index, "content", e.target.value)}
                                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:border-primary"
                                                placeholder="리스 제작의 기초 이론 설명 및 소재 소개"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Policy */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">규정 및 유의사항</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">환불 규정</label>
                                <textarea
                                    rows={4}
                                    value={formData.policy.refund}
                                    onChange={(e) => setFormData({ ...formData, policy: { ...formData.policy, refund: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">유의사항</label>
                                <textarea
                                    rows={4}
                                    value={formData.policy.note}
                                    onChange={(e) => setFormData({ ...formData, policy: { ...formData.policy, note: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Bank Info */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">입금 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">은행</label>
                                <input
                                    type="text"
                                    value={formData.bank_info.bank}
                                    onChange={(e) => setFormData({ ...formData, bank_info: { ...formData.bank_info, bank: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="Shinhan Bank"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">계좌번호</label>
                                <input
                                    type="text"
                                    value={formData.bank_info.account}
                                    onChange={(e) => setFormData({ ...formData, bank_info: { ...formData.bank_info, account: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="110-123-456789"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">예금주</label>
                                <input
                                    type="text"
                                    value={formData.bank_info.holder}
                                    onChange={(e) => setFormData({ ...formData, bank_info: { ...formData.bank_info, holder: e.target.value } })}
                                    className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="Byunhwa (Na HoSeong)"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 sticky bottom-0 bg-gray-900 py-4 -mx-6 px-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {initialData ? "수정 완료" : "등록하기"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
