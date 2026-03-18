'use client';

import { Lightbulb, MessageCircleQuestion, ClipboardCheck, UserRoundCheck } from 'lucide-react';

const advantages = [
    {
        Icon: Lightbulb,
        title: 'Easy Learning Methods',
        description:
            'Complex topics broken into simple, digestible steps with real-life examples.',
    },
    {
        Icon: MessageCircleQuestion,
        title: 'Doubt Support',
        description:
            'Get your doubts cleared anytime — no question is too small or too difficult.',
    },
    {
        Icon: ClipboardCheck,
        title: 'Regular Tests',
        description:
            'Weekly tests and assessments to track progress and build exam confidence.',
    },
    {
        Icon: UserRoundCheck,
        title: 'Personal Attention',
        description:
            'Small batch sizes ensure every student gets individual guidance and feedback.',
    },
];

export default function WhyChooseUs() {
    return (
        <section id="whychooseus" className="w-full py-24 ">
            <div className=" max-w-7xl max-sm:w-[95%] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-14">
               
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                        The <span className='text-primary'>Vikash Bhatt</span> Advantage
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {advantages.map(({ Icon, title, description }) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Icon circle */}
                            <div className="w-14 h-14 rounded-full bg-[#e8f4fc] flex items-center justify-center mb-6">
                                <Icon size={24} className="text-[#2d9cdb]" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-[15px] font-bold text-gray-900 mb-3">
                                {title}
                            </h3>
                            <p className="text-[13.5px] text-gray-500 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}