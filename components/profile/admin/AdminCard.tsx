"use client";

import { ShieldCheck, Mail, BookOpen, LayoutGrid, Settings } from "lucide-react";
import { User } from ".";

interface AdminCardProps {
    admin: User;
    onEdit: (u: User) => void;
}

export function AdminCard({ admin, onEdit }: AdminCardProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-violet-50 p-6 shadow-sm">
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-100/40 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-violet-100/40 blur-2xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="relative shrink-0">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-white shadow-md bg-blue-100 flex items-center justify-center">
                        {admin.avatar ? (
                            <img
                                src={admin.avatar}
                                alt={admin.username}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="text-3xl font-bold text-blue-600">
                                {admin.username?.charAt(0).toUpperCase() ?? "A"}
                            </span>
                        )}
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{admin.username}</h2>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                            <ShieldCheck size={10} /> Admin
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Mail size={11} className="text-blue-400" />
                            {admin.gmail || "—"}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <BookOpen size={11} className="text-violet-400" />
                            {admin.classIn || "All Classes"}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <LayoutGrid size={11} className="text-emerald-400" />
                            {admin.batch || "All Batches"}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => onEdit(admin)}
                    className="shrink-0 flex items-center gap-1.5 self-start sm:self-center text-xs font-medium text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 transition-colors shadow-sm"
                >
                    <Settings size={12} /> Manage
                </button>
            </div>
        </div>
    );
}