export default function ContactPage() {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen bg-background flex items-center justify-center">
            <div className="container mx-auto max-w-2xl text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-white mb-8">Contact Us</h1>
                <p className="text-gray-400 mb-12">
                    작품 의뢰 및 클래스 문의는 아래 연락처로 부탁드립니다.
                </p>

                <div className="space-y-8 bg-gray-900/50 p-12 border border-gray-800">
                    <div>
                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Instagram</h3>
                        <a href="https://instagram.com/bye.on.hwa" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-primary transition-colors font-serif">
                            @bye.on.hwa
                        </a>
                    </div>

                    <div>
                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Email</h3>
                        <a href="mailto:hoss0225@naver.com" className="text-xl text-white hover:text-primary transition-colors">
                            hoss0225@naver.com
                        </a>
                    </div>

                    <div>
                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Phone</h3>
                        <p className="text-xl text-white">
                            010-4086-6231
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
