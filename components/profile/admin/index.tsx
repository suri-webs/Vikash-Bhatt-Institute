"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Search, Users, GraduationCap, LayoutGrid, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getServerUrl } from "@/components/utils/config";
import { StatTile } from "./StatTile";
import { StudentCard } from "./StudentCard";
import { DeleteDialog } from "./DeleteDialog";
import { EditDialog } from "./EditDialog";

export interface User {
    _id: string;
    username: string;
    rollNumber: string;
    classIn: string;
    batch: string;
    result?: string[];
    gmail: string;
    avatar?: string;
}

export default function AdminProfile() {
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [editTarget, setEditTarget] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const router = useRouter();

    const filtered = users.filter((u) =>
        (u.username?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
        (u.rollNumber?.toString() ?? "").includes(search)
    );

    useEffect(() => {
        axios.get(`${getServerUrl()}/users`, { withCredentials: true })
            .then((r) => { setUsers(r.data.users); setTotal(r.data.users.length); })
            .catch(console.error);
    }, []);

    const handleSave = async (updated: User) => {
        setSaveError(null);
        try {
            const res = await axios.put(
                `${getServerUrl()}/users`,
                {
                    id: updated._id,
                    username: updated.username,
                    rollNumber: updated.rollNumber,
                    classIn: updated.classIn,
                    batch: updated.batch,
                    gmail: updated.gmail,
                    ...(updated.avatar ? { avatar: updated.avatar } : {}),
                },
                { withCredentials: true }
            );

            const saved = res.data?.user ?? updated;
            setUsers((p) => p.map((u) => (u._id === saved._id ? saved : u)));
            setEditTarget(null);
            setSaveError(null);
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? e?.message ?? "Update failed";
            setSaveError(msg);
            console.error("Update failed:", e?.response?.data ?? e);
        }
    };

    const handleDelete = async (user: User) => {
        try {
            await axios.delete(`${getServerUrl()}/users`, {
                data: { rollNumber: user.rollNumber },
                withCredentials: true,
            });
            setUsers((p) => p.filter((u) => u._id !== user._id));
            setTotal((p) => p - 1);
            setDeleteTarget(null);
        } catch (e) { console.error(e); }
    };

    return (
        <section className="my-20 px-6 py-12">
            <div className="max-w-[90%] mx-auto">
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900 leading-tight">My Profile</h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        Manage student details, security and monitor learning progress.
                    </p>
                </div>

                <div className="flex-1 w-full flex flex-col gap-4">

                    {/* Stat tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <StatTile icon={Users} iconBg="bg-blue-50" iconColor="text-blue-600" label="Total students" value={total} pill="+2 this week" pillStyle="bg-emerald-50 text-emerald-700 border-emerald-100" />
                        <StatTile icon={GraduationCap} iconBg="bg-violet-50" iconColor="text-violet-600" label="Teachers" value="—" pill="Active" pillStyle="bg-violet-50 text-violet-700 border-violet-100" />
                        <StatTile icon={LayoutGrid} iconBg="bg-emerald-50" iconColor="text-emerald-600" label="Active batches" value="—" pill="Running" pillStyle="bg-emerald-50 text-emerald-700 border-emerald-100" />
                        <StatTile icon={UserPlus} iconBg="bg-gray-50" iconColor="text-gray-400" label="Invite a user" value="Add user" dashed onClick={() => { }} />
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-2.5">
                        <Search size={14} className="text-gray-400 flex-shrink-0" />
                        <Input
                            placeholder="Search by name or roll number…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 border-none shadow-none p-0 h-auto text-sm focus-visible:ring-0 bg-transparent placeholder:text-gray-400"
                        />
                        <Badge variant="outline" className="text-[11px] font-medium text-blue-600 bg-blue-50 border-blue-100 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                            {filtered.length} student{filtered.length !== 1 ? "s" : ""}
                        </Badge>
                    </div>

                    {/* Student grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        {filtered.length === 0 ? (
                            <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                                    <Users size={20} className="text-gray-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-500">No students found</p>
                                <p className="text-xs text-gray-400 mt-1">Try a different name or roll number</p>
                            </div>
                        ) : filtered.map((u) => (
                            <StudentCard
                                key={u._id}
                                user={u}
                                onEdit={setEditTarget}
                                onDelete={setDeleteTarget}
                                onAddResult={(u) => router.push(`/result-edit?user=${encodeURIComponent(JSON.stringify(u))}`)}
                            />
                        ))}
                    </div>

                    <EditDialog
                        user={editTarget}
                        open={!!editTarget}
                        onClose={() => { setEditTarget(null); setSaveError(null); }}
                        onSave={handleSave}
                        error={saveError}
                    />
                    <DeleteDialog
                        user={deleteTarget}
                        onClose={() => setDeleteTarget(null)}
                        onConfirm={handleDelete}
                    />
                </div>
            </div>
        </section>
    );
}