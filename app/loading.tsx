export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative">
                <div className="w-16 h-16 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                </div>
            </div>
            <h2 className="absolute mt-24 text-xs font-bold tracking-[0.3em] text-gray-500 uppercase animate-pulse">
                Loading
            </h2>
        </div>
    );
}
