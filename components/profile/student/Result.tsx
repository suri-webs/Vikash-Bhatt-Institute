"use client";
import { useEffect, useState } from "react";
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


interface Result {
  rollNumber: string;
  subject: string;
  month: string;
  url: string;
  week: string;
  _id: string
}


let mockResults: Result[] = [];


interface ResultCardProps {
  user: User | null;
  displayName: string;
  role: string;
  userId: string;
  rollNumber: string | number;
  classIn: string;
  onMonthSelect?: (month: string | null, results: Result[]) => void;

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

export function ResultSection({ rollNumber, onMonthSelect }: ResultCardProps) {
  const { studentResults, setIsCollapse } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [IsCollapseLocal, setIsCollapseLocal] = useState<boolean>(false);

  useEffect(() => {
    setIsCollapse(IsCollapseLocal);
    console.log(IsCollapseLocal);
  }, [IsCollapseLocal]);
  async function ensureLoaded() {

    if (mockResults.length) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(
        `/results?rollNumber=${rollNumber}`
      );

      studentResults(data.results ?? []);
      mockResults = data.results ?? [];
    } catch {
      setError("Could not load results. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  async function handleToggle() {
    if (isOpen) {
      onMonthSelect?.(null, []);
    }
    if (!isOpen) await ensureLoaded();
    setIsOpen((v) => !v);
    setSelectedMonth(null);
    setResults([]);
  }
  function selectMonth(month: string) {
    setSelectedMonth(month);
    const filtered = mockResults.filter((r) => r.month === month);
    setResults(filtered);
    onMonthSelect?.(month, filtered);

  }
  const activeMonths = new Set(mockResults.map((r) => r.month));
  return (
    <Collapsible open={isOpen} className="flex flex-col gap-6">

      {/* ── HEADER CARD ── */}
      <Card className="overflow-hidden shadow-sm border-gray-100 py-0 gap-0">
        <CardContent className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
              <Award size={17} className="text-white" />
            </div>
            <div >
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
            <div className="flex items-center gap-2 mb-6">
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
              <div className="grid grid-cols-4 gap-4">
                {MONTHS.map(({ full, short }) => {
                  const has = activeMonths.has(full);
                  const sel = selectedMonth === full;
                  return (
                    <button
                      key={full}
                      title={full}
                      disabled={!has}
                      onClick={() => {
                        if (has) {
                          selectMonth(full);
                          const next = !IsCollapseLocal;
                          setIsCollapseLocal(next);
                          console.log(IsCollapseLocal);

                        }
                      }}
                      className={`relative rounded px-2 text-[12px] font-semibold py-3 transition-all duration-150 border
                        ${sel
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200 m-1"
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
      </CollapsibleContent>
    </Collapsible>
  );
}
