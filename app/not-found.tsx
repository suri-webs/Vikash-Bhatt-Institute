"use client";

import Link from "next/link";
import { House, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/home/navbar";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">

                {/* 404 Display */}
                <div className="flex items-center justify-center gap-3 mb-8 select-none">
                    <span className="text-[96px] sm:text-[120px] font-bold text-gray-900 leading-none">
                        4
                    </span>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                        {/* Ping ring */}
                        <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-20 animate-ping" />
                        {/* Solid circle */}
                        <div className="absolute inset-0 rounded-full bg-cyan-500 flex items-center justify-center">
                            <span className="text-white text-[48px] sm:text-[60px] font-bold leading-none">
                                0
                            </span>
                        </div>
                    </div>
                    <span className="text-[96px] sm:text-[120px] font-bold text-gray-900 leading-none">
                        4
                    </span>
                </div>

                {/* Text */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Page Not Found
                </h1>
                <p className="text-gray-500 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Link href="/">
                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 rounded-lg gap-2">
                            <House size={15} />
                            Go to Home
                        </Button>
                    </Link>
                    <Link href="/courses">
                        <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50 font-medium px-6 rounded-lg gap-2">
                            <ArrowLeft size={15} />
                            Browse Courses
                        </Button>
                    </Link>
                </div>

                {/* Subtle decoration */}
                <div className="mt-16 flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-8 h-px bg-gray-200" />
                    <span>Vikas Bhatt Classes</span>
                    <div className="w-8 h-px bg-gray-200" />
                </div>
            </div>
        </div>
    );
}