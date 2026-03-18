"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Users, TrendingUp, Award, Quote, Star } from "lucide-react";
import Image from "next/image";

const stats = [
    { value: "10+", label: "Years Teaching", icon: BookOpen },
    { value: "2000+", label: "Students Taught", icon: Users },
    { value: "95%", label: "Success Rate", icon: TrendingUp },
    { value: "150+", label: "Exam Toppers", icon: Award },
];

export default function About() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => e.isIntersecting && e.target.classList.add("opacity-100", "translate-y-0")),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} id="about" className="relative pb-5 overflow-hidden">
            <div className="relative z-10 max-w-7xl max-lg:px-4 mx-auto">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                 
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        About the Teacher
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Meet <span className="text-primary">Vikash Bhatt</span>
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed w-full sm:w-[80%] md:w-[70%] mx-auto font-light">
                        With over a decade of dedicated teaching experience, Vikash Bhutt has helped thousands of
                        students master mathematics — from foundational concepts to competitive exam preparation.
                    </p>
                </div>

                {/* ── MOBILE layout (< md) ── */}
                <div className="flex flex-col gap-4 md:hidden">

                    {/* Teacher Photo */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm h-72 w-full">
                        <Image
                            src="/teacher.jpg"
                            alt="Vikash Bhutt"
                            fill
                            className="object-cover object-top"
                        />
                    </div>

                    {/* Quote */}
                    <div className="bg-primary rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                        <Quote className="w-7 h-7 text-white/40 mb-3" />
                        <p className="text-white text-base font-medium leading-relaxed">
                            "Every student can excel in mathematics with the right guidance, practice, and belief in themselves."
                        </p>
                        <div className="flex gap-0.5 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                            ))}
                        </div>
                    </div>

                    {/* Teaching Style */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                        <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Teaching Style</p>
                        <div className="space-y-3">
                            {[
                                { label: "Clear Explanations", desc: "Concepts explained step-by-step with simple real-life examples." },
                                { label: "Regular Practice", desc: "Daily exercises to build speed, accuracy, and confidence." },
                                { label: "Personal Mentorship", desc: "Individual guidance with progress tracking and personalized strategies." },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center"
                            >
                                <stat.icon className="w-5 h-5 text-primary mb-2" />
                                <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── TABLET layout (md) ── */}
                <div className="hidden md:flex lg:hidden flex-col gap-4">

                    {/* Row 1: photo + quote side by side */}
                    <div className="grid grid-cols-2 gap-4 h-72">
                        <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm">
                            <Image src="/teacher.jpg" alt="Vikash Bhutt" fill className="object-cover object-top" />
                        </div>
                        <div className="bg-primary rounded-3xl p-7 flex flex-col justify-between shadow-sm">
                            <Quote className="w-8 h-8 text-white/40" />
                            <div>
                                <p className="text-white text-base font-medium leading-relaxed">
                                    "Every student can excel in mathematics with the right guidance, practice, and belief in themselves."
                                </p>
                                <div className="flex gap-0.5 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: teaching style + stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Teaching Style</p>
                            <div className="space-y-3">
                                {[
                                    { label: "Clear Explanations", desc: "Concepts explained step-by-step with simple real-life examples." },
                                    { label: "Regular Practice", desc: "Daily exercises to build speed, accuracy, and confidence." },
                                    { label: "Personal Mentorship", desc: "Individual guidance with progress tracking and personalized strategies." },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{item.label}</p>
                                            <p className="text-xs text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center"
                                >
                                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                                    <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── DESKTOP layout (lg+) — original bento grid ── */}
                <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4 h-140">

                    {/* Left column — 2 stacked photos */}
                    <div className="flex flex-col gap-4 row-span-2">
                        <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm flex-1">
                            <Image src="/teacher.jpg" alt="Vikash Bhutt" fill className="object-cover object-top" />
                        </div>
                        <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm flex-1">
                            <Image src="/teacher.jpg" alt="Vikash Bhutt" fill className="object-cover object-top" />
                        </div>
                    </div>

                    {/* Top center-right — Quote */}
                    <div className="col-span-2 bg-primary rounded-3xl p-7 flex flex-col justify-between shadow-sm">
                        <Quote className="w-8 h-8 text-white/40" />
                        <div>
                            <p className="text-white text-lg font-medium leading-relaxed">
                                "Every student can excel in mathematics with the right guidance, practice, and belief in themselves."
                            </p>
                            <div className="flex gap-0.5 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom center — Teaching Style */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Teaching Style</p>
                        <div className="space-y-3">
                            {[
                                { label: "Clear Explanations", desc: "Concepts explained step-by-step with simple real-life examples." },
                                { label: "Regular Practice", desc: "Daily exercises to build speed, accuracy, and confidence." },
                                { label: "Personal Mentorship", desc: "Individual guidance with progress tracking and personalized strategies." },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom right — Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center"
                            >
                                <stat.icon className="w-5 h-5 text-primary mb-2" />
                                <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}