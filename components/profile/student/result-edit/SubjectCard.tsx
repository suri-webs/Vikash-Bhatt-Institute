"use client";

import { useState } from "react";
import { Trash2, ExternalLink, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { getSubjectConfig, IResult } from "@/components/utils/types/result/type";

interface Props {
    result: IResult;
    onDelete: (id: string) => void;
}

export default function SubjectCard({ result, onDelete }: Props) {
    const cfg = getSubjectConfig(result.subject);
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <div
                className="relative flex flex-col gap-3 rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: `${cfg.color}22`, backgroundColor: cfg.bg }}
            >
                <div className={`h-1 w-full bg-gradient-to-r ${cfg.gradient}`} />
                <div className="px-4 pb-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br ${cfg.gradient} shadow-sm`}>
                                {result.subject.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{result.subject}</p>
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{result.month}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <Badge
                            className="text-[10px] px-2.5 py-0.5 rounded-full font-bold border-0"
                            style={{ backgroundColor: cfg.light, color: cfg.color }}
                        >
                            {result.week}
                        </Badge>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${cfg.gradient}`}
                                style={{ width: `${Math.min((parseInt(result.week.replace(/\D/g, ""), 10) || 1) * 25, 100)}%` }}
                            />
                        </div>
                    </div>
                    <Separator className="mb-3" style={{ backgroundColor: `${cfg.color}18` }} />
                    <div className="flex gap-2">
                        <Link
                            href={result.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all hover:opacity-80"
                            style={{ backgroundColor: cfg.light, color: cfg.color }}
                        >
                            <ExternalLink size={11} /> View
                        </Link>

                        <Link
                            href={result.url}
                            download={`${result.subject}_${result.week}.pdf`}
                            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl text-white bg-gradient-to-r ${cfg.gradient} hover:opacity-90 transition-all`}
                        >
                            <Download size={11} /> PDF
                        </Link>
                    </div>
                </div>
            </div >

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent className="rounded-2xl max-w-sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm font-semibold">Delete result?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-400">
                            This will permanently remove the{" "}
                            <span className="font-medium text-gray-600">{result.subject}</span> test paper for{" "}
                            <span className="font-medium text-gray-600">{result.week}</span>. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="flex-1 rounded-xl h-9 text-sm">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => { onDelete(result._id); setConfirmOpen(false); }}
                            className="flex-1 rounded-xl h-9 text-sm bg-red-600 hover:bg-red-700 gap-1.5"
                        >
                            <Trash2 size={12} /> Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}