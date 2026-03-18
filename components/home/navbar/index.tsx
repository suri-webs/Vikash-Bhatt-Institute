"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Home, Info, BookOpen, Star, MessageSquare, Phone, ChevronRight, GraduationCap } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Pop from "@/components/ui/common/pop";

const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Info },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Why Us", href: "/why-us", icon: Star },
    { label: "Testimonials", href: "/testimonials", icon: MessageSquare },
    { label: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("/");
    const [enquiryOpen, setEnquiryOpen] = useState(false);

    return (
        <>
            <nav className="w-full max-sm:px-4 absolute top-0 z-50 bg-white shadow rounded-b-2xl border-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="h-19 flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                                <GraduationCap size={16} className="text-white" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-gray-900 font-bold text-sm tracking-tight">
                                    Vikash Bhatt
                                </span>
                                <span className="text-cyan-500 font-medium text-[10px] tracking-widest uppercase">
                                    Classes
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setActiveLink(link.href)}
                                    className={`
                                        px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
                                        ${activeLink === link.href
                                            ? "text-cyan-600 bg-cyan-50"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-2">
                            <Button
                                size="sm"
                                onClick={() => setEnquiryOpen(true)}
                                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 rounded-lg py-5"
                            >
                                Get Started
                            </Button>
                        </div>

                        {/* Mobile Hamburger */}
                        <div className="flex md:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <Menu size={20} />
                                </SheetTrigger>

                                <SheetContent side="left" className="w-full p-0 flex flex-col">

                                    {/* Drawer Header */}
                                    <div className="px-5 pt-6 pb-5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                                                <GraduationCap size={16} className="text-white" />
                                            </div>
                                            <div className="flex flex-col leading-none">
                                                <span className="text-gray-900 font-bold text-sm">
                                                    Vikash Bhatt
                                                </span>
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
                                                        onClick={() => setActiveLink(link.href)}
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

                                    {/* Drawer Footer — Get Started opens Pop */}
                                    <div className="px-4 absolute bottom-3 right-0 py-4 space-y-2">
                                        <SheetClose >
                                            <Button
                                                onClick={() => setEnquiryOpen(true)}
                                                className="bg-cyan-500 hover:bg-cyan-600 transition-colors px-5 py-5 rounded-md text-white text-sm font-medium"
                                            >
                                                Get Started
                                            </Button>
                                        </SheetClose>
                                    </div>

                                </SheetContent>
                            </Sheet>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Enquiry Popup */}
            <Pop open={enquiryOpen} onOpenChange={setEnquiryOpen} />
        </>
    );
}