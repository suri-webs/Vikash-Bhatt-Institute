"use client";

import { useState } from "react";
import { Trash2, ExternalLink, Download } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { getSubjectConfig, IResult, isPassed } from "@/components/utils/types/result/type";

interface Props {
    result: IResult;
    onDelete: (id: string) => void;
}

export default function SubjectCard({ result, onDelete }: Props) {
    const cfg = getSubjectConfig(result.subject);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const passed = isPassed(result);
    const percentage = result.totalMarks > 0
        ? Math.round((result.marksScored / result.totalMarks) * 100)
        : 0;

    return (
        <>
            <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                {/* Color accent top bar */}
                <div
                    className="h-1.5 w-full"
                    style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}88)` }}
                />

                <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-base shrink-0"
                                style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)` }}
                            >
                                {result.subject.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 capitalize">{result.subject}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">{result.month} · {result.week}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            {/* Pass / Fail badge */}
                            <span className={`text-[10px] font-bold px-4 py-1.5 rounded-md border ${
                                passed
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-red-50 text-red-500 border-red-200"
                            }`}>
                                {passed ? "PASS" : "FAIL"}
                            </span>

                            {/* Delete button */}
                            <button
                                type="button"
                                onClick={() => setConfirmOpen(true)}
                                className="w-8 h-7 rounded-md flex items-center border bg-gray-50 justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all "
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Marks display */}
                    <div className="mb-4 rounded-2xl px-4 py-3 flex items-center justify-between"
                        style={{ backgroundColor: `${cfg.color}0d` }}>
                        <div>
                            <p className="text-[10px] text-gray-400 font-medium">Marks Obtained</p>
                            <p className="text-xl font-black mt-0.5" style={{ color: cfg.color }}>
                                {result.marksScored}
                                <span className="text-sm font-semibold text-gray-300 ml-1">/ {result.totalMarks}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 font-medium">Percentage</p>
                            <p className="text-xl font-black mt-0.5" style={{ color: cfg.color }}>
                                {percentage}%
                            </p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${percentage}%`,
                                    background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}99)`
                                }}
                            />
                        </div>
                        {/* Pass threshold marker at 33% */}
                        <div className="relative h-0">
                            <div
                                className="absolute -top-2 w-0.5 h-3 bg-gray-300 rounded-full"
                                style={{ left: "33%" }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gray-300">
                            <span>0</span>
                            <span className="text-gray-400" style={{ marginLeft: "25%" }}>Pass (33%)</span>
                            <span>{result.totalMarks}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Link
                            href={result.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold h-9 rounded-2xl border transition-all hover:opacity-70"
                            style={{ borderColor: `${cfg.color}33`, color: cfg.color, backgroundColor: `${cfg.color}0d` }}
                        >
                            <ExternalLink size={11} /> View
                        </Link>
                        <Link
                            href={result.url}
                            download={`${result.subject}_${result.week}.pdf`}
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold h-9 rounded-2xl text-white transition-all hover:opacity-80"
                            style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` }}
                        >
                            <Download size={11} /> PDF
                        </Link>
                    </div>
                </div>
            </div>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent className="rounded-3xl max-w-sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm font-bold">Delete result?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-400">
                            This will permanently remove{" "}
                            <span className="font-semibold text-gray-600 capitalize">{result.subject}</span>{" "}
                            — <span className="font-semibold text-gray-600">{result.week}</span>.
                            This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="flex-1 min-h-11 text-sm">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => { onDelete(result._id); setConfirmOpen(false); }}
                            className="flex-1 bg-destructive text-white min-h-11"
                        >
                            <Trash2 size={12} /> Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}