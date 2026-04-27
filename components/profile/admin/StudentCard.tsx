"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";

import {
    MoreHorizontal, Pencil, Trash2, FilePlus,
    Eye, User as UserIcon,
} from "lucide-react";

import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from ".";
import Image from "next/image";

interface StudentCardProps {
    user: User;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
    onAddResult: (u: User) => void;
}

const COLORS = [
    { accent: "#60a5fa", light: "#eff6ff", text: "#1d4ed8" },
    { accent: "#34d399", light: "#ecfdf5", text: "#065f46" },
    { accent: "#f472b6", light: "#fdf2f8", text: "#9d174d" },
    { accent: "#fb923c", light: "#fff7ed", text: "#9a3412" },
    { accent: "#a78bfa", light: "#f5f3ff", text: "#5b21b6" },
    { accent: "#38bdf8", light: "#f0f9ff", text: "#0369a1" },
];

function getColor(name: string) {
    return COLORS[(name.charCodeAt(0) ?? 0) % COLORS.length];
}

export function StudentCard({ user, onEdit, onDelete, onAddResult }: StudentCardProps) {
    const clr = getColor(user.username ?? "U");

    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `${getServerUrl()}/results?rollNumber=${user.rollNumber}`,
                    { withCredentials: true }
                );

                setTotalResults(res.data.results?.length ?? 0);
            } catch {
                setTotalResults(0);
            }
        };

        if (user.rollNumber) fetchResults();
    }, [user.rollNumber]);

    const filledFields = [user.classIn, user.batch, user.rollNumber]
        .filter(Boolean).length;

    const profilePct = Math.round((filledFields / 3) * 100);

    return (
        <div className="flex flex-col bg-white  rounded-md border overflow-hidden shadow-md hover:border-gray-200 transition-all duration-200 group">

            <div className="h-1 w-full" style={{ backgroundColor: clr.accent }} />

            <div className="flex justify-end px-4 pt-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all">
                            <MoreHorizontal size={15} />
                        </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-fit p-2 rounded-md items-center text-sm">
                        <DropdownMenuItem onClick={() => onEdit(user)} className="gap-2 text-xs rounded-sm">
                            <Pencil size={12} /> Edit student
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onAddResult(user)} className="gap-2 text-xs rounded-sm">
                            <FilePlus size={12} /> Add result
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => onDelete(user)}
                            className="gap-2 text-xs rounded-sm text-red-500 focus:text-red-600 focus:bg-red-50"
                        >
                            <Trash2 size={12} /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-col items-center px-4 pb-3 -mt-1">
                {/* Avatar */}
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-[3px] border-white shadow-md bg-gray-100 flex items-center justify-center">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover"
                            fill
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
                            style={{
                                background: `linear-gradient(135deg, ${clr.accent}, ${clr.accent}99)`
                            }}
                        >
                            {user.username?.charAt(0).toUpperCase() ?? <UserIcon size={22} />}
                        </div>
                    )}
                </div>

                <p className="mt-2.5 text-sm font-bold text-gray-900 text-center">
                    {user.username}
                </p>

                <p className="text-[11px] text-gray-400 mt-0.5 text-center truncate max-w-45">
                    {user.gmail}
                </p>

                {user.classIn && (
                    <span
                        className="mt-2 text-[10px] font-bold px-3 py-0.5 rounded-full"
                        style={{ backgroundColor: clr.light, color: clr.text }}
                    >
                        Class {user.classIn}th
                    </span>
                )}
            </div>

            <div className="mx-4 h-px bg-gray-100" />

            <div className="px-4 pt-3 pb-2">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-gray-400 font-medium">Profile complete</span>
                    <span className="text-[10px] font-bold" style={{ color: clr.accent }}>
                        {profilePct}%
                    </span>
                </div>
                <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${profilePct}%`, backgroundColor: clr.accent }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-around px-4 py-3">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-gray-800">{totalResults}</span>
                    <span className="text-[10px] text-gray-400">Results</span>
                </div>

                <div className="h-8 w-px bg-gray-100" />

                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-gray-800">
                        {user.rollNumber || "—"}
                    </span>
                    <span className="text-[10px] text-gray-400">Roll No.</span>
                </div>

                <div className="h-8 w-px bg-gray-100" />

                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-gray-800">
                        {user.batch || "—"}
                    </span>
                    <span className="text-[10px] text-gray-400">Batch</span>
                </div>
            </div>

            <div className="px-4 pb-4">
                <button
                    type="button"
                    onClick={() => onAddResult(user)}
                    className="w-full h-9 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-1.5"
                    style={{
                        borderColor: `${clr.accent}44`,
                        color: clr.text,
                        backgroundColor: clr.light,
                    }}
                >
                    <Eye size={12} /> View Details
                </button>
            </div>
        </div>
    );
}