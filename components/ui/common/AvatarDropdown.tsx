"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dropdown-menu";

interface User {
    id: string;
    username: string;
    gmail: string;
    role: string;
    avatar?: string;
}

const AVATAR_COLORS = [
    "bg-rose-500", "bg-pink-500", "bg-fuchsia-500", "bg-purple-500",
    "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-cyan-500",
    "bg-teal-500", "bg-emerald-500", "bg-green-500", "bg-amber-500",
    "bg-orange-500", "bg-red-500",
];

function getInitials(username: string) {
    const words = username.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getAvatarColor(username: string) {
    const index = username
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export function AvatarDropdown({
    user,
    onLogout,
}: {
    user: User;
    onLogout: () => void;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                <Avatar className="h-9 w-9">
                    {user.avatar && (
                        <AvatarImage
                            src={user.avatar}
                            alt={user.username}
                            referrerPolicy="no-referrer"
                            className="object-cover"
                        />
                    )}
                    <AvatarFallback
                        className={`${getAvatarColor(user.username)} text-white font-semibold text-sm`}
                    >
                        {getInitials(user.username)}
                    </AvatarFallback>
                </Avatar>

                <ChevronDown
                    size={22}
                    className={`text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                    }`}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={onLogout}
                    className="hover:text-white hover:bg-primary"
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}