import { useState } from "react";
import PortfolioFormModal from "@/components/admin/PortfolioFormModal";
import { Plus, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function AdminPortfolioPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const handleCreate = (data: any) => {
        if (editingItem) {
            console.log("Update Portfolio:", { ...editingItem, ...data });
            alert("작품이 수정되었습니다. (데모)");
        } else {
            console.log("Create Portfolio:", data);
            alert("새 작품이 등록되었습니다. (데모)");
        }
        setEditingItem(null);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsModalOpen(true);
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

            {/* Mobile View (Cards) */}
            <div className="md:hidden grid grid-cols-2 gap-3">
                {[
                    { id: 1, title: "Winter Wedding Bouquet", category: "Wedding", date: "2024-11-20", description: "Beautiful winter bouquet", image: "" },
                    { id: 2, title: "Christmas Wreath", category: "Wreath", date: "2024-11-18", description: "Festive wreath", image: "" },
                    { id: 3, title: "Vase Arrangement", category: "Arrangement", date: "2024-11-15", description: "Elegant vase arrangement", image: "" },
                    { id: 4, title: "Bridal Shower Decor", category: "Event", date: "2024-11-10", description: "Romantic decor", image: "" },
                ].map((item) => (
                    <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden flex flex-col">
                        <div className="relative aspect-square w-full bg-gray-800">
                            {item.image ? (
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
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
                            <p className="text-xs text-gray-500 mt-auto">{item.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View (Table) */}
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
                            {[
                                { id: 1, title: "Winter Wedding Bouquet", category: "Wedding", date: "2024-11-20", description: "Beautiful winter bouquet", image: "" },
                                { id: 2, title: "Christmas Wreath", category: "Wreath", date: "2024-11-18", description: "Festive wreath", image: "" },
                                { id: 3, title: "Vase Arrangement", category: "Arrangement", date: "2024-11-15", description: "Elegant vase arrangement", image: "" },
                                { id: 4, title: "Bridal Shower Decor", category: "Event", date: "2024-11-10", description: "Romantic decor", image: "" },
                            ].map((item) => (
                                <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-gray-800 rounded-md"></div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs whitespace-nowrap">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button className="text-red-500 hover:text-red-400 transition-colors">삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PortfolioFormModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSubmit={handleCreate}
                initialData={editingItem}
            />
        </div>
    );
}
