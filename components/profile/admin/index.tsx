"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "./DeleteDialog";
import { EditDialog } from "./EditDialog";
import { AdminCard } from "./AdminCard";
import { SearchBar } from "./SearchBar";
import { StudentGrid } from "./StudentGrid";
import { toast } from "react-toastify";
import { StatTiles } from "./StatTilesCard";
import { getUsersAction, updateUserAction, deleteUserAction } from "@/app/actions";

export interface User {
    _id: string;
    username: string;
    rollNumber: string;
    classIn: string;
    batch: string;
    result?: string[];
    gmail: string;
    avatar?: string;
    role?: string;
}

export default function AdminProfile() {
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("All");
    const [batchFilter, setBatchFilter] = useState("All");
    const [editTarget, setEditTarget] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const router = useRouter();

    const adminUser = users.find((u) => u.role === "admin") ?? null;
    const students = users.filter((u) => !u.role || u.role === "student");

    const filtered = students.filter((u) => {
        const matchSearch =
            (u.username?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
            (u.rollNumber?.toString() ?? "").includes(search);
        const matchClass =
            classFilter === "All" || (u.classIn ?? "").trim() === classFilter;
        const matchBatch =
            batchFilter === "All" ||
            (u.batch ?? "").toLowerCase().trim() === batchFilter.toLowerCase();
        return matchSearch && matchClass && matchBatch;
    });

    useEffect(() => {
        getUsersAction()
            .then((res) => {
                if (res.success && res.users) {
                    setUsers(res.users);
                    const studentCount = (res.users as User[]).filter(
                        (u) => !u.role || u.role === "student"
                    ).length;
                    setTotal(studentCount);
                } else {
                    toast.error(res.message || "Failed to load students");
                }
            })
            .catch(() => toast.error("Failed to load students"));
    }, []);

    const handleSave = async (updated: User) => {
        setSaveError(null);
        try {
            const res = await updateUserAction({
                id: updated._id,
                username: updated.username,
                rollNumber: updated.rollNumber,
                classIn: updated.classIn,
                batch: updated.batch,
                gmail: updated.gmail,
                ...(updated.avatar ? { avatar: updated.avatar } : {}),
            });
            if (res.success && res.user) {
                const saved: User = res.user;
                setUsers((prev) => prev.map((u) => (u._id === saved._id ? saved : u)));
                setEditTarget(null);
                setSaveError(null);
                toast.success(`${saved.username}'s profile updated`);
            } else {
                const msg = res.message || "Update failed";
                setSaveError(msg);
                toast.error(msg);
            }
        } catch (e: any) {
            const msg = e?.message ?? "Update failed";
            setSaveError(msg);
            toast.error(msg);
        }
    };

    const handleDelete = async (user: User) => {
        try {
            const res = await deleteUserAction(user.rollNumber);
            if (res.success) {
                setUsers((p) => p.filter((u) => u._id !== user._id));
                setTotal((p) => p - 1);
                setDeleteTarget(null);
                toast.success(`${user.username} has been removed`);
            } else {
                toast.error(res.message || "Failed to delete student");
            }
        } catch {
            toast.error("Failed to delete student");
        }
    };

    // const handleAddResult = (u: User) => {
    //     const latestUser = users.find((x) => x._id === u._id) ?? u;
    //     router.push(`/result-edit?user=${encodeURIComponent(JSON.stringify(latestUser))}`);
    // };

    const handleAddResult = (u: User) => {
        router.push(`/result-edit?rollNumber=${u.rollNumber}`);
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
                    {adminUser && <AdminCard admin={adminUser} onEdit={setEditTarget} />}

                    <StatTiles total={total} />

                    <SearchBar
                        search={search} onSearch={setSearch}
                        classFilter={classFilter} onClassFilter={setClassFilter}
                        batchFilter={batchFilter} onBatchFilter={setBatchFilter}
                        resultCount={filtered.length}
                    />

                    <StudentGrid
                        users={filtered}
                        onEdit={setEditTarget}
                        onDelete={setDeleteTarget}
                        onAddResult={handleAddResult}
                    />

                    <EditDialog
                        user={editTarget}
                        open={!!editTarget}
                        onClose={() => { setEditTarget(null); setSaveError(null); }}
                        onSave={handleSave}
                        error={saveError}
                        adminOnly={editTarget?.role === "admin"}
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