"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

    // Don't show layout on login page
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-white font-medium capitalize">
                        {pathname.split("/").pop()}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-white">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
