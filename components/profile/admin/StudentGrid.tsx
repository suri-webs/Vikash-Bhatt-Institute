"use client";

import { Users } from "lucide-react";
import { StudentCard } from "./StudentCard";
import { User } from ".";

interface StudentGridProps {
    users: User[];
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
    onAddResult: (u: User) => void;
}

export function StudentGrid({ users, onEdit, onDelete, onAddResult }: StudentGridProps) {
    if (users.length === 0) {
        return (
            <div className="col-span-4 flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                    <Users size={20} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">No students found</p>
                <p className="text-xs text-gray-400 mt-1">Try a different name or roll number</p>
            </div>
        );
    }

    return (
        <div className="grid p-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {users.map((u) => (
                <StudentCard
                    key={u._id}
                    user={u}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddResult={onAddResult}
                />
            ))}
        </div>
    );
}