"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileCard } from "./ProfileCard";
import { ResultSection } from "./Result";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { useState } from "react";
import { getSubjectConfig } from "@/components/utils/types/result/type";
import { FileText, BookOpen, BarChart3, TrendingUp, Link, LinkIcon, Star } from "lucide-react";
import ResultCard from "@/components/profile/student/result-edit/resultCard"
import { Separator } from "@base-ui/react";
interface Result {
    rollNumber: string;
    subject: string;
    month: string;
    url: string;
    week: string;
    _id: string;
}


// function monthResult

export default function StudentProfile() {
    const { user } = useAuth();
    const {
        form, saved, editing, saving, saveError, avatarSrc,
        setAvatarSrc, setEditing, handleChange, handleLocationChange, handleSave, handleCancel,
    } = useProfileForm();

    const displayName = user?.username ?? "User";
    const rollNumber = user?.rollNumber ?? "00000";
    const id = (user as any)?.id ?? "Id";
    const [monthResults, setMonthResults] = useState<{
        month: string | null;
        results: Result[];
    }>({ month: null, results: [] });

    return (
        <section className="my-20 px-6 py-12">
            <div className="max-w-[85%] max-sm:max-w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900 leading-tight">My Profile</h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        Manage your personal info, security and learning progress.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-5  items-start">
                    {/* Left column */}
                    <div className="flex flex-col gap-6 w-full lg:w-100 shrink-0">
                        <ProfileCard
                            role={user?.role ?? "Learning Member"}
                            displayName={displayName}
                            email={saved.gmail || user?.gmail || ""}
                            avatarSrc={avatarSrc}
                            editing={editing}
                            saving={saving}
                            saveError={saveError}
                            onAvatarChange={setAvatarSrc}
                            onEdit={() => setEditing(true)}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                        <ResultSection
                            user={user}
                            userId={id}
                            role={user?.role ?? "student"}
                            displayName={displayName}
                            rollNumber={rollNumber}
                            classIn={saved.classIn}
                            onMonthSelect={(month, results) =>
                                setMonthResults({ month, results })}
                        />
                    </div>

                    {/* Right column */}
                    <Card className="flex-1 w-full border-gray-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4 lg:p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                <PersonalInfoSection
                                    fullName={form.fullName}
                                    gmail={form.gmail}
                                    phone={form.phone}
                                    dob={form.dob}
                                    editing={editing}
                                    classIn={form.classIn}
                                    rollNumber={form.rollNumber}
                                    onChange={handleChange}
                                />
                                <AdditionalInfoSection
                                    location={form.location}
                                    bio={form.bio}
                                    editing={editing}
                                    onLocationChange={handleLocationChange}
                                    onBioChange={(v) => handleChange("bio", v)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* bottom  */}
                {monthResults.month && (
                    <ResultCard
                        month={monthResults.month}
                        results={monthResults.results}
                    />
                )}
            </div>
        </section>
    );
}