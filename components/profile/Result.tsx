"use client";
import { useState } from "react";
import { Download, BookOpen, Calendar, ChevronDown, ChevronUp, AlertCircle, FileText } from "lucide-react";
import { User } from "@/hooks/useAuth";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getServerUrl } from "../utils/config";
import api from "@/lib/api";

interface Result {
    rollNumber: string;
    subject: string;
    month: string;
    url: string;
    week: string;
}

let mockResults: Result[] = [];

interface ProfileCardProps {
    user: User | null;
    displayName: string;
    role: string;
    userId: string;
    rollNumber: string | number;
    classIn: string;
}

const MONTHS = [
    { full: "January", short: "Jan" },
    { full: "February", short: "Feb" },
    { full: "March", short: "Mar" },
    { full: "April", short: "Apr" },
    { full: "May", short: "May" },
    { full: "June", short: "Jun" },
    { full: "July", short: "Jul" },
    { full: "August", short: "Aug" },
    { full: "September", short: "Sep" },
    { full: "October", short: "Oct" },
    { full: "November", short: "Nov" },
    { full: "December", short: "Dec" },
];

const SUBJECT_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
    English: { bg: "bg-primary", text: "text-white", ring: "ring-blue-100" },
    Mathematics: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200" },
    Science: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
    Physics: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200" },
    Chemistry: { bg: "bg-pink-50", text: "text-pink-700", ring: "ring-pink-200" },
    Biology: { bg: "bg-green-50", text: "text-green-700", ring: "ring-green-200" },
    History: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
    Geography: { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-200" },
    Hindi: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
    Computer: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
};

function getSubjectColor(subject: string) {
    const key = Object.keys(SUBJECT_COLORS).find(k =>
        subject.toLowerCase().includes(k.toLowerCase())
    );
    return SUBJECT_COLORS[key ?? ""] ?? {
        bg: "bg-gray-50", text: "text-gray-600", ring: "ring-gray-200",
    };
}

function weekNumber(week: string): string {
    const m = week.match(/\d+/);
    return m ? m[0] : "—";
}

export function ResultCard({ role, displayName, rollNumber }: ProfileCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function ensureLoaded() {
        if (mockResults.length) return;
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.get(
                `/results?role=${role}&username=${displayName}&rollNumber=${rollNumber}`
            );
            mockResults = data.results ?? [];
        } catch {
            setError("Could not load results. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleToggle() {
        if (!isOpen) await ensureLoaded();
        setIsOpen(v => !v);
        setSelectedMonth(null);
        setResults([]);
    }

    function selectMonth(month: string) {
        setSelectedMonth(month);
        setResults(mockResults.filter(r => r.month === month));
    }

    function handleDownload(url: string, subject: string, week: string) {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${subject}_${week}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const activeMonths = new Set(mockResults.map(r => r.month));

    return (
        <Collapsible open={isOpen} className="flex flex-col gap-3">

            {/* ── HEADER CARD ── */}
            <Card className="overflow-hidden shadow-sm border-gray-100 py-0 gap-0">
                <CardContent className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            <BookOpen size={17} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 leading-tight">Result Documents</p>
                            <p className="text-xs text-gray-400 mt-0.5">Week-wise test papers</p>
                        </div>
                    </div>

                    <CollapsibleTrigger>
                        <span
                            onClick={handleToggle}
                            className={`gap-1.5 flex px-3 text-[13px] py-3 items-center  rounded-xl font-semibold cursor-pointer ${isOpen
                                ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-600"
                                : "bg-primary text-white hover:bg-primary/90 shadow-sm shadow-blue-200"
                                }`}
                        >
                            {isOpen ? "Close" : "View Results"}
                            {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </span>
                    </CollapsibleTrigger>
                </CardContent>
            </Card>

            <CollapsibleContent className="flex flex-col gap-3">

                {/* ── MONTH PICKER ── */}
                <Card className="shadow-sm border-gray-100">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar size={12} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Select Month
                            </span>
                            {activeMonths.size > 0 && (
                                <Badge
                                    variant="outline"
                                    className="ml-auto text-[11px] font-semibold text-primary bg-blue-50 border-blue-100 rounded-full"
                                >
                                    {activeMonths.size} available
                                </Badge>
                            )}
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center gap-3 py-8">
                                <div className="w-5 h-5 rounded-full border-2 border-blue-100 border-t-primary animate-spin" />
                                <span className="text-sm text-gray-400">Loading results…</span>
                            </div>
                        ) : error ? (
                            <Alert variant="destructive" className="border-red-100 bg-red-50">
                                <AlertCircle size={14} />
                                <AlertDescription className="text-red-600 text-sm">{error}</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid grid-cols-4 gap-2">
                                {MONTHS.map(({ full, short }) => {
                                    const has = activeMonths.has(full);
                                    const sel = selectedMonth === full;
                                    return (
                                        <Button
                                            key={full}
                                            variant="ghost"
                                            size="sm"
                                            title={full}
                                            disabled={!has}
                                            onClick={() => has && selectMonth(full)}
                                            className={`relative rounded-md px-2 text-[12px] font-semibold py-5 transition-all duration-150
                                                ${sel
                                                    ? "bg-primary! text-white! shadow-sm shadow-blue-200 border-2 border-primary hover:bg-primary! hover:text-white!"
                                                    : has
                                                        ? "bg-blue-50 text-primary border border-blue-200 hover:bg-blue-100 hover:text-primary"
                                                        : "bg-gray-50 text-gray-300 border border-gray-200"
                                                }`}
                                        >
                                            {short}
                                            {has && !sel && (
                                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        )}

                        {!loading && !error && (
                            <>
                                <Separator className="my-4" />
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-[11px] text-gray-400">Available</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-gray-200" />
                                        <span className="text-[11px] text-gray-400">Not uploaded</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* ── RESULTS ── */}
                {selectedMonth && (
                    <Card className="shadow-sm border-gray-100 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between px-5 py-4 bg-linear-to-r from-slate-50 to-blue-50 border-b border-gray-100 space-y-0">
                            <div>
                                <p className="text-base font-bold text-gray-900">
                                    {selectedMonth} — Test Papers
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {results.length > 0
                                        ? `${results.length} paper${results.length > 1 ? "s" : ""} ready to download`
                                        : "No papers uploaded yet"}
                                </p>
                            </div>
                            {results.length > 0 && (
                                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-200">
                                    {results.length}
                                </div>
                            )}
                        </CardHeader>

                        <CardContent className="p-0">
                            {results.length > 0 ? (
                                <>
                                    <div className="p-4 flex flex-col gap-2.5">
                                        {results.map((r, i) => {
                                            const sc = getSubjectColor(r.subject);
                                            return (
                                                <div
                                                    key={i}
                                                    className="relative flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-150"
                                                >
                                                    {/* Floating week badge */}
                                                    <Badge className="absolute -top-2 left-4 text-[10px] px-2 h-4 bg-primary text-white rounded-sm font-semibold">
                                                        {r.week}
                                                    </Badge>

                                                    {/* Left: icon + subject name + badge */}
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-base ring-1 ${sc.bg} ${sc.text} ${sc.ring}`}>
                                                            {r.subject.charAt(0)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-gray-900 leading-tight">
                                                                {r.subject}
                                                            </p>
                                                            <Badge
                                                                variant="secondary"
                                                                className={`text-[10px] font-bold mt-0.5 px-1.5 py-0 h-4 rounded border-0 ${sc.bg} ${sc.text}`}
                                                            >
                                                                TEST PAPER
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    {/* Right: download */}
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleDownload(r.url, r.subject, r.week)}
                                                        className="gap-1.5 h-8 px-3.5 py-5 rounded-lg bg-primary text-white text-xs font-semibold border-none cursor-pointer hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-blue-200"
                                                    >
                                                        <Download size={11} />
                                                        PDF
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Separator />
                                    <p className="py-3 text-center text-[11px] text-gray-400">
                                        Tap <span className="font-semibold text-gray-500">PDF</span> to download the test paper
                                    </p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center py-12 px-6 text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                                        <FileText size={20} className="text-gray-300" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        No results for {selectedMonth}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Results will appear once your teacher uploads them.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

            </CollapsibleContent>
        </Collapsible>
    );
}