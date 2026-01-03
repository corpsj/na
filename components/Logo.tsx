import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden">
                <Image
                    src="/images/logo.png"
                    alt="Byunhwa Logo"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <span className="font-serif text-xl font-bold tracking-widest text-foreground group-hover:text-primary transition-colors">
                BYUNHWA
            </span>
        </Link>
    );
}
