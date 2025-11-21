"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const adminNavItems = [
    { name: "대시보드", href: "/admin/dashboard", icon: "📊" },
    { name: "포트폴리오", href: "/admin/portfolio", icon: "🖼️" },
    { name: "클래스 관리", href: "/admin/class", icon: "🎓" },
    { name: "설정", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Don't show layout on login page
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-gray-900/30 hidden md:flex flex-col">
                <div className="p-8 border-b border-gray-800">
                    <h1 className="font-serif text-2xl font-bold text-white tracking-widest">BYUNHWA</h1>
                    <p className="text-xs text-primary mt-1">ADMIN CONSOLE</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                            )}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors px-4 py-2"
                    >
                        <span>🚪</span> Logout
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out md:hidden",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h1 className="font-serif text-xl font-bold text-white tracking-widest">BYUNHWA</h1>
                        <p className="text-xs text-primary mt-1">ADMIN CONSOLE</p>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                            )}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800 absolute bottom-0 w-full">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors px-4 py-2"
                    >
                        <span>🚪</span> Logout
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 md:px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-white font-medium capitalize hidden md:block">
                            {pathname.split("/").pop()}
                        </h2>
                        {/* Mobile Title */}
                        <h2 className="text-white font-medium capitalize md:hidden">
                            {adminNavItems.find(item => pathname.startsWith(item.href))?.name || "Admin"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-white">
                            AD
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
