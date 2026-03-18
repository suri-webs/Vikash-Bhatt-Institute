"use client";

import { motion } from "framer-motion";
import {
    Calculator,
    Sigma,
    TrendingUp,
    Brain,
    BarChart2,
    GraduationCap,
} from "lucide-react";

const courses = [
    {
        icon: Calculator,
        title: "Class 1–8 Mathematics",
        description:
            "Build a rock-solid foundation with concepts in arithmetic, algebra, geometry, and data handling.",
    },
    {
        icon: Sigma,
        title: "Class 9–10 Mathematics",
        description:
            "Master board-level topics including polynomials, trigonometry, coordinate geometry, and statistics.",
    },
    {
        icon: TrendingUp,
        title: "Class 11–12 Mathematics",
        description:
            "In-depth calculus, probability, vectors, and 3D geometry with board & entrance exam focus.",
    },
    {
        icon: Brain,
        title: "IIT-JEE Preparation",
        description:
            "Advanced problem-solving techniques and topic-wise mastery for JEE Main & Advanced.",
    },
    {
        icon: BarChart2,
        title: "NDA / CDS Math",
        description:
            "Focused preparation for defense exam quantitative sections with timed practice tests.",
    },
    {
        icon: GraduationCap,
        title: "Olympiad Training",
        description:
            "Challenge yourself with creative problem-solving and advanced reasoning for math olympiads.",
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
                        Our Courses
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
                        Programs Designed for Success
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        From school level to competitive exams structured courses that
                        make mathematics simple and enjoyable.
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
                    {courses.map(({ icon: Icon, title, description }) => (
                        <motion.div
                            key={title}
                            variants={cardVariants}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors duration-300">
                                <Icon className="w-5 h-5 text-cyan-500" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-slate-900 mb-3">
                                {title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {description}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-cyan-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}