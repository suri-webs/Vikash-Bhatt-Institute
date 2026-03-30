"use client";

import { useRef } from "react";
import { User, Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileAvatarProps {
    avatarSrc: string | null;
    onAvatarChange: (src: string) => void;
}

export function ProfileAvatar({ avatarSrc, onAvatarChange }: ProfileAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => onAvatarChange(reader.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div className="relative shrink-0">
            <Avatar className="w-18 h-18 overflow-hidden  rounded-xl border border-gray-200">
                {avatarSrc ? (
                    <AvatarImage src={avatarSrc} alt="User avatar" className="object-cover rounded-none" />
                ) : (
                    <AvatarFallback className="rounded-xl bg-gray-100">
                        <User size={28} className="text-gray-400" />
                    </AvatarFallback>
                )}
            </Avatar>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger >
                        <span
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute flex justify-center items-center bg-white bottom-3.5 -right-1.5 w-6 h-6 rounded-full p-0 shadow-sm"
                        >
                            <Camera size={11} className="text-gray-400" />
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p className="text-xs">Change photo</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}