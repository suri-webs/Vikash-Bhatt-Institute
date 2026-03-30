"use client";

import { Lightbulb, MessageCircleQuestion, ClipboardCheck, UserRoundCheck, BookOpen, Calendar, BarChart3, Award, Users } from 'lucide-react';

const advantages = [
    {
        Icon: Lightbulb,
        title: 'Easy Learning Methods',
        description: 'Complex topics broken down into simple, relatable examples with real-world connections.',
    },
    {
        Icon: MessageCircleQuestion,
        title: 'Doubt Support',
        description: 'Get your questions answered anytime — no question is too small or too hard.',
    },
    {
        Icon: ClipboardCheck,
        title: 'Regular Tests',
        description: 'Weekly assessments to track progress, identify gaps, and build exam confidence.',
    },
    {
        Icon: UserRoundCheck,
        title: 'Personal Attention',
        description: 'Small batch sizes ensure every student gets individual guidance and feedback.',
    },
    {
        Icon: BookOpen,
        title: 'All Streams Covered',
        description: 'Science, Commerce, Arts — from school level to graduation, all under one roof.',
    },
    {
        Icon: Calendar,
        title: 'Flexible Batches',
        description: 'Morning, evening, and weekend batches for school students and working learners.',
    },
    {
        Icon: BarChart3,
        title: 'Exam-Focused Strategy',
        description: 'PYQ analysis, mock tests, and time management techniques tailored per exam.',
    },
    {
        Icon: Award,
        title: 'Proven Track Record',
        description: 'Hundreds of students have cracked board exams, JEE, NEET, and B.Com with distinction.',
    },
];

export default function WhyChooseUs() {
    return (
        <section id="whychooseus" className="w-full py-24 ">
            <div className=" max-w-7xl max-sm:w-[95%] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-14">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        WHY CHOOSE US
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
                        The <span className='text-primary'>VBC</span> Advantage
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed mt-4">
                        What makes learning here different — and results-driven.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {advantages.map(({ Icon, title, description }) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 group"
                        >
                            {/* Icon circle */}
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#e8f4fc] to-[#d1ecf1] flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300 shadow-sm">
                                <Icon size={28} className="text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
