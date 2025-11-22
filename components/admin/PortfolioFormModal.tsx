"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

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
        description: "",
        display_order: 0,
    });

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [uploadedImagePaths, setUploadedImagePaths] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                category: initialData.category || "웨딩",
                description: initialData.description || "",
                display_order: initialData.display_order || 0,
            });
            // 기존 이미지 로드
            const existingImages = initialData.image_urls || (initialData.image_url ? [initialData.image_url] : []);
            setImageUrls(existingImages);
            setUploadedImagePaths([]);
        } else {
            setFormData({
                title: "",
                category: "Wedding",
                description: "",
                display_order: 0,
            });
            setImageUrls([]);
            setUploadedImagePaths([]);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const uploadFiles = async (files: FileList | File[]) => {
        const filesArray = Array.from(files);

        // 파일 검증
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const validFiles = filesArray.filter(file => {
            if (!allowedTypes.includes(file.type)) {
                toast.error(`${file.name}: JPG, PNG, WebP 파일만 업로드 가능합니다.`);
                return false;
            }
            if (file.size > maxSize) {
                toast.error(`${file.name}: 파일 크기는 5MB 이하여야 합니다.`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setIsUploading(true);

        try {
            const newUrls: string[] = [];
            const newPaths: string[] = [];

            for (const file of validFiles) {
                const formDataToUpload = new FormData();
                formDataToUpload.append('file', file);
                formDataToUpload.append('folder', 'portfolios');

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formDataToUpload,
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || '업로드 실패');
                }

                newUrls.push(result.url);
                newPaths.push(result.path);
            }

            setImageUrls([...imageUrls, ...newUrls]);
            setUploadedImagePaths([...uploadedImagePaths, ...newPaths]);
            toast.success(`${newUrls.length}개의 이미지가 업로드되었습니다.`);
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(error.message || '이미지 업로드에 실패했습니다.');
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        await uploadFiles(files);
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
            await uploadFiles(files);
        }
    };

    const handleImageDelete = async (index: number) => {
        const imagePath = uploadedImagePaths[index];

        // 새로 업로드한 이미지만 서버에서 삭제
        if (imagePath) {
            try {
                const response = await fetch('/api/upload', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: imagePath }),
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

        // 배열에서 제거
        const newUrls = imageUrls.filter((_, i) => i !== index);
        const newPaths = uploadedImagePaths.filter((_, i) => i !== index);

        setImageUrls(newUrls);
        setUploadedImagePaths(newPaths);
        toast.success('이미지가 삭제되었습니다.');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 필수 필드 검증
        if (!formData.title.trim()) {
            toast.error('제목을 입력해주세요.');
            return;
        }
        if (imageUrls.length === 0) {
            toast.error('최소 1개의 이미지를 업로드해주세요.');
            return;
        }

        // 첫 번째 이미지를 대표 이미지로
        const submitData = {
            ...formData,
            image_url: imageUrls[0],
            image_urls: imageUrls,
        };

        onSubmit(submitData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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
                    {/* Image Upload - Multiple with Drag & Drop */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                            이미지 * (여러 장 동시 선택 가능)
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                            multiple
                        />

                        {imageUrls.length === 0 ? (
                            // 드래그 앤 드롭 영역 (이미지가 없을 때)
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${isDragging
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
                                        <p className="text-sm text-gray-400 mb-1">
                                            여러 파일을 한 번에 선택할 수 있습니다
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            JPG, PNG, WebP (각 최대 5MB)
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            // 이미지 갤러리 (이미지가 있을 때)
                            <div className="space-y-4">
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`grid grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-transparent'
                                        }`}
                                >
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="relative aspect-square group">
                                            <Image
                                                src={url}
                                                alt={`Image ${index + 1}`}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                className="object-cover rounded-md"
                                            />
                                            {index === 0 && (
                                                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-bold">
                                                    대표
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleImageDelete(index)}
                                                className="absolute top-2 right-2 bg-black/70 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add More Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="aspect-square border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center hover:border-primary/50 transition-colors bg-black/20 disabled:opacity-50"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin" />
                                                <span className="text-xs text-gray-400">업로드 중...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-8 h-8 text-gray-500 mb-2" />
                                                <span className="text-xs text-gray-400 text-center px-2">
                                                    더 추가<br />(여러 장)
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500">
                                    💡 첫 번째 이미지가 대표 이미지로 사용됩니다. 파일을 드래그하거나 버튼을 클릭하여 추가하세요.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                제목 *
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
                                <option value="Wreath">Wreath</option>
                                <option value="Class">Class</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                정렬 순서
                            </label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) =>
                                    setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                                }
                                className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="0"
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
