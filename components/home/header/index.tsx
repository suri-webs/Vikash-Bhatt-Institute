"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Users,
    TrendingUp,
    ChevronRight,
    Clock,
    LayoutGrid,
} from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Pop from "@/components/ui/common/pop";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [enquiryOpen, setEnquiryOpen] = useState(false);

    return (
        <section
            id="home"
            className="relative flex overflow-hidden justify-center items-center h-192.5 max-md:h-full max-md:py-24 w-full bg-white"
        >
            <div className="relative max-lg:px-4 z-10 max-w-7xl mx-auto">
                <div className="grid max-md:mt-5 grid-cols-1 md:grid-cols-2 gap-12 h-fit items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div
                            className={cn(
                                "group w-fit rounded-full border border-cyan-200 bg-cyan-50 text-base text-cyan-900 transition-all ease-in hover:cursor-pointer hover:bg-cyan-100 mb-6"
                            )}
                        >
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-cyan-700 hover:duration-300 max-sm:text-[10px]">
                                <span className="text-sm">⭐ Trusted by 5000+ Students Across India</span>
                                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </AnimatedShinyText>
                        </div>

                        {/* Heading */}
                        <h1 className="font-extrabold text-2xl md:text-5xl lg:text-6xl leading-tight text-slate-900 mb-6 tracking-tight">
                            Learn Every Subject{" "}
                            <br className="hidden sm:block" />
                            with{" "}
                            <span className="relative inline-block text-primary">
                                Expert Guidance
                                <svg
                                    aria-hidden="true"
                                    className="absolute -bottom-1 left-0 w-full"
                                    viewBox="0 0 300 8"
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 5 Q37.5 1 75 5 Q112.5 9 150 5 Q187.5 1 225 5 Q262.5 9 300 5"
                                        stroke="#00b4d8"
                                        strokeWidth="2.5"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Body */}
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg mb-8">
                            From Class 1 to 12, JEE, NEET, B.Com & beyond — personalised
                            teaching, structured practice, and proven results across all subjects.
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-8 mb-10">
                            {[
                                { icon: Users, num: "8500+", label: "Students Taught" },
                                { icon: TrendingUp, num: "98%", label: "Pass Rate" },
                                { icon: Clock, num: "21+", label: "Years Experience" },
                                { icon: LayoutGrid, num: "12+", label: "Subjects Covered" },
                            ].map(({ icon: Icon, num, label }) => (
                                <div key={label} className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-slate-900 leading-none">
                                            {num}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium mt-0.5">
                                            {label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={() => setEnquiryOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-6 font-semibold text-white shadow-lg shadow-blue-100"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-primary px-8 py-6 font-semibold text-primary hover:bg-blue-50 transition-colors duration-200"
                            >
                                <Link
                                    href="#courses"
                                    className="inline-flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    View Courses
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Hero image */}
                    <div className="h-full  justify-center items-center max-md:h-82 max-md:rounded-2xl relative flex overflow-hidden">
                        <Image
                            src="/images/Vikas-bhatt-image.png"
                            alt="vikas Bhatt - Expert Tutor"
                            className="absolute  mx-auto  max-sm:left-0 left-40"
                            width={410}
                            height={400}
                        />
                    </div>
                </div>
                <Pop open={enquiryOpen} onOpenChange={setEnquiryOpen} />
            </div>
        </section>
    );
}