'use client'

import { GraduationCap } from "lucide-react"

export default function LeftPanel() {
    return (
        <div className="hidden md:flex flex-col w-1/2 p-6 relative overflow-hidden bg-linear-to-br from-[#0f172a] via-[#0f2744] to-[#0c3a5e]">

            {/* ── Top accent line ── */}
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#0891b2] via-[#06b6d4] to-[#22d3ee]" />

            {/* ── Decorative Patterns ── */}
            <GeoPatterns />

            {/* ── Content ── */}
            <LeftLogo />
            <LeftHeadline />
            <LeftStats />
        </div>
    )
}

/* ── Decorative background patterns ── */
function GeoPatterns() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* Diagonal stripes */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, rgba(8,145,178,0.06) 0px, rgba(8,145,178,0.06) 1px, transparent 1px, transparent 18px)"
                }} />

            {/* Dot grid */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.18) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                }} />

            {/* Floating orbs */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#0891b2] blur-2xl opacity-[0.18] animate-[floatOrb_8s_ease-in-out_infinite_alternate]" />
            <div className="absolute bottom-16 -left-10 w-40 h-40 rounded-full bg-[#06b6d4] blur-2xl opacity-[0.18] animate-[floatOrb_8s_ease-in-out_infinite_alternate] [animation-delay:-3s]" />
            <div className="absolute top-[45%] left-[30%] w-24 h-24 rounded-full bg-[#38bdf8] blur-2xl opacity-[0.18] animate-[floatOrb_8s_ease-in-out_infinite_alternate] [animation-delay:-5s]" />

            {/* Concentric rings - top right */}
            <div className="absolute -top-20 -right-20 w-65 h-65 rounded-full border border-[rgba(56,189,248,0.15)]" />
            <div className="absolute -top-12.5 -right-12.5 w-50 h-50 rounded-full border border-[rgba(56,189,248,0.15)]" />
            <div className="absolute -top-5 -right-5 w-35 h-35 rounded-full border border-[rgba(56,189,248,0.15)]" />

            {/* Bottom-right corner triangles */}
            <svg className="absolute bottom-0 right-0 w-44 h-44 opacity-[0.06]" viewBox="0 0 180 180" fill="none">
                <polygon points="180,0 180,180 0,180" fill="rgba(56,189,248,0.5)" />
                <polygon points="180,40 180,180 40,180" fill="rgba(56,189,248,0.4)" />
                <polygon points="180,90 180,180 90,180" fill="rgba(56,189,248,0.3)" />
            </svg>

            {/* Circuit-like SVG line */}
            <svg className="absolute top-[35%] left-0 w-full h-[30%] opacity-[0.07]" viewBox="0 0 300 120">
                <path d="M0,60 L40,60 L60,30 L100,30 L120,60 L180,60 L200,90 L240,90 L260,60 L300,60"
                    stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                <circle cx="40" cy="60" r="3" fill="#38bdf8" />
                <circle cx="120" cy="60" r="3" fill="#38bdf8" />
                <circle cx="200" cy="90" r="3" fill="#38bdf8" />
                <circle cx="260" cy="60" r="3" fill="#38bdf8" />
            </svg>
        </div>
    )
}

function LeftLogo() {
    return (
        <div className="relative flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-[#0891b2] to-[#06b6d4] shadow-[0_4px_14px_rgba(8,145,178,0.35)]">
                <GraduationCap size={18} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
                <p className="text-white font-semibold text-sm leading-none">vikas Bhatt</p>
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5 text-[#38bdf8]">Classes</p>
            </div>
        </div>
    )
}

function LeftHeadline() {
    return (
        <div className="relative my-auto py-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-5 bg-[rgba(8,145,178,0.15)] border border-[rgba(8,145,178,0.3)] text-[#38bdf8]">
                <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#38bdf8]" />
                Student Portal
            </div>
            <h1 className="text-white font-semibold leading-tight tracking-tight mb-4 text-[28px]">
                Begin Your<br />
                <span className="text-[#38bdf8]">Learning Journey</span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-400 max-w-55">
                Access structured courses, live sessions, and performance tracking — all in one place.
            </p>
        </div>
    )
}

function LeftStats() {
    const stats = [["2,400+", "Students"], ["120+", "Courses"], ["98%", "Results"]] as const
    return (
        <div className="relative space-y-3">
            <div className="grid grid-cols-3 gap-2">
                {stats.map(([v, l]) => (
                    <div key={l} className="rounded-xl py-3 text-center bg-white/4 border border-white/[0.07]">
                        <p className="text-white font-semibold text-sm leading-none">{v}</p>
                        <p className="text-[10px] mt-1 text-slate-500">{l}</p>
                    </div>
                ))}
            </div>
            <div className="rounded-xl p-3.5 bg-white/4 border border-white/[0.07]">
                <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#fbbf24">
                            <path d="M5 1l1.2 2.5L9 4l-2 1.9.5 2.6L5 7.3 2.5 8.5 3 5.9 1 4l2.8-.5z" />
                        </svg>
                    ))}
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                    "The structured curriculum and live sessions made all the difference."
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white bg-linear-to-br from-[#0891b2] to-[#06b6d4]">
                        P
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500">Priya S., IIT Aspirant</p>
                </div>
            </div>
        </div>
    )
}