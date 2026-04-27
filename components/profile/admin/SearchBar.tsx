"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BATCH_OPTIONS, CLASS_OPTIONS } from "@/components/utils/types/result/type";

interface SearchBarProps {
    search: string;
    onSearch: (v: string) => void;
    classFilter: string;
    onClassFilter: (v: string) => void;
    batchFilter: string;
    onBatchFilter: (v: string) => void;
    resultCount: number;
}

export function SearchBar({
    search, onSearch,
    classFilter, onClassFilter,
    batchFilter, onBatchFilter,
    resultCount,
}: SearchBarProps) {
    return (
        <div className="flex justify-center max-w-full items-center gap-2">
            <div className="flex w-full max-md:flex-col relative items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-2.5">
                <div className="flex w-full items-center gap-2">
                    <Search size={15} className="text-gray-400 shrink-0" />
                    <Input
                        placeholder="Search by name or roll number…"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="shadow-none p-3 border h-auto text-sm focus-visible:ring-0 bg-transparent placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center max-sm:justify-between max-md:w-full gap-5">
                    <Select value={classFilter} onValueChange={(v) => v && onClassFilter(v)}>
                        <SelectTrigger className="w-27.5 py-5 rounded-md border-gray-200 bg-white text-sm text-gray-600 focus:ring-1 focus:ring-blue-200">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent className="mt-5">
                            {CLASS_OPTIONS.map((c) => (
                                <SelectItem key={c} value={c} className="text-sm rounded-xl">
                                    {c === "All" ? "All Classes" : `Class ${c}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={batchFilter} onValueChange={(v) => v && onBatchFilter(v)}>
                        <SelectTrigger className="w-30 py-5 rounded-md border-gray-200 bg-white text-sm text-gray-600 focus:ring-1 focus:ring-blue-200">
                            <SelectValue placeholder="Batch" />
                        </SelectTrigger>
                        <SelectContent>
                            {BATCH_OPTIONS.map((b) => (
                                <SelectItem key={b} value={b} className="text-sm rounded-xl">
                                    {b === "All" ? "All Batches" : b}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Badge variant="outline" className="text-[11px] font-medium text-blue-600 bg-blue-50 border-blue-100 rounded-md px-2.5 py-5 whitespace-nowrap">
                        {resultCount} student{resultCount !== 1 ? "s" : ""}
                    </Badge>
                </div>
            </div>
        </div>
    );
}