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

            {/* Recent Activity */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-6">최근 활동</h3>
                <div className="space-y-4">
                    {[
                        { action: "새 포트폴리오 등록", target: "겨울 웨딩 부케", time: "2시간 전" },
                        { action: "클래스 상태 변경", target: "핸드타이드 마스터클래스", time: "5시간 전" },
                        { action: "새로운 문의", target: "웨딩 플라워 상담", time: "1일 전" },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                            <div>
                                <p className="text-white text-sm font-medium">{activity.action}</p>
                                <p className="text-gray-500 text-xs">{activity.target}</p>
                            </div>
                            <span className="text-gray-600 text-xs">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
