"use client";

import { motion } from "framer-motion";
import {
    Calculator,
    Sigma,
    TrendingUp,
    Brain,
    BarChart2,
    GraduationCap,
    BookOpen,
    Award,
    Shield,
    Star,
    Sprout,
    School,
    Target,
    Crown,
    Landmark
} from "lucide-react";

const courses = [
    {
        id: "foundation",
        icon: Sprout,
        title: "Foundation",
        subtitle: "Class 1–5: Building Basics",
        description: "Strong foundation in Maths, English, Hindi, and EVS with activity-based and concept-clear methods.",
        subjects: "Maths • English • Hindi • EVS"
    },
    {
        id: "middle-school",
        icon: BookOpen,
        title: "Middle School",
        subtitle: "Class 6–8: Core Concepts",
        description: "In-depth coverage of all NCERT subjects — Maths, Science, Social Science, English, and Hindi.",
        subjects: "Maths • Science • SST • English"
    },
    {
        id: "secondary",
        icon: School,
        title: "Secondary",
        subtitle: "Class 9–10: Board Prep",
        description: "Complete board preparation with practice tests, PYQ analysis, and exam-ready strategies for all subjects.",
        subjects: "All Subjects • Board Focus"
    },
    {
        id: "senior-science",
        icon: Sigma,
        title: "Senior Secondary – Science",
        subtitle: "Class 11–12: PCM / PCB",
        description: "Advanced Physics, Chemistry, Maths, and Biology with conceptual depth and numerical practice for boards + entrances.",
        subjects: "Physics • Chemistry • Maths • Bio"
    },
    {
        id: "senior-commerce",
        icon: Landmark,
        title: "Senior Secondary – Commerce",
        subtitle: "Class 11–12: Commerce Stream",
        description: "Accountancy, Business Studies, Economics, and Maths taught with practical examples and board-focused preparation.",
        subjects: "Accounts • BSt • Eco • Maths"
    },
    {
        id: "jee-neet",
        icon: Target,
        title: "Competitive Exams",
        subtitle: "JEE & NEET Preparation",
        description: "Intensive problem-solving, mock tests, and concept revision for IIT-JEE (Mains & Advanced) and NEET aspirants.",
        subjects: "Physics • Chemistry • Maths/Bio"
    },
    {
        id: "nda-cds",
        icon: Shield,
        title: "Competitive Exams",
        subtitle: "NDA / CDS / Defence",
        description: "Maths, English, and GK preparation for defence service entrance examinations with structured practice tests.",
        subjects: "Maths • English • GK"
    },
    {
        id: "bcom",
        icon: GraduationCap,
        title: "Graduation",
        subtitle: "B.Com Subjects",
        description: "Business Mathematics, Accountancy, Business Law, Statistics, and Economics for B.Com students across all years.",
        subjects: "Maths • Accounts • Law • Stats"
    },
    {
        id: "olympiad",
        icon: Crown,
        title: "Special",
        subtitle: "Olympiad & Talent Training",
        description: "Advanced training for Math, Science, and English Olympiads — challenge yourself beyond the classroom curriculum.",
        subjects: "Maths • Science • English"
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CoursesSection() {
    return (
        <section id="courses" className="w-full py-24  relative overflow-hidden">
            <div className=" max-w-7xl max-lg:px-4 mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        OUR COURSES
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
                        Programs Designed for Every Level
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        From school foundation to competitive exams and graduation — structured courses for every stage of your academic journey.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {courses.map(({ id, icon: Icon, title, subtitle, description, subjects }) => (
                        <motion.div
                            key={id}
                            variants={cardVariants}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Lucide Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center mb-6 group-hover:from-emerald-100 group-hover:to-blue-100 transition-all duration-300 shadow-sm">
                                <Icon className="w-7 h-7 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                                {title}
                            </h3>
                            <h4 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                                {subtitle}
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                {description}
                            </p>
                            <p className="text-xs font-mono text-cyan-600 font-semibold tracking-wider uppercase border-t border-cyan-100 pt-3">
                                {subjects} →
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
