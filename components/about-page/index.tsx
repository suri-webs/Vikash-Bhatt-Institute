"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    GraduationCap,
    Trophy,
    Compass,
    Quote,
    Star,
    Sparkles,
    BookOpen,
    Users,
    CheckCircle2,
    ArrowRight,
    Target,
    Award,
    ShieldCheck,
    BookmarkCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

const timelineEvents = [
    {
        year: "2010",
        title: "The Inception",
        description: "Vikas Bhatt founded the academy with a small group of students, dedicating efforts to absolute conceptual clarity."
    },
    {
        year: "2015",
        title: "Board Exam Distinctions",
        description: "Recorded our first cohort with multiple students scoring 95%+ in board exams. Expanded teaching batches."
    },
    {
        year: "2019",
        title: "JEE & NEET Launch",
        description: "Introduced structured competitive test-prep classes for engineering and medical entrance exams under specialized mentorship."
    },
    {
        year: "2023",
        title: "5,000+ Student Milestone",
        description: "Crossed the milestone of mentoring over 5,000 students across Burari, Delhi. Launched higher-grade B.Com & Olympiad programs."
    },
    {
        year: "Present",
        title: "Modern Blended Learning",
        description: "Equipped VBC classrooms with digital assets, tracking tools, comprehensive practice modules, and standard hybrid sessions."
    }
];

const pillars = [
    {
        icon: Target,
        title: "Concept-First Teaching",
        description: "We don't encourage rote memorization. Every formula and theorem is explained from scratch with real-world application."
    },
    {
        icon: Users,
        title: "Small Batch Dynamics",
        description: "Class sizes are strictly limited to ensure that Vikas Bhatt and team can give individual attention to every learner."
    },
    {
        icon: Trophy,
        title: "Weekly Assessments",
        description: "Regular diagnostics and chapter-wise mock tests to track performance, build speed, and remove exam fear."
    },
    {
        icon: Sparkles,
        title: "Dedicated Doubt Sessions",
        description: "Open question hours where no doubt is considered too small. We stay until the student fully grasps the concept."
    }
];

export default function AboutPage() {
    return (
        <main className="w-full bg-slate-50/50 overflow-hidden">
            {/* 1. Hero Section */}
            <section className="relative pt-24 pb-20 flex flex-col items-center justify-center text-center overflow-hidden bg-white border-b border-slate-100">
                {/* Dot background layer */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,180,216,0.05) 1px, transparent 1px)",
                        backgroundSize: "24px 24px"
                    }}
                />
                
                {/* Background Glows */}
                <div className="absolute top-[-10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-50" />

                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex flex-col items-center"
                    >
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
                            ⭐ OUR LEGACY & JOURNEY
                        </span>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight max-w-4xl">
                            Empowering Minds,<br />
                            <span className="relative inline-block text-primary">
                                Shaping Bright Futures
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
                                        strokeWidth="3.5"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>
                        
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-3xl font-light mb-12">
                            Vikas Bhatt Classes (VBC) has been at the forefront of providing quality education for over a decade. From primary school fundamentals to competitive entrance exams, we build path-breaking concepts.
                        </p>

                        {/* Quick Stats Grid directly inside Hero for premium engagement */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-4">
                            {[
                                { label: "Experience", val: "21+ Years", desc: "Proven expertise" },
                                { label: "Students Taught", val: "8,500+", desc: "Across streams" },
                                { label: "Pass Rate", val: "98%", desc: "In Board Exams" },
                                { label: "Subjects Covered", val: "12+", desc: "Under one roof" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col items-center">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</span>
                                    <span className="text-2xl font-black text-primary leading-tight">{stat.val}</span>
                                    <span className="text-[10px] text-slate-400 mt-0.5">{stat.desc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Mission & Vision */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-white border border-slate-200/60 shadow-xs flex flex-col justify-between group hover:border-primary/30 transition-all duration-300"
                    >
                        {/* Blob accent */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                                <Compass className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">Mission</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-sm md:text-base">
                                To simplify complex learning methodologies and nurture students to achieve peak potential. We strive to provide a conceptual foundation that makes students analytical, confident, and prepared for board and entrance exams.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-white border border-slate-200/60 shadow-xs flex flex-col justify-between group hover:border-teal-500/30 transition-all duration-300"
                    >
                        {/* Blob accent */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 shadow-xs">
                                <Award className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase bg-teal-500/10 px-3 py-1 rounded-full">Vision</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-sm md:text-base">
                                To establish a premier educational ecosystem that promotes intellectual curiosity, academic integrity, and holistic personal growth. We envision VBC as the trusted launchpad for the future leaders and professionals of India.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* 3. Core Pillars / Philosophy */}
            <section className="py-20 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-5">
                            OUR PEDAGOGY
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            The Foundations of Our Approach
                        </h2>
                        <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed mt-3 font-light">
                            How we achieve high success rates and maintain consistent standards of mentorship year after year.
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-white rounded-3xl p-7 border border-slate-200/60 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <pillar.icon size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                                    {pillar.title}
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. Journey Timeline */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-5">
                        CHRONOLOGY
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        Our Decade-Long Journey
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line with gradient */}
                    <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[3px] bg-gradient-to-b from-primary/10 via-primary to-primary/10 transform -translate-x-1/2" />

                    <div className="space-y-12">
                        {timelineEvents.map((event, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                                    {/* Line Bullet with Glow */}
                                    <div className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-primary shadow-md transform -translate-x-1/2 z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    </div>

                                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:order-2"}`}>
                                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-300">
                                            <span className="text-xs font-extrabold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5">
                                                {event.year}
                                            </span>
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed font-light">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Founder Profile */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Photo Column - Premium offset borders */}
                        <div className="lg:col-span-5 flex justify-center relative">
                            {/* Decorative background outline frame */}
                            <div className="absolute inset-0 w-80 h-96 sm:w-96 sm:h-[450px] border-2 border-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10 pointer-events-none" />
                            <div className="absolute inset-0 w-80 h-96 sm:w-96 sm:h-[450px] bg-primary/5 rounded-3xl translate-x-2 translate-y-2 -z-10 pointer-events-none" />
                            
                            <div className="relative w-80 h-96 sm:w-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-xl bg-slate-100 border border-slate-100">
                                <Image
                                    src="/images/about/vikas-bhatt-about.webp"
                                    alt="Vikas Bhatt - Founder"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Bio Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-6">
                            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3.5 block">
                                ⭐ MEET THE FOUNDER
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Vikas Bhatt
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-light">
                                Over 10 years ago, I started teaching with a single vision: to ensure that no student gets left behind due to complex, traditional teaching methods. Physics, Accountancy, and Mathematics shouldn't just be subjects you memorize to clear exams — they should be systems of logic that empower you to understand the world.
                            </p>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-light">
                                Here at VBC, we build analytical thinking. We guide children to challenge questions, identify patterns, and find answers conceptually. The board exam distinction scores and competitive entrance clearances of our students are merely the byproduct of this pedagogy.
                            </p>

                            <div className="border-y border-slate-100 py-6 mb-8 flex gap-8 md:gap-12">
                                <div>
                                    <p className="text-3xl font-black text-primary leading-none">21+</p>
                                    <p className="text-xs text-slate-400 font-semibold uppercase mt-1.5 tracking-wider">Years Experience</p>
                                </div>
                                <div className="border-l border-slate-100 pl-8 md:pl-12">
                                    <p className="text-3xl font-black text-primary leading-none">8,500+</p>
                                    <p className="text-xs text-slate-400 font-semibold uppercase mt-1.5 tracking-wider">Students Taught</p>
                                </div>
                                <div className="border-l border-slate-100 pl-8 md:pl-12">
                                    <p className="text-3xl font-black text-primary leading-none">98%</p>
                                    <p className="text-xs text-slate-400 font-semibold uppercase mt-1.5 tracking-wider">Pass Rate</p>
                                </div>
                            </div>

                            {/* Quote Box */}
                            <div className="bg-slate-50/80 border border-slate-200/50 rounded-2xl p-6 relative">
                                <Quote className="w-10 h-10 text-primary/10 absolute top-4 left-4" />
                                <p className="text-slate-600 text-sm leading-relaxed italic pl-10 font-normal">
                                    "Education is not the learning of facts, but the training of the mind to think."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CTA Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="relative rounded-[32px] overflow-hidden bg-[#0a1120] border border-slate-800/80 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Glowing gradient orb in the background */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
                    
                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, #00b4d8 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex-1 max-w-2xl text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                            Start Your Journey with <span className="text-primary font-black">VBC</span> Today
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-light">
                            Book a conceptual diagnostic session or an enquiry consultation to identify your learning gaps and begin standard preparations.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Button
                                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-7 py-6 font-bold shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
                            >
                                <Link href="/#contact" className="flex items-center gap-2">
                                    <GraduationCap size={16} />
                                    Book Enquiry
                                    <ArrowRight size={14} className="ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
