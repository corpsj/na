import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
            <div className="text-center space-y-6">
                <h1 className="font-serif text-9xl text-primary opacity-20 select-none">
                    404
                </h1>
                <div className="space-y-4 relative z-10 -mt-12">
                    <h2 className="text-2xl md:text-3xl font-serif font-medium">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        요청하신 페이지를 찾을 수 없습니다.<br />
                        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
                    </p>
                </div>
                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-block border border-gray-800 px-8 py-3 text-sm hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
