'use client';

import { Button } from '@/components/ui/button';
import Pop from '@/components/ui/common/pop';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const benefits = [
    'Strong conceptual clarity in mathematics',
    'Confidence to tackle any exam question',
    'Improved problem-solving speed and accuracy',
    'Excellent board exam and entrance results',
    'Lifelong analytical thinking skills',
    'A supportive learning community',
];

export default function StudentBenefits() {

    const [enquiryOpen, setEnquiryOpen] = useState(false);

    return (
        <section className="w-full py-24 bg-white overflow-hidden">
            <div className="max-w-7xl max-lg:px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left */}
                    <div className="flex-1 w-full">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                            Student Benefits
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-5 tracking-tight">
                            What Students{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-primary">Gain</span>
                                <svg
                                    className="absolute -bottom-1 left-0 w-full"
                                    viewBox="0 0 100 8"
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 6 Q50 0 100 6"
                                        stroke="#2d9cdb"
                                        strokeWidth="2.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        opacity="0.35"
                                    />
                                </svg>
                            </span>
                        </h2>

                        <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-md">
                            Our students don&apos;t just learn formulas — they develop the
                            mindset to excel in exams and beyond.
                        </p>

                        <ul className="flex flex-col gap-3.5">
                            {benefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-center gap-3.5 group"
                                >
                                    <div className="w-6 h-6 shrink-0 rounded-full bg-[#e8f4fc] flex items-center justify-center group-hover:bg-[#2d9cdb] transition-colors duration-200">
                                        <CheckCircle2
                                            size={14}
                                            className="text-[#2d9cdb] group-hover:text-white transition-colors duration-200"
                                            strokeWidth={2.5}
                                        />
                                    </div>
                                    <span className="text-gray-700 text-[14.5px] font-medium group-hover:text-gray-900 transition-colors duration-200">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — Stat Card */}
                    <div className="w-full lg:w-105 shrink-0">
                        <div
                            className="relative rounded-3xl overflow-hidden p-10 flex flex-col items-center text-center gap-5"
                            style={{
                                background: 'linear-gradient(145deg, #e8f4fc 0%, #dbeeff 100%)',
                                boxShadow:
                                    '0 20px 60px rgba(45,156,219,0.15), 0 4px 16px rgba(45,156,219,0.08)',
                            }}
                        >
                            {/* Decorative blobs */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#2d9cdb]/10 pointer-events-none" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#2d9cdb]/10 pointer-events-none" />

                            {/* Big number */}
                            <span
                                className="relative text-primary text-7xl font-black leading-none tracking-tight"
                              
                            >
                                95%
                            </span>

                            <div className="relative flex flex-col gap-2">
                                <p className="text-gray-900 font-bold text-xl tracking-tight">
                                    Success Rate
                                </p>
                                <p className="text-gray-500 text-[13.5px] leading-relaxed max-w-60 mx-auto">
                                    of our students score above 90% in board exams and clear
                                    competitive entrances.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-16 h-px bg-[#2d9cdb]/25" />

                            <Button
                                className="relative w-full max-w-65 py-6 rounded-2xl text-white font-bold text-[14px] tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"

                                onClick={() => setEnquiryOpen(true)}

                            >
                                Start Your Journey →
                            </Button>
                        </div>
                    </div>

                </div>
                <Pop open={enquiryOpen} onOpenChange={setEnquiryOpen} />

            </div>
        </section>
    );
}