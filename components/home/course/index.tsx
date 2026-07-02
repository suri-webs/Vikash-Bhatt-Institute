"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Sprout,
    School,
    Sigma,
    Landmark,
    Target,
    GraduationCap,
    Clock,
    ArrowRight
} from "lucide-react";

interface Course {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    subjects: string[];
    level: string;
    duration: string;
    image: string;
    link: string;
}

interface Category {
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    courses: Course[];
}

const categories: Category[] = [
    {
        id: "school-foundation",
        name: "School Foundation",
        icon: Sprout,
        courses: [
            {
                id: "foundation",
                title: "Foundation Course",
                subtitle: "Class 1–5: Building Basics",
                description: "Strong foundation in Maths, English, Hindi, and EVS with activity-based and concept-clear methods.",
                subjects: ["Maths", "English", "Hindi", "EVS"],
                level: "Junior",
                duration: "Full Session",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
                link: "/courses/foundation"
            },
            {
                id: "middle-school",
                title: "Middle School Program",
                subtitle: "Class 6–8: Core Concepts",
                description: "In-depth coverage of all NCERT subjects — Maths, Science, Social Science, English, and Hindi.",
                subjects: ["Maths", "Science", "SST", "English"],
                level: "Middle",
                duration: "Full Session",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
                link: "/courses/middle-school"
            }
        ]
    },
    {
        id: "high-school",
        name: "High School & Boards",
        icon: School,
        courses: [
            {
                id: "secondary",
                title: "Secondary Board Prep",
                subtitle: "Class 9–10: Board Prep",
                description: "Complete board preparation with practice tests, PYQ analysis, and exam-ready strategies for all subjects.",
                subjects: ["All Subjects", "Board Focus", "PYQ Prep"],
                level: "Board Prep",
                duration: "10 Months",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
                link: "/courses/secondary"
            }
        ]
    },
    {
        id: "senior-secondary-science",
        name: "Senior Sec (Science)",
        icon: Sigma,
        courses: [
            {
                id: "senior-science",
                title: "Senior Sec – Science",
                subtitle: "Class 11–12: PCM / PCB",
                description: "Advanced Physics, Chemistry, Maths, and Biology with conceptual depth and numerical practice for boards + entrances.",
                subjects: ["Physics", "Chemistry", "Maths", "Biology"],
                level: "Senior",
                duration: "1 Year",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
                link: "/#courses/senior-science"
            }
        ]
    },
    {
        id: "senior-secondary-commerce",
        name: "Senior Sec (Commerce)",
        icon: Landmark,
        courses: [
            {
                id: "senior-commerce",
                title: "Senior Sec – Commerce",
                subtitle: "Class 11–12: Commerce Stream",
                description: "Accountancy, Business Studies, Economics, and Maths taught with practical examples and board-focused preparation.",
                subjects: ["Accounts", "BSt", "Economics", "Maths"],
                level: "Senior",
                duration: "1 Year",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
                link: "/courses/senior-commerce"
            }
        ]
    },
    {
        id: "competitive-exams",
        name: "Competitive Exams",
        icon: Target,
        courses: [
            {
                id: "jee-neet",
                title: "JEE & NEET Prep",
                subtitle: "Engineering & Medical Prep",
                description: "Intensive problem-solving, mock tests, and concept revision for IIT-JEE (Mains & Advanced) and NEET aspirants.",
                subjects: ["JEE Math", "NEET Bio", "Physics", "Chemistry"],
                level: "Competitive",
                duration: "1-2 Years",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
                link: "/courses/jee-neet"
            },
            {
                id: "nda-cds",
                title: "NDA / CDS / Defence",
                subtitle: "Defence Entry Exams",
                description: "Maths, English, and GK preparation for defence service entrance examinations with structured practice tests.",
                subjects: ["Maths", "English", "GK", "Defence Entry"],
                level: "Competitive",
                duration: "6 Months",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
                link: "/courses/nda-cds"
            }
        ]
    },
    {
        id: "graduation-special",
        name: "Graduation & Special",
        icon: GraduationCap,
        courses: [
            {
                id: "bcom",
                title: "B.Com Graduation",
                subtitle: "B.Com Subjects",
                description: "Business Mathematics, Accountancy, Business Law, Statistics, and Economics for B.Com students across all years.",
                subjects: ["Maths", "Accounts", "Law", "Stats"],
                level: "Graduation",
                duration: "Semester Wise",
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
                link: "/courses/bcom"
            },
            {
                id: "olympiad",
                title: "Olympiad & Talent",
                subtitle: "Special Training",
                description: "Advanced training for Math, Science, and English Olympiads — challenge yourself beyond the classroom curriculum.",
                subjects: ["Maths", "Science", "English", "Olympiad Prep"],
                level: "Specialist",
                duration: "6 Months",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
                link: "/courses/olympiad"
            }
        ]
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 16
        }
    }
};

export default function CoursesSection() {
    const [activeCategoryId, setActiveCategoryId] = useState("school-foundation");
    const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

    return (
        <section id="courses" className="w-full py-24 relative overflow-hidden bg-slate-50/50">
            <div className="max-w-7xl max-lg:px-4 mx-auto">
                {/* Main Tabbed Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Left Sidebar Categories */}
                    <div className="lg:col-span-1">
                        <div className="hidden lg:block mb-5">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                                Course Categories
                            </span>
                            <h3 className="text-xl font-bold text-slate-800 mt-1 leading-tight">
                                The best courses we offer
                            </h3>
                        </div>

                        {/* Vertical Tabs for Desktop */}
                        <div className="hidden lg:flex flex-col gap-3">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategoryId === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategoryId(category.id)}
                                        className={`flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-300 border ${isActive
                                            ? "bg-primary border-primary text-white shadow-md shadow-primary/10 font-semibold"
                                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-medium hover:text-slate-950"
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? "text-white scale-110" : "text-primary"}`} />
                                        <span className="text-sm truncate">{category.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Horizontal Scrollable Tabs for Mobile & Tablet */}
                        <div
                            className="lg:hidden w-full overflow-x-auto flex gap-3 pb-4 scrollbar-none snap-x -mx-4 px-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategoryId === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategoryId(category.id)}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shrink-0 snap-start transition-all duration-300 border ${isActive
                                            ? "bg-primary border-primary text-white shadow-sm"
                                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-primary"}`} />
                                        <span>{category.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 max-lg:mt-4">
                            <h4 className="text-2xl font-bold text-slate-800 tracking-tight">
                                {activeCategory.name}
                            </h4>
                            <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
                        </div>

                        <motion.div
                            key={activeCategoryId}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {activeCategory.courses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    variants={cardVariants}
                                    className="group flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Course Image & Badge */}
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={course.image}
                                            alt={course.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            priority={false}
                                        />
                                        {/* Badge Overlay */}
                                        <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-white/10">
                                            {course.level}
                                        </div>
                                    </div>

                                    {/* Course Info */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h5 className="text-lg font-bold text-slate-800 mb-1 leading-snug group-hover:text-primary transition-colors duration-300">
                                                {course.title}
                                            </h5>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                                {course.subtitle}
                                            </p>
                                            <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-3">
                                                {course.description}
                                            </p>

                                            {/* Subjects/Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {course.subjects.map((sub, i) => (
                                                    <span
                                                        key={i}
                                                        className="border border-primary/15 bg-primary/5 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                                                    >
                                                        {sub}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            {/* Duration info */}
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-4">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{course.duration}</span>
                                            </div>

                                            {/* Explore button */}
                                            <Link href={course.link} className="w-full block">
                                                <span className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
                                                    Explore
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
