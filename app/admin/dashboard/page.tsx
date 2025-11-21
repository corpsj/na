export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Portfolio", value: "24", change: "+2 this month" },
                    { label: "Active Classes", value: "3", change: "1 recruiting" },
                    { label: "Total Visitors", value: "1,234", change: "+12% vs last month" },
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
                <h3 className="text-lg font-medium text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {[
                        { action: "New Portfolio Added", target: "Winter Wedding Bouquet", time: "2 hours ago" },
                        { action: "Class Status Updated", target: "Hand-tied Masterclass", time: "5 hours ago" },
                        { action: "New Inquiry", target: "Wedding Flower Consultation", time: "1 day ago" },
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
