"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";

interface ProfileCardProps {
    role: string;
    displayName: string;
    email: string;
    avatarSrc: string | null;
    editing: boolean;
    saving: boolean;
    saveError: string | null;
    onAvatarChange: (src: string) => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}

const SaveIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </svg>
);

export function ProfileCard({ displayName, role, email, avatarSrc, editing, saving, saveError, onAvatarChange, onEdit, onSave, onCancel }: ProfileCardProps) {
    return (
        <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardContent className="p-2 px-4">
                <div className="flex items-center gap-4">
                    <ProfileAvatar avatarSrc={avatarSrc} editing={editing} onAvatarChange={onAvatarChange} />
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">{displayName}</h2>
                        <p className="text-sm text-gray-500 truncate mt-0.5">{email}</p>
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-600 text-xs font-medium px-2.5 py-1 rounded-full gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                {role === "admin" ? role : "Learning Member"}
                            </Badge>
                            {editing ? (
                                <div className="flex gap-1.5">
                                    <Button variant="outline" size="sm" onClick={onCancel} disabled={saving} className="px-3 py-1.5 h-auto rounded-lg text-xs">
                                        <X size={11} />
                                    </Button>
                                    <Button size="sm" onClick={onSave} disabled={saving} className="px-4 py-1.5 h-auto rounded-lg bg-primary text-white hover:bg-primary/90 text-xs gap-1.5">
                                        <SaveIcon />
                                        {saving ? "Saving..." : "Save"}
                                    </Button>
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" onClick={onEdit} className="px-3 py-1.5 h-auto rounded-lg text-xs gap-1.5">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit
                                </Button>
                            )}
                        </div>
                        {saveError && <p className="text-xs text-red-500 mt-2">{saveError}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}