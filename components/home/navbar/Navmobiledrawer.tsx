import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AvatarDropdown } from "@/components/ui/common/AvatarDropdown";
import { navLinks } from "@/components/utils/Navlinks";

interface User {
    id: string;
    username: string;
    gmail: string;
    role: string;
}

interface NavMobileDrawerProps {
    isLoggedIn: boolean;
    user: User | null;
    activeLink: string;
    onLinkClick: (href: string) => void;
    onEnquiryOpen: () => void;
    onLogoutOpen: () => void;
}

export function NavMobileDrawer({
    isLoggedIn,
    user,
    activeLink,
    onLinkClick,
    onEnquiryOpen,
    onLogoutOpen,
}: NavMobileDrawerProps) {
    const router = useRouter();

    return (
        <div className="flex items-center md:hidden gap-5">
            {isLoggedIn && user ? (
                <AvatarDropdown user={user} onLogout={onLogoutOpen} />
            ) : (
                <Button variant="outline" className="px-6 py-5" onClick={() => router.push("/login")}>
                    Login
                </Button>
            )}

            <Sheet>
                <SheetTrigger>
                    <span className="p-1">
                        <Menu size={20} />
                    </span>
                </SheetTrigger>

                <SheetContent side="left" className="w-full p-0 flex flex-col">

                    {/* Drawer Header */}
                    <div className="px-5 pt-6 pb-5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                                <GraduationCap size={16} className="text-white" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-gray-900 font-bold text-sm">Vikash Bhatt</span>
                                <span className="text-cyan-500 font-medium text-[10px] tracking-widest uppercase">
                                    Classes
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                            Empowering students with quality education since 2010.
                        </p>
                    </div>

                    <Separator />

                    {/* Nav Links */}
                    <div className="flex flex-col px-3 py-3 space-y-0.5">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = activeLink === link.href;
                            return (
                                <SheetClose key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={() => onLinkClick(link.href)}
                                        className={`
                                            flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                                            ${isActive
                                                ? "bg-cyan-50 text-cyan-600"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        <div className="flex gap-2 items-center">
                                            <Icon size={16} className={isActive ? "text-cyan-500" : "text-gray-400"} />
                                            <span className="flex-1">{link.label}</span>
                                        </div>
                                        {isActive && <ChevronRight size={14} className="text-cyan-400" />}
                                    </Link>
                                </SheetClose>
                            );
                        })}
                    </div>

                    <Separator />

                    {/* Drawer Footer */}
                    <div className="px-4 absolute bottom-3 right-0 py-4 space-y-2">
                        <SheetClose
                            onClick={onEnquiryOpen}
                            className="bg-cyan-500 hover:bg-cyan-600 transition-colors px-5 py-3 rounded-md text-white text-sm font-medium"
                        >
                            Get Started
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>
        </div>
    );
}