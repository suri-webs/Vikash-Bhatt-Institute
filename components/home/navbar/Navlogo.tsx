import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface NavLogoProps {
    onClick: () => void;
}

export function NavLogo({ onClick }: NavLogoProps) {
    return (
        <Link href="/" className="flex  items-center gap-2.5" onClick={onClick}>
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-gray-900 font-bold text-sm tracking-tight">
                    vikas Bhatt
                </span>
                <span className="text-cyan-500 font-medium text-[10px] tracking-widest uppercase">
                    Classes
                </span>
            </div>
        </Link>
    );
}