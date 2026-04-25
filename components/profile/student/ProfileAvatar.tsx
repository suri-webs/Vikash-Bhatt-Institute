"use client";

import { useRef } from "react";
import { User, Camera } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileAvatarProps {
    avatarSrc: string | null;
    editing: boolean;
    onAvatarChange: (src: string) => void;
}

export function ProfileAvatar({ avatarSrc, editing, onAvatarChange }: ProfileAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => onAvatarChange(reader.result as string);
        reader.readAsDataURL(file);
    };

    const hasAvatar = avatarSrc && avatarSrc.trim().length > 0;

    return (
        <div className="relative shrink-0">
            <div
                className="rounded-lg relative shadow-sm border-2 border-white overflow-hidden bg-gray-100 flex items-center justify-center"
                style={{ width: 72, height: 72 }}
            >
                {hasAvatar ? (
                    // Using <img> instead of Next.js <Image> avoids domain whitelist issues for Google OAuth URLs.
                    // For production, also add googleusercontent.com to next.config.js images.domains.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={avatarSrc!}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"   // Required for Google profile images
                        onError={(e) => {
                            // Fallback: hide broken image so the User icon shows instead
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <User size={28} className="text-gray-400" />
                )}
            </div>

            {editing && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute flex justify-center items-center bg-white bottom-3 -right-1.5 w-6 h-6 rounded-full p-0 shadow-sm cursor-pointer border border-gray-100"
                            >
                                <Camera size={11} className="text-gray-400" />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p className="text-xs">Change photo</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

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