"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";

interface User {
    id: string;
    username: string;
    gmail: string;
    role: string;
}

function getInitials(username: string) {
    return username
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function AvatarDropdown({ user, onLogout }: { user: User; onLogout: () => void }) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-cyan-500 text-white font-semibold text-sm">
                        {getInitials(user.username)}
                    </AvatarFallback>
                </Avatar>
                {/* Rotate icon based on open state */}
                <ChevronDown
                    size={22}
                    className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="text-red-500">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}