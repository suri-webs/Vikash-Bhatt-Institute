"use client";
import { useState } from "react";
import {
  BookOpen, Calendar, ChevronDown, ChevronUp,
  AlertCircle, TrendingUp, Award, BarChart3,
  FileText, Download, ExternalLink, Star,
  LinkIcon,
} from "lucide-react";
import { useAuth, User } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Console } from "node:console";

interface Result {
  rollNumber: string;
  subject: string;
  month: string;
  url: string;
  week: string;
  _id:string
}

let mockResults: Result[] = [];


interface ResultCardProps {
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

const SUBJECT_CONFIG: Record<string, {
  color: string; bg: string; light: string; icon: string; gradient: string;
}> = {
  English: { color: "#3b82f6", bg: "#eff6ff", light: "#dbeafe", icon: "E", gradient: "from-blue-500 to-blue-600" },
  Mathematics: { color: "#7c3aed", bg: "#f5f3ff", light: "#ede9fe", icon: "M", gradient: "from-violet-500 to-purple-600" },
  Science: { color: "#059669", bg: "#ecfdf5", light: "#d1fae5", icon: "S", gradient: "from-emerald-500 to-green-600" },
  Physics: { color: "#4f46e5", bg: "#eef2ff", light: "#e0e7ff", icon: "P", gradient: "from-indigo-500 to-blue-600" },
  Chemistry: { color: "#db2777", bg: "#fdf2f8", light: "#fce7f3", icon: "C", gradient: "from-pink-500 to-rose-600" },
  Biology: { color: "#16a34a", bg: "#f0fdf4", light: "#dcfce7", icon: "B", gradient: "from-green-500 to-emerald-600" },
  History: { color: "#d97706", bg: "#fffbeb", light: "#fef3c7", icon: "H", gradient: "from-amber-500 to-yellow-600" },
  Geography: { color: "#0d9488", bg: "#f0fdfa", light: "#ccfbf1", icon: "G", gradient: "from-teal-500 to-cyan-600" },
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
    color: "#6b7280", bg: "#f9fafb", light: "#f3f4f6", icon: subject.charAt(0), gradient: "from-gray-500 to-gray-600"
  };
}

function WeekBadge({ week }: { week: string }) {
  const num = parseInt(week.replace(/\D/g, ""), 10) || 1;
  const pct = Math.min(num * 25, 100);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{week}</span>
      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SubjectResultCard({ result, index }: { result: Result; index: number }) {
  const cfg = getSubjectConfig(result.subject);

  return (
    <div
      className="relative flex flex-col gap-3 rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ borderColor: `${cfg.color}22`, backgroundColor: cfg.bg }}
    >
      <div className={`h-1 w-full bg-linear-to-r ${cfg.gradient}`} />

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-linear-to-br ${cfg.gradient} shadow-sm`}
            >
              {result.subject.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{result.subject}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{result.month}</p>
            </div>
          </div>

          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: cfg.light }}
          >
            <Star size={12} style={{ color: cfg.color }} fill={cfg.color} />
          </div>
        </div>

        <WeekBadge week={result.week} />

        <Separator className="my-3" style={{ backgroundColor: `${cfg.color}18` }} />

        <div className="flex gap-2">
          <Link
            href={`/resultDisplay?url=${encodeURIComponent(result.url)}&id=${encodeURIComponent(result._id)}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: cfg.light, color: cfg.color }}
          >
            <LinkIcon size={11} />
            View
          </Link>
          {/* <Link
            href={result.url}
            download={`${result.subject}_${result.week}.pdf`}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 bg-linear-to-r ${cfg.gradient} shadow-sm`}
          >
            <Download size={11} />
            PDF
          </Link> */}
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

export function ResultCard({ role, displayName, rollNumber }: ResultCardProps) {
    const { studentResults,result } = useAuth();
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
        `/results?rollNumber=${rollNumber}`
      );

      studentResults(data.results ?? []);
      console.log("this is the result.tsx");
      console.log(result);
      
      mockResults = data.results ?? [];
    } catch {
      setError("Could not load results. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle() {
    if (!isOpen) await ensureLoaded();
    setIsOpen((v) => !v);
    setSelectedMonth(null);
    setResults([]);
  }

  function selectMonth(month: string) {
    setSelectedMonth(month);
    setResults(mockResults.filter((r) => r.month === month));
  }


  const activeMonths = new Set(mockResults.map((r) => r.month));
  const router = useRouter();

  function handleView() {
    router.push("/resultDisplay");
  }

  return (
    <Collapsible open={isOpen} className="flex flex-col gap-3">

      {/* ── HEADER CARD ── */}
      <Card className="overflow-hidden shadow-sm border-gray-100 py-0 gap-0">
        <CardContent className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
              <Award size={17} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-tight">Academic Results</p>
              <p className="text-xs text-gray-400 mt-0.5">Subject-wise test performance</p>
            </div>
          </div>

          <CollapsibleTrigger>
            <span
              onClick={handleToggle}
              className={`gap-1.5 flex px-3 text-[13px] py-2.5 items-center rounded-xl font-semibold cursor-pointer transition-all ${isOpen
                ? "border border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-sm shadow-blue-200"
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
              <Calendar size={12} className="text-blue-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Select Month
              </span>
              {activeMonths.size > 0 && (
                <Badge variant="outline" className="ml-auto text-[11px] font-semibold text-blue-600 bg-blue-50 border-blue-100 rounded-full">
                  {activeMonths.size} months
                </Badge>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-3 py-8">
                <div className="w-5 h-5 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin" />
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
                    <button
                      key={full}
                      title={full}
                      disabled={!has}
                      onClick={() => has && selectMonth(full)}
                      className={`relative rounded-xl px-2 text-[12px] font-semibold py-3 transition-all duration-150 border
                        ${sel
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                          : has
                            ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                            : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                        }`}
                    >
                      {short}
                      {has && !sel && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!loading && !error && (
              <>
                <Separator className="my-4" />
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
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

        {selectedMonth && (
          <Card className="shadow-sm border-gray-100 overflow-hidden">
            <CardHeader className="px-5 py-4 bg-linear-to-r from-slate-50 via-blue-50/40 to-indigo-50/30 border-b border-gray-100 space-y-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-gray-900">{selectedMonth}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {results.length > 0
                      ? `${results.length} subject${results.length > 1 ? "s" : ""} tested`
                      : "No results uploaded yet"}
                  </p>
                </div>
                {results.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {results.slice(0, 3).map((r, i) => {
                        const cfg = getSubjectConfig(r.subject);
                        return (
                          <div
                            key={i}
                            className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white bg-linear-to-br ${cfg.gradient}`}
                          >
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
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4">
              {results.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <MonthlySummary results={results} />

                  <div className="grid grid-cols-1 gap-3">
                    {results.map((r, i) => (
                      <SubjectResultCard key={i} result={r} index={i} />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-1.5 py-2 text-[11px] text-gray-400">
                    <FileText size={11} />
                    Click <span onClick={handleView} className="font-semibold text-gray-500 mx-0.5">View</span> to open online ·
                    <span className="font-semibold text-gray-500 mx-0.5">PDF</span> to download
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-12 px-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500">No results for {selectedMonth}</p>
                  <p className="text-xs text-gray-400 mt-1.5 max-w-55">
                    Results will appear once your teacher uploads the test papers.
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

