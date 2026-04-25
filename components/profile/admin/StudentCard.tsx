"use client";

import {
    MoreHorizontal, Pencil, Trash2, FilePlus,
    Hash, Layers, Mail, Eye, Quote, BookOpen, User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from ".";

interface StudentCardProps {
    user: User;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
    onAddResult: (u: User) => void;
}

const GRADIENTS = [
    { from: "#60a5fa", to: "#818cf8" },
    { from: "#34d399", to: "#2dd4bf" },
    { from: "#f472b6", to: "#fb7185" },
    { from: "#fb923c", to: "#fbbf24" },
    { from: "#a78bfa", to: "#c084fc" },
    { from: "#38bdf8", to: "#34d399" },
];

function getGradient(name: string) {
    return GRADIENTS[(name.charCodeAt(0) ?? 0) % GRADIENTS.length];
}

const CLASS_PILLS: Record<string, { bg: string; color: string }> = {
    JEE: { bg: "#052e16", color: "#6ee7b7" },
    NEET: { bg: "#4a0020", color: "#fda4af" },
    "10th": { bg: "#082f49", color: "#7dd3fc" },
    "12th": { bg: "#431407", color: "#fdba74" },
};

function getClassPill(cls = "") {
    const key = Object.keys(CLASS_PILLS).find((k) => cls.includes(k));
    return CLASS_PILLS[key ?? ""] ?? { bg: "#1c1917", color: "#d6d3d1" };
}

// ─── Avatar sub-component (same pattern as ProfileAvatar) ───────────────────
function StudentAvatar({ user, g }: { user: User; g: { from: string; to: string } }) {
    const hasAvatar = user.avatar && user.avatar.trim().length > 0;
    const dicebearSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username ?? "U")}&backgroundColor=b6e3f4,ffdfbf,c0aede,d1d4f9`;

    return (
        <div className="relative shrink-0">
            <div
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center"
            >
                {hasAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.avatar!}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                        }}
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={dicebearSrc}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                        }}
                    />
                )}

                {/* Final fallback: icon if both image sources fail */}
                <div
                    className="w-full h-full items-center justify-center hidden"
                    style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                >
                    <UserIcon size={20} className="text-white" />
                </div>
            </div>

            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
    );
}

export function StudentCard({ user, onEdit, onDelete, onAddResult }: StudentCardProps) {
    const g = getGradient(user.username ?? "U");
    const pill = getClassPill(user.classIn ?? "");

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">

            {/* Colour accent bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${g.from}, ${g.to})` }} />

            {/* Header */}
            <div className="flex items-start justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-3 min-w-0">
                    <StudentAvatar user={user} g={g} />

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-tight truncate max-w-[140px]">
                            {user.username}
                        </p>
                        {user.classIn && (
                            <span
                                className="inline-block mt-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                                style={{ background: pill.bg, color: pill.color }}
                            >
                                {user.classIn}
                            </span>
                        )}
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="h-7 w-7 p-0 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 shrink-0 -mt-0.5">
                            <MoreHorizontal size={14} />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl text-sm">
                        <DropdownMenuItem onClick={() => onEdit(user)} className="gap-2 text-xs rounded-lg">
                            <Pencil size={12} /> Edit student
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddResult(user)} className="gap-2 text-xs rounded-lg">
                            <FilePlus size={12} /> Add result
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(user)} className="gap-2 text-xs rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 size={12} /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Quote + enroll chip */}
            <div className="px-4 pb-3 flex-1 flex flex-col gap-2.5">
                <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100 relative">
                    <Quote size={13} className="absolute top-2 left-3 text-gray-300" />
                    <p className="text-[11px] italic text-gray-500 leading-relaxed pl-4">
                        Currently enrolled and building skills &amp; experience.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-blue-100 flex items-center justify-center shrink-0">
                        <BookOpen size={12} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Currently Enrolled</p>
                        <p className="text-[11px] font-semibold text-blue-700 leading-tight">Building Skills &amp; Experience</p>
                    </div>
                </div>

                <p className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <BookOpen size={10} className="shrink-0" />
                    Learning journey in progress
                </p>
            </div>

            {/* Meta */}
            <div className="px-4 py-2.5 flex flex-col gap-1.5">
                {user.gmail && (
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 min-w-0">
                        <Mail size={10} className="text-gray-400 shrink-0" />
                        <span className="truncate">{user.gmail}</span>
                    </div>
                )}
                <div className="flex items-center gap-3 text-[11px] text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                        <Hash size={10} className="text-gray-400" />
                        Roll: <span className="font-semibold text-gray-700 ml-0.5">{user.rollNumber || "—"}</span>
                    </span>
                    {user.batch && (
                        <>
                            <span className="text-gray-200">·</span>
                            <span className="flex items-center gap-1">
                                <Layers size={10} className="text-gray-400" />
                                <span className="font-semibold text-emerald-600">{user.batch}</span>
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="px-4 py-3">
                <Button
                    onClick={() => onAddResult(user)}
                    variant="outline"
                    size="sm"
                    className="w-full h-8 rounded-xl text-xs gap-1.5 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-medium transition-colors"
                >
                    <Eye size={11} /> View Details
                </Button>
            </div>
        </div>
    );
}