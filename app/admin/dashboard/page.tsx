export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "총 포트폴리오", value: "24", change: "이번 달 +2" },
                    { label: "진행 중인 클래스", value: "3", change: "1개 모집 중" },
                    { label: "총 방문자 수", value: "1,234", change: "지난달 대비 +12%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                            <span className="text-xs text-primary">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
