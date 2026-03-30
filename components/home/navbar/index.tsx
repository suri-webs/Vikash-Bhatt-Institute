"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Pop from "@/components/ui/common/pop";
import { navLinks } from "@/components/utils/Navlinks";
import { NavLogo } from "./Navlogo";
import { NavDesktopLinks } from "./Navdesktoplinks";
import { NavDesktopActions } from "./Navdesktopactions";
import { NavMobileDrawer } from "./Navmobiledrawer";
import { LogoutDialog } from "./Logoutdialog";
import { SearchBar } from "./Searchbar";


export default function Navbar() {
    const pathname = usePathname();
    const { isLoggedIn, user, logout } = useAuth();

    const [activeLink, setActiveLink] = useState("/");
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (pathname === "/about") {
            setActiveLink("/about");
        } else if (pathname === "/") {
            setActiveLink("/");
        }
    }, [pathname]);

    useEffect(() => {
        if (pathname !== "/") return;

        const sectionIds = navLinks
            .filter((l) => l.sectionId)
            .map((l) => l.sectionId as string);

        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveLink(`/#${id}`);
                },
                { threshold: 0.4 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        const handleScroll = () => {
            if (window.scrollY < 100) setActiveLink("/");
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            observers.forEach((o) => o.disconnect());
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    return (
        <>
            <nav className={`w-full max-sm:px-4 top-0 z-50 bg-white shadow rounded-b-2xl border-gray-200 transition-all duration-300 ${scrolled ? "sticky" : "absolute"}`}>
                <div className="max-w-7xl mx-auto max-md:px-4">
                    <div className="h-19 flex items-center justify-between">

                        <NavLogo onClick={() => setActiveLink("/")} />

                        {/* Search bar — hidden on max-sm, visible sm and above */}
                        <SearchBar placeholder="Search courses, subjects..." />

                        <div className="flex gap-3">
                            <NavDesktopLinks
                                activeLink={activeLink}
                                onLinkClick={setActiveLink}
                            />

                            <NavDesktopActions
                                isLoggedIn={isLoggedIn}
                                user={user}
                                onEnquiryOpen={() => setEnquiryOpen(true)}
                                onLogoutOpen={() => setLogoutOpen(true)}
                            />
                        </div>

                        <NavMobileDrawer
                            isLoggedIn={isLoggedIn}
                            user={user}
                            activeLink={activeLink}
                            onLinkClick={setActiveLink}
                            onEnquiryOpen={() => setEnquiryOpen(true)}
                            onLogoutOpen={() => setLogoutOpen(true)}
                        />

                    </div>
                </div>
            </nav>

            <Pop open={enquiryOpen} onOpenChange={setEnquiryOpen} />

            <LogoutDialog
                open={logoutOpen}
                onOpenChange={setLogoutOpen}
                onConfirm={logout}
            />
        </>
    );
}