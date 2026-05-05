"use client";
import { useRouter } from "next/navigation";
import { BookOpen, TrendingUp, BarChart3, FileText, Star, ExternalLink, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Result {
    rollNumber: string;
    subject: string;
    month: string;
    url: string;
    week: string;
    _id: string;
}

const SUBJECT_CONFIG: Record<string, {
    color: string;
    bg: string;
    light: string;
    border: string;
    initial: string;
}> = {
    English: { color: "#3b82f6", bg: "#eff6ff", light: "#dbeafe", border: "#bfdbfe", initial: "E" },
    Mathematics: { color: "#7c3aed", bg: "#f5f3ff", light: "#ede9fe", border: "#c4b5fd", initial: "M" },
    Science: { color: "#059669", bg: "#ecfdf5", light: "#d1fae5", border: "#a7f3d0", initial: "S" },
    Hindi: { color: "#ea580c", bg: "#fff7ed", light: "#fed7aa", border: "#fdba74", initial: "H" },
    Computer: { color: "#0284c7", bg: "#f0f9ff", light: "#bae6fd", border: "#7dd3fc", initial: "C" },
    SST: { color: "#9333ea", bg: "#faf5ff", light: "#e9d5ff", border: "#d8b4fe", initial: "S" },
    Sanskrit: { color: "#be185d", bg: "#fdf2f8", light: "#fbcfe8", border: "#f9a8d4", initial: "S" },
};

function getSubjectConfig(subject: string) {
    const key = Object.keys(SUBJECT_CONFIG).find((k) =>
        subject.toLowerCase().includes(k.toLowerCase())
    );
    return SUBJECT_CONFIG[key ?? ""] ?? {
        color: "#6b7280", bg: "#f9fafb", light: "#f3f4f6", border: "#e5e7eb", initial: subject.charAt(0),
    };
}

function getWeekPercent(week: string) {
    const num = parseInt(week.replace(/\D/g, ""), 10) || 1;
    return Math.min(num * 25, 100);
}

function SubjectResultCard({ result }: { result: Result }) {
    const cfg = getSubjectConfig(result.subject);
    const pct = getWeekPercent(result.week);

    return (
        <div
            className="relative flex flex-col rounded-2xl overflow-hidden border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: cfg.border }}
        >

            <div className="px-4 pt-3.5 pb-4 flex flex-col gap-3">
                {/* Header row */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                            style={{ background: cfg.color }}
                        >
                            {result.subject.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{result.subject}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{result.month}</p>
                        </div>
                    </div>
                    <div
                        className="w-[26px] h-[26px] rounded-full border flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: cfg.border }}
                    >
                        <Star size={11} style={{ color: cfg.color }} fill={cfg.color} />
                    </div>
                </div>

                {/* Week bar */}
                <div>
                    <p
                        className="text-[9px] font-semibold uppercase tracking-widest mb-1.5"
                        style={{ color: cfg.color, fontFamily: "monospace", opacity: 0.8 }}
                    >
                        {result.week}
                    </p>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: cfg.light }}>
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, background: cfg.color }}
                        />
                    </div>
                </div>

                {/* View button */}
                <Link
                    href={`/resultDisplay?id=${encodeURIComponent(result._id)}`}
                    className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-[10px] border transition-all hover:opacity-90 active:scale-95"
                    style={{ borderColor: cfg.border, color: cfg.color, background: "transparent" }}
                >
                    <ExternalLink size={11} />
                    View result
                </Link>
            </div>
        </div>
    );
}

function MonthlySummary({ results }: { results: Result[] }) {
    const subjects = results.length;
    const weeks = [...new Set(results.map((r) => r.week))];

    return (
        <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 mb-3">
            <div className="w-10 h-10 rounded-[10px] bg-gray-900 flex items-center justify-center flex-shrink-0">
                <Monitor size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">Monthly Overview</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                    {subjects} subject{subjects !== 1 ? "s" : ""} · {weeks.length} week{weeks.length !== 1 ? "s" : ""} of tests
                </p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <TrendingUp size={11} />
                    <span className="text-[11px] font-semibold">Active</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{subjects} papers</span>
            </div>
        </div>
    );
}

export default function ResultCard({ month, results }: { month: string | null; results: Result[] }) {
    if (!month) return null;

    return (
        <div className="mt-5">
            <Card className="shadow-sm border-gray-100 py-0 overflow-hidden">
                {/* Card header */}
                <CardHeader className="px-5 py-4 border-b border-gray-100 bg-white space-y-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold text-gray-900 tracking-tight">{month}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {results.length > 0
                                    ? `${results.length} subject${results.length > 1 ? "s" : ""} tested`
                                    : "No results uploaded yet"}
                            </p>
                        </div>

                        {/* Avatar stack */}
                        {results.length > 0 && (
                            <div className="flex">
                                {results.slice(0, 3).map((r, i) => {
                                    const cfg = getSubjectConfig(r.subject);
                                    return (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white -ml-1.5 first:ml-0"
                                            style={{ background: cfg.color }}
                                        >
                                            {r.subject.charAt(0)}
                                        </div>
                                    );
                                })}
                                {results.length > 3 && (
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 -ml-1.5">
                                        +{results.length - 3}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-4 bg-gray-50/50">
                    {results.length > 0 ? (
                        <div className="flex flex-col gap-0">
                            <MonthlySummary results={results} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {results.map((r, i) => (
                                    <SubjectResultCard key={i} result={r} />
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-1.5 pt-3 text-[11px] text-gray-400">
                                <FileText size={11} />
                                Click <span className="font-semibold text-gray-500 mx-0.5">View result</span> to open your test report
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-12 px-6 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4">
                                <BookOpen size={24} className="text-gray-300" />
                            </div>
                            <p className="text-sm font-semibold text-gray-500">No results for {month}</p>
                            <p className="text-xs text-gray-400 mt-1.5 max-w-[200px]">
                                Results will appear once your teacher uploads the test papers.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}