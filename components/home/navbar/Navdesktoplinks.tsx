import { navLinks } from "@/components/utils/Navlinks";
import Link from "next/link";

interface NavDesktopLinksProps {
    activeLink: string;
    onLinkClick: (href: string) => void;
}

export function NavDesktopLinks({ activeLink, onLinkClick }: NavDesktopLinksProps) {
    return (
        <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => onLinkClick(link.href)}
                    className={`
                        px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
                        ${activeLink === link.href
                            ? "text-primary bg-primary/10"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }
                    `}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}