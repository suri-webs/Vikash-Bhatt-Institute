'use client';

import { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { testimonials } from '@/components/utils/testimonials';


export default function Testimonials() {
    // ← Store swiper instance directly via onSwiper callback
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="w-full overflow-hidden">
            <div className=" max-w-7xl max-lg:px-4 mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">

                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        Student Testimonials
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        What Our Students Say
                    </h2>
                    <p className="text-gray-500 text-[14.5px] mt-2 max-w-md leading-relaxed font-normal">
                        Real results from real students — hear their stories of transformation.
                    </p>
                </div>

                {/* Swiper — onSwiper saves instance to ref */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    loop
                    centeredSlides
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    breakpoints={{
                        640: { slidesPerView: 1.3 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((t, key) => (
                        <SwiperSlide key={key}>
                            {({ isActive }) => (
                                <div className={`bg-white mt-2 mb-3 scale-95 rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 ${isActive ? 'scale-100  ring-2 ring-primary/10' : 'shadow-sm opacity-70'}`}>

                                    {/* Gradient image */}
                                    <div className="p-4 pb-0">
                                        <div className="relative w-full h-48 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: t.bg }}>
                                            <span className="text-4xl absolute top-10 left-5 -rotate-45 font-black text-white/25 select-none leading-none" style={{ letterSpacing: '-3px' }}>{t.score}</span>
                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                                <Quote size={13} className="text-white" />
                                            </div>
                                            <Image src={t.image} alt='' width={200} height={100} className='absolute top-4' />
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 flex flex-col gap-3 flex-1">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#2d9cdb" className="text-[#2d9cdb]" strokeWidth={0} />)}
                                        </div>
                                        <p className="text-gray-600 text-[13.5px] leading-relaxed italic flex-1 font-normal">&quot;{t.quote}&quot;</p>
                                        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0" style={{ background: t.bg }}>
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-gray-900 font-semibold text-[13.5px] leading-tight">{t.name}</p>
                                                <p className="text-gray-400 text-[11.5px] font-normal">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Controls — swiperRef.current.slidePrev/Next directly */}
                <div className="flex mx-auto w-fit items-center gap-4 mt-8">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2d9cdb] hover:text-white hover:border-[#2d9cdb] transition-all duration-200 cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2d9cdb] hover:text-white hover:border-[#2d9cdb] transition-all duration-200 cursor-pointer"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

            </div>
        </section>
    );
}