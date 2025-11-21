export default function AdminPortfolioPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif text-white">포트폴리오 관리</h1>
                <button className="bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-red-900 transition-colors">
                    + 새 작품 등록
                </button>
            </div>

            <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 font-medium border-b border-gray-800">
                        <tr>
                            <th className="px-6 py-4">이미지</th>
                            <th className="px-6 py-4">제목</th>
                            <th className="px-6 py-4">카테고리</th>
                            <th className="px-6 py-4">날짜</th>
                            <th className="px-6 py-4 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {[
                            { id: 1, title: "Winter Wedding Bouquet", category: "Wedding", date: "2024-11-20" },
                            { id: 2, title: "Christmas Wreath", category: "Wreath", date: "2024-11-18" },
                            { id: 3, title: "Vase Arrangement", category: "Arrangement", date: "2024-11-15" },
                            { id: 4, title: "Bridal Shower Decor", category: "Event", date: "2024-11-10" },
                        ].map((item) => (
                            <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-md"></div>
                                </td>
                                <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="text-gray-400 hover:text-white transition-colors">수정</button>
                                    <button className="text-red-500 hover:text-red-400 transition-colors">삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
