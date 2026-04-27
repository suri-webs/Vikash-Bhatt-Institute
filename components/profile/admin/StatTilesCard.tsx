"use client";

import { Users, GraduationCap, LayoutGrid, UserPlus } from "lucide-react";
import { StatTile } from "./StatTile";

interface StatTilesProps {
    total: number;
}

export function StatTiles({ total }: StatTilesProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatTile
                icon={Users} iconBg="bg-blue-50" iconColor="text-blue-600"
                label="Total students" value={total}
                pill="+2 this week" pillStyle="bg-emerald-50 text-emerald-700 border-emerald-100"
            />
            <StatTile
                icon={GraduationCap} iconBg="bg-violet-50" iconColor="text-violet-600"
                label="Teachers" value="—"
                pill="Active" pillStyle="bg-violet-50 text-violet-700 border-violet-100"
            />
            <StatTile
                icon={LayoutGrid} iconBg="bg-emerald-50" iconColor="text-emerald-600"
                label="Active batches" value="—"
                pill="Running" pillStyle="bg-emerald-50 text-emerald-700 border-emerald-100"
            />
            <StatTile
                icon={UserPlus} iconBg="bg-gray-50" iconColor="text-gray-400"
                label="Invite a user" value="Add user"
                dashed onClick={() => { }}
            />
        </div>
    );
}