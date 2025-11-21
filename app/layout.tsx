import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "변화 變花 | 변화를 추구합니다",
    description: "변화(變花) - 꽃을 통해 일상의 특별한 순간을 디자인합니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
