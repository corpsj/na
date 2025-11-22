"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
    const pathname = usePathname();

    // Hide Footer on Admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-background border-t border-border py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            변화(變花)는 꽃을 통해 일상의 특별한 순간을 디자인합니다.<br />
                            당신만의 감성을 담은 꽃을 만나보세요.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Menu</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                            <li><Link href="/class" className="hover:text-primary transition-colors">Class</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <span className="block text-xs text-gray-500 mb-1">Instagram</span>
                                <a href="https://instagram.com/bye.on.hwa" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    @bye.on.hwa
                                </a>
                            </li>
                            <li>
                                <span className="block text-xs text-gray-500 mb-1">Email</span>
                                <a href="mailto:hoss0225@naver.com" className="hover:text-primary transition-colors">
                                    hoss0225@naver.com
                                </a>
                            </li>
                            <li>
                                <span className="block text-xs text-gray-500 mb-1">Phone</span>
                                010-4086-6231
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} <Link href="/admin/login" className="cursor-default">Byunhwa</Link>. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/policy/terms" className="hover:text-primary transition-colors">이용약관</Link>
                        <Link href="/policy/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
