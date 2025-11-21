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
    metadataBase: new URL('https://byunhwa.vercel.app'),
    title: {
        default: "변화 變花 | Florist Portfolio & Class",
        template: "%s | 변화 變花"
    },
    description: "변화(變花)는 꽃을 통해 일상의 특별한 순간을 디자인합니다. 플로리스트 포트폴리오 및 원데이 클래스.",
    keywords: ["플로리스트", "꽃꽂이", "원데이클래스", "플라워클래스", "부케", "웨딩", "변화", "Byunhwa"],
    openGraph: {
        title: "변화 變花 | Florist Portfolio & Class",
        description: "꽃을 통해 일상의 특별한 순간을 디자인합니다.",
        url: 'https://byunhwa.vercel.app',
        siteName: '변화 變花',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg', // We will need to ensure this exists or use a placeholder
                width: 1200,
                height: 630,
                alt: 'Byunhwa Floral Design',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "변화 變花 | Florist Portfolio & Class",
        description: "꽃을 통해 일상의 특별한 순간을 디자인합니다.",
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
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
