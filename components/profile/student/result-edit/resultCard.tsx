"use client";
import { useRouter } from "next/navigation";
import { BookOpen, TrendingUp, BarChart3, FileText, Star, LinkIcon } from "lucide-react";
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
    color: string; bg: string; light: string; icon: string; gradient: string;
}> = {
    English: { color: "#3b82f6", bg: "#eff6ff", light: "#dbeafe", icon: "E", gradient: "from-blue-500 to-blue-600" },
    Mathematics: { color: "#7c3aed", bg: "#f5f3ff", light: "#ede9fe", icon: "M", gradient: "from-violet-500 to-purple-600" },
    Science: { color: "#059669", bg: "#ecfdf5", light: "#d1fae5", icon: "S", gradient: "from-emerald-500 to-green-600" },
    Hindi: { color: "#ea580c", bg: "#fff7ed", light: "#fed7aa", icon: "H", gradient: "from-orange-500 to-red-500" },
    Computer: { color: "#0284c7", bg: "#f0f9ff", light: "#bae6fd", icon: "C", gradient: "from-sky-500 to-blue-500" },
    SST: { color: "#9333ea", bg: "#faf5ff", light: "#e9d5ff", icon: "S", gradient: "from-purple-500 to-violet-600" },
    Sanskrit: { color: "#be185d", bg: "#fdf2f8", light: "#fbcfe8", icon: "S", gradient: "from-pink-600 to-rose-700" },
};

function getSubjectConfig(subject: string) {
    const key = Object.keys(SUBJECT_CONFIG).find((k) =>
        subject.toLowerCase().includes(k.toLowerCase())
    );
    return SUBJECT_CONFIG[key ?? ""] ?? {
        color: "#6b7280", bg: "#f9fafb", light: "#f3f4f6", icon: subject.charAt(0), gradient: "from-gray-500 to-gray-600",
    };
}

function WeekBadge({ week }: { week: string }) {
    const num = parseInt(week.replace(/\D/g, ""), 10) || 1;
    const pct = Math.min(num * 25, 100);
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{week}</span>
            <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
function SubjectResultCard({ result }: { result: Result }) {
    const cfg = getSubjectConfig(result.subject);
    return (
        <div
            className="relative flex flex-col gap-3 rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 h-48 w-full"
            style={{ borderColor: `${cfg.color}22`, backgroundColor: cfg.bg }}
        >
            <div className={`h-1 w-full bg-linear-to-r ${cfg.gradient}`} />
            <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-linear-to-br ${cfg.gradient} shadow-sm`}>
                            {result.subject.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{result.subject}</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{result.month}</p>
                        </div>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: cfg.light }}>
                        <Star size={12} style={{ color: cfg.color }} fill={cfg.color} />
                    </div>
                </div>

                <WeekBadge week={result.week} />

                <div className="flex gap-2">
                    <Link
                        href={`/resultDisplay?id=${encodeURIComponent(result._id)}`}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: cfg.light, color: cfg.color }}
                    >
                        <LinkIcon size={11} />
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

function MonthlySummary({ results }: { results: Result[] }) {
    const subjects = results.length;
    const weeks = [...new Set(results.map((r) => r.week))];
    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200 shrink-0">
                <BarChart3 size={16} className="text-white" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">Monthly Overview</p>
                <p className="text-xs text-gray-500 mt-0.5">
                    {subjects} subject{subjects !== 1 ? "s" : ""} · {weeks.length} week{weeks.length !== 1 ? "s" : ""} of tests
                </p>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp size={12} />
                    <span className="text-xs font-bold">Active</span>
                </div>
                <span className="text-[10px] text-gray-400">{subjects} papers</span>
            </div>
        </div>
    );
}

export default function ResultCard({ month, results }: { month: string | null; results: Result[] }) {
    const router = useRouter();
    if (!month) return null;

    function handleView() {
        router.push("/resultDisplay");
    }
    return (
        <div className="mt-5">
            <Card className="shadow-sm py-0 border-gray-100 overflow-hidden">
                <CardHeader className="px-5 mt-0 py-4 bg-linear-to-r from-slate-50 via-blue-50/40 to-indigo-50/30 border-b border-gray-100 space-y-0">
                    <div className="flex items-center justify-between">
                        <div >
                            {/* ✅ use `month` not `monthResults.month` */}
                            <p className="text-base font-bold text-gray-900">{month}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {results.length > 0
                                    ? `${results.length} subject${results.length > 1 ? "s" : ""} tested`
                                    : "No results uploaded yet"}
                            </p>
                        </div>
                        {results.length > 0 && (
                            <div className="flex -space-x-1">
                                {results.slice(0, 3).map((r, i) => {
                                    const cfg = getSubjectConfig(r.subject);
                                    return (
                                        <div key={i} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white bg-linear-to-br ${cfg.gradient}`}>
                                            {r.subject.charAt(0)}
                                        </div>
                                    );
                                })}
                                {results.length > 3 && (
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500">
                                        +{results.length - 3}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-4">
                    {results.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            <MonthlySummary results={results} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {results.map((r, i) => (
                                    <SubjectResultCard key={i} result={r} />
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-1.5 py-2 text-[11px] text-gray-400">
                                <FileText size={11} />
                                Click <span onClick={handleView} className="font-semibold text-gray-500 mx-0.5 cursor-pointer">View</span> to open online
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-12 px-6 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                                <BookOpen size={24} className="text-gray-300" />
                            </div>
                            {/* ✅ use `month` not `monthResults.month` */}
                            <p className="text-sm font-semibold text-gray-500">No results for {month}</p>
                            <p className="text-xs text-gray-400 mt-1.5 max-w-55">
                                Results will appear once your teacher uploads the test papers.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}