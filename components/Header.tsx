"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Class", href: "/class" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Hide Header on Admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled || isMobileMenuOpen ? "bg-black/90 backdrop-blur-md border-gray-800 py-4" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="relative z-50">
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white relative z-50 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-all duration-500 md:hidden",
                isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}>
                {/* Header inside Menu */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                    <Logo />
                    <button
                        className="text-white p-2 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col items-center gap-12">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-3xl font-serif font-bold tracking-widest transition-all duration-500 hover:text-primary hover:scale-110",
                                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                                pathname === item.href ? "text-primary" : "text-white"
                            )}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
