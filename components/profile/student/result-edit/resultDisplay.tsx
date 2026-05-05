"use client";
import { Results, useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Trophy, BookOpen, Hash, User, Calendar, Target, Percent, CheckCircle2, XCircle } from "lucide-react";

export function ResultDisplay() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const { result, user } = useAuth();

    const [resultinfo, setResultInfo] = useState<Results>();
    useEffect(() => {
        const currentResult = result?.find((r) => r._id === id);
        setResultInfo(currentResult);
    }, [result, id]);

    const percentage = resultinfo?.marksScored && resultinfo?.totalMarks
        ? Math.round((resultinfo.marksScored / resultinfo.totalMarks) * 100)
        : 0;

    const isPass = percentage > 40;

    console.log(user?.avatar);
    

    const fields = [
        { icon: User, label: "Name", value: user?.username ?? "" },
        { icon: Hash, label: "Roll No.", value: user?.rollNumber?.toString() ?? "" },
        { icon: BookOpen, label: "Class", value: user?.classIn ?? "" },
        { icon: BookOpen, label: "Subject", value: resultinfo?.subject ?? "" },
        { icon: Calendar, label: "Test Taken", value: `Week ${resultinfo?.week ?? "—"} · ${resultinfo?.month ?? ""}` },
        { icon: Target, label: "Score", value: `${resultinfo?.marksScored ?? 0} / ${resultinfo?.totalMarks ?? 0}` },
        { icon: Percent, label: "Percentage", value: `${percentage}%` },
    ];

    // Circular progress math
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDash = (percentage / 100) * circumference;

    return (
        <section className="h-full pt-32 w-full flex items-start justify-center bg-[#f0f4f8] py-10 px-4">
            <div className="w-full max-w-xl flex flex-col gap-4">

                {/* ── Header ─────────────────────────────── */}
                <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-3.5 border border-slate-200 shadow-sm">
                    <div>
                        <p className="text-sm font-bold text-slate-800 tracking-tight">
                            {resultinfo?.month ?? "Result"}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">1 subject tested</p>
                    </div>
                    {user?.avatar ? (
                        <Image className="rounded-full object-cover ring-2 ring-blue-100" src={user.avatar} height={38} width={38} alt="avatar" />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-200">
                            {user?.username?.[0]?.toUpperCase() ?? "U"}
                        </div>
                    )}
                </div>

                {/* ── Score Hero ─────────────────────────── */}
                <div className={`relative rounded-2xl px-6 py-6 overflow-hidden border ${isPass ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' : 'bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200'}`}>
                    {/* Background circle decoration */}
                    <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10 ${isPass ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <div className={`absolute -right-4 -bottom-8 w-32 h-32 rounded-full opacity-10 ${isPass ? 'bg-teal-400' : 'bg-orange-400'}`} />

                    <div className="flex items-center gap-5 relative z-10">
                        {/* Circular progress */}
                        <div className="relative w-[100px] h-[100px] flex-shrink-0">
                            <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                                <circle cx="50" cy="50" r={radius} fill="none" stroke={isPass ? '#d1fae5' : '#fee2e2'} strokeWidth="10" />
                                <circle
                                    cx="50" cy="50" r={radius} fill="none"
                                    stroke={isPass ? '#10b981' : '#ef4444'}
                                    strokeWidth="10"
                                    strokeDasharray={`${strokeDash} ${circumference}`}
                                    strokeLinecap="round"
                                    style={{ transition: 'stroke-dasharray 1s ease' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-xl font-black ${isPass ? 'text-emerald-700' : 'text-rose-600'}`}>{percentage}%</span>
                            </div>
                        </div>

                        {/* Score info */}
                        <div className="flex flex-col gap-1">
                            <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${isPass ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {isPass ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                                {isPass ? 'Passed' : 'Failed'}
                            </div>
                            <p className="text-2xl font-black text-slate-800 leading-tight">
                                {resultinfo?.marksScored ?? 0}
                                <span className="text-base font-semibold text-slate-400"> / {resultinfo?.totalMarks ?? 0}</span>
                            </p>
                            <p className="text-xs text-slate-500 capitalize font-medium">
                                {resultinfo?.subject ?? "Subject"} · Week {resultinfo?.week ?? "—"}
                            </p>
                            <div className="mt-1 flex items-center gap-1">
                                <Trophy size={11} className={isPass ? 'text-amber-400' : 'text-slate-300'} />
                                <span className="text-[11px] text-slate-400">{resultinfo?.month}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Info Grid ──────────────────────────── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Student Details</p>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-slate-100">
                        {fields.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-white px-4 py-3 flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                    <Icon size={11} className="text-slate-400" />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-700 truncate">
                                    {value || <span className="text-slate-300 font-normal">—</span>}
                                </p>
                            </div>
                        ))}

                        {/* Verdict cell */}
                        <div className="bg-white px-4 py-3 flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <Target size={11} className="text-slate-400" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Verdict</span>
                            </div>
                            <span className={`text-sm font-bold ${isPass ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {isPass ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Download Button ────────────────────── */}
                <Link
                    href={resultinfo?.url || "#"}
                    download={`${resultinfo?.subject}_${resultinfo?.week}.pdf`}
                    className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20"
                >
                    <Download size={15} />
                    Download PDF Report
                </Link>

                <p className="text-center text-[11px] text-slate-400">
                    Your result PDF will download automatically
                </p>
            </div>
        </section>
    );
}