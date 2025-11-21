"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    Plus,
    MoreVertical,
    Search,
    CheckCircle2,
    Clock,
    XCircle,
    LogOut
} from "lucide-react";
import Image from "next/image";

// --- Mock Data ---
const stats = [
    { label: "Total Revenue", value: "₩ 4,500,000", change: "+12%", trend: "up" },
    { label: "Active Students", value: "24", change: "+4", trend: "up" },
    { label: "Pending Orders", value: "7", change: "-2", trend: "down" },
];

const classes = [
    {
        id: 1,
        title: "Winter Wreath Masterclass",
        category: "One-day Class",
        status: "Recruiting",
        applicants: 12,
        capacity: 15,
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop",
        price: "150,000"
    },
    {
        id: 2,
        title: "Hand-tied Basics",
        category: "Regular Course",
        status: "Full",
        applicants: 8,
        capacity: 8,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2187&auto=format&fit=crop",
        price: "450,000"
    },
    {
        id: 3,
        title: "Wedding Bouquet",
        category: "Master Class",
        status: "Closed",
        applicants: 6,
        capacity: 6,
        image: "https://images.unsplash.com/photo-1551751299-1b51bc6175d6?q=80&w=2072&auto=format&fit=crop",
        price: "250,000"
    }
];

const orders = [
    { id: "ORD-001", name: "Kim Minji", class: "Winter Wreath", date: "2024.12.14", status: "pending", amount: "150,000" },
    { id: "ORD-002", name: "Lee Junho", class: "Winter Wreath", date: "2024.12.15", status: "confirmed", amount: "150,000" },
    { id: "ORD-003", name: "Park Soyeon", class: "Hand-tied Basics", date: "2024.11.20", status: "confirmed", amount: "450,000" },
    { id: "ORD-004", name: "Choi Woosung", class: "Winter Wreath", date: "2024.12.14", status: "cancelled", amount: "150,000" },
    { id: "ORD-005", name: "Jung Haerin", class: "Wedding Bouquet", date: "2024.10.05", status: "confirmed", amount: "250,000" },
];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin1234") setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl p-8 border border-gray-800 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl text-white font-serif mb-2">Byunhwa Admin</h1>
                        <p className="text-gray-500 text-sm">Please enter your credentials</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex text-gray-300 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-gray-900/30 flex flex-col fixed h-full z-20 backdrop-blur-md">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl text-white font-serif tracking-tight">Byunhwa.</h1>
                    <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">Studio Manager</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { id: "classes", label: "Class Management", icon: Calendar },
                        { id: "orders", label: "Applications", icon: Users },
                        { id: "settings", label: "Settings", icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
                                    ? "bg-white text-black shadow-lg shadow-white/10 font-medium"
                                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl text-white font-serif capitalize">{activeTab.replace('-', ' ')}</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your studio efficiently</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:border-gray-500 w-64"
                            />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-serif">
                            B
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* DASHBOARD TAB */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm hover:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                        <p className="text-3xl text-white font-serif">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity Preview */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                                    <h3 className="text-white font-serif text-xl mb-6">Recent Applications</h3>
                                    <div className="space-y-4">
                                        {orders.slice(0, 3).map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800/50">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                                                        {order.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm font-medium">{order.name}</p>
                                                        <p className="text-gray-500 text-xs">{order.class}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full border ${order.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CLASSES TAB */}
                    {activeTab === "classes" && (
                        <div>
                            <div className="flex justify-end mb-6">
                                <button className="bg-white text-black px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                                    <Plus size={18} />
                                    Add New Class
                                </button>
                            </div>

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
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${cls.status === 'Recruiting' ? 'bg-green-500/80 text-white' :
                                                        cls.status === 'Full' ? 'bg-yellow-500/80 text-black' :
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
                                                <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                                                    Edit Details
                                                </button>
                                                <button className="px-4 py-2 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors">
                                                    Schedule
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === "orders" && (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-black/50 text-gray-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Order ID</th>
                                            <th className="px-6 py-4 font-medium">Customer</th>
                                            <th className="px-6 py-4 font-medium">Class</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium">Amount</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-gray-500 text-sm font-mono">{order.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-white font-medium">{order.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">{order.class}</td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">{order.date}</td>
                                                <td className="px-6 py-4 text-white text-sm">₩ {order.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                                        }`}>
                                                        {order.status === 'confirmed' && <CheckCircle2 size={12} />}
                                                        {order.status === 'pending' && <Clock size={12} />}
                                                        {order.status === 'cancelled' && <XCircle size={12} />}
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
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
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-8">
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-4">General Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-2">Studio Name</label>
                                            <input type="text" defaultValue="Byunhwa" className="w-full bg-black/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-2">Contact Email</label>
                                            <input type="email" defaultValue="contact@byunhwa.com" className="w-full bg-black/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-800">
                                    <h3 className="text-white font-serif text-xl mb-4">Bank Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-2">Bank Name</label>
                                            <input type="text" defaultValue="Shinhan Bank" className="w-full bg-black/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-2">Account Holder</label>
                                            <input type="text" defaultValue="Na HoSeong" className="w-full bg-black/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-gray-500 text-sm mb-2">Account Number</label>
                                            <input type="text" defaultValue="110-123-456789" className="w-full bg-black/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
