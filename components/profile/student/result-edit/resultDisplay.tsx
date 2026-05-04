// resultDisplay.tsx
"use client";
import { Results, useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, BarChart2 } from "lucide-react";

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

    return (
        <section
            className="h-screen w-full flex items-center justify-center mt-5 p-10 overflow-hidden"
            style={{ backgroundColor: "#f0f4f8" }}
        >
            <div className="w-[80%] h-full py-6 flex flex-col gap-3 overflow-y-auto">

                {/* Header card */}
                <div
                    className="rounded-2xl p-4 flex items-center justify-between"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
                >
                    <div>
                        <p className="text-base font-bold text-gray-800">
                            {resultinfo?.month ?? "Result"}
                        </p>
                        <p className="text-xs text-gray-400">1 subject tested</p>
                    </div>
                    {user?.avatar ? (
                        <Image
                            className="rounded-full object-cover"
                            src={user?.avatar}
                            height={36}
                            width={36}
                            alt="User avatar"
                        />
                    ) : (
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                            style={{ backgroundColor: "#475569" }}
                        >
                            {user?.username?.[0]?.toUpperCase() ?? "U"}
                        </div>
                    )}
                </div>

                {/* Monthly overview card */}
                <div
                    className="rounded-2xl p-4 flex items-center justify-between"
                    style={{ backgroundColor: "#eef2ff", border: "1px solid #e0e7ff" }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: "#3b82f6" }}
                        >
                            <BarChart2 size={18} color="white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">Monthly Overview</p>
                            <p className="text-xs text-gray-500">1 subject · 1 week of tests</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-semibold" style={{ color: "#22c55e" }}>✦ Active</p>
                        <p className="text-xs text-gray-400">1 paper</p>
                    </div>
                </div>

                {/* Result detail card */}
                <div
                    className="rounded-2xl p-5 pb-0 flex flex-col items-center  gap-4 flex-1"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
                >
                    <div className="w-full ">
                        {/* Subject header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: "#475569" }}
                            >
                                {resultinfo?.subject?.[0]?.toUpperCase() ?? "S"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 capitalize">
                                    {resultinfo?.subject ?? "Subject"}
                                </p>
                                <p className="text-xs text-gray-400">{resultinfo?.month ?? ""}</p>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#cbd5e1" strokeWidth={2}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </div>

                    {/* Week tag + progress */}
                    <div className="flex flex-col gap-1 mt-2">
                        <span className="text-xs font-bold" style={{ color: "#3b82f6" }}>
                            WEEK {resultinfo?.week ?? "—"}
                        </span>
                        <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "#e2e8f0" }}>
                            <div
                                className="h-1.5 rounded-full"
                                style={{
                                    width: `${percentage}%`,
                                    backgroundColor: "#3b82f6",
                                    transition: "width 0.6s ease"
                                }}
                            />
                        </div>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3 mt-4 flex-1">
                        {[
                            { label: "Name", value: user?.username ?? "" },
                            { label: "Class", value: user?.classIn ?? "" },
                            { label: "Roll No.", value: user?.rollNumber?.toString() ?? "" },
                            { label: "Subject", value: resultinfo?.subject ?? "" },
                            { label: "Test Taken", value: `Week ${resultinfo?.week ?? ""} · ${resultinfo?.month ?? ""}` },
                            { label: "Score", value: `${resultinfo?.marksScored ?? 0} / ${resultinfo?.totalMarks ?? 0}` },
                            { label: "Percentage", value: `${percentage}%` },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">{label}</span>
                                <div
                                    className="text-sm font-medium text-gray-700 rounded-lg px-3 py-1.5"
                                    style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
                                >
                                    {value || <span className="text-gray-300">—</span>}
                                </div>
                            </div>
                        ))}

                        {/* Verdict */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-gray-400">Verdict</span>
                            <div
                                className="text-sm font-semibold rounded-lg px-3 py-1.5"
                                style={{
                                    backgroundColor: percentage > 40 ? "#dcfce7" : "#fee2e2",
                                    color: percentage > 40 ? "#16a34a" : "#dc2626",
                                    border: `1px solid ${percentage > 40 ? "#86efac" : "#fca5a5"}`
                                }}
                            >
                                {percentage > 40 ? "Pass" : "Fail"}
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center w-[40%] mt-1">
                      
                        <Link
                            href={resultinfo?.url || "null"}
                            download={`${resultinfo?.subject}_${resultinfo?.week}.pdf`}
                            className="flex-1 flex items-center justify-center gap-2  rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: "#1e293b" }}
                        >
                            <Download size={14} />
                            PDF
                        </Link>
                    </div>

                    {/* Hint text */}
                    <p className="text-center text-xs text-gray-400">
                        Click  <span className="font-semibold text-gray-500">PDF</span> to download
                    </p>
                </div>

            </div>
        </section>
    );
}