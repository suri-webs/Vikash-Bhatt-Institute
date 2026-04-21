"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileCard } from "./Profilecard";
import { PersonalInfoSection } from "./Personalinfosection";
import { AdditionalInfoSection } from "./Additionalinfosection";
import { LocationState, ProfileFormState } from "../utils/types/profile";
import { ProfileSkeleton } from "./Profileskeleton";
import { ResultCard } from "./Result";
import { getServerUrl } from "../utils/config";
import axios from "axios";
import AdminSection from "./adminSection";



const emptyLocation: LocationState = {
    country: "", state: "", city: "", pincode: "", address: "",
};

const emptyForm: ProfileFormState = {
    classIn: "", rollNumber: 0,
    fullName: "", gmail: "",
    phone: "", dob: "", bio: "",
    location: { ...emptyLocation },
};


export default function Profile() {
    const { user, setUser } = useAuth();

    const [mounted, setMounted] = useState(false);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    const [form, setForm] = useState<ProfileFormState>(emptyForm);
    const [saved, setSaved] = useState<ProfileFormState>(emptyForm);

    // ── Mount guard (prevents SSR hydration mismatch) ──
    useEffect(() => { setMounted(true); }, []);

    // ── Populate form from user context ──
    useEffect(() => {
        if (!mounted || !user) return;
        const fullName = user.username;
        const loc = (user as any).location;

        const updated: ProfileFormState = {
            fullName,
            classIn: user.classIn ?? "",
            rollNumber: user.rollNumber ?? "",
            gmail: user.gmail ?? "",
            phone: (user as any).phone ?? "",
            dob: (user as any).dob ?? "",
            bio: (user as any).bio ?? "",
            location: {
                country: loc?.country ?? "",
                state: loc?.state ?? "",
                city: loc?.city ?? "",
                pincode: loc?.pincode ?? "",
                address: loc?.address ?? "",
            },
        };

        setForm(updated);
        setSaved(updated);
        if ((user as any).avatar) setAvatarSrc((user as any).avatar);
    }, [mounted, user]);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleChange = (field: string, value: string | number) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleLocationChange = (field: keyof LocationState, value: string) =>
        setForm((prev) => ({ ...prev, location: { ...prev.location, [field]: value } }));

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        setSaveError(null);
        try {
            const res = await axios.put(`${getServerUrl()}/users`, {
                id: (user as any).id ?? (user as any)._id,
                fullName: form.fullName,
                classIn: form.classIn,
                rollNumber: form.rollNumber,
                gmail: form.gmail,
                phone: form.phone,
                dob: form.dob,
                bio: form.bio,
                country: form.location.country,
                state: form.location.state,
                city: form.location.city,
                pincode: form.location.pincode,
                address: form.location.address,
                ...(avatarSrc ? { avatar: avatarSrc } : {}),
            });

            const data = res.data;
            if (!data.success) {
                setSaveError(data.message || data.error || "Failed to save");
                return;
            }
            if (setUser) setUser(data.user);
            setSaved({ ...form, location: { ...form.location } });
            setEditing(false);
        } catch {
            setSaveError("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setForm({ ...saved, location: { ...saved.location } });
        setEditing(false);
        setSaveError(null);
    };

    // ── Derived display values ─────────────────────────────────────────────

    const displayName = (user?.username ?? "User");
    const rollNumber = (user?.rollNumber ?? "00000");
    const id = (user?.id ?? "Id");

    if (!mounted) return <ProfileSkeleton />;

    // ── Render ─────────────────────────────────────────────────────────────

    return (
        <section className="my-20 px-6 py-12">
            <div className="max-w-[85%] max-sm:max-w-full mx-auto">

                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900 leading-tight">My Profile</h1>
                    {user?.role === "admin" ?
                        <p className="text-gray-400 mt-1 text-sm">
                            Manage Student details, security and  monitor learning progress.
                        </p> :
                        <p className="text-gray-400 mt-1 text-sm">
                            Manage your personal info, security and learning progress.
                        </p>}
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* ── Left column ── */}
                    <div className="flex flex-col gap-4 w-full lg:w-100 shrink-0">
                        <ProfileCard
                            role={user?.role || "Learning Member"}
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
                        {/* <ProfileStats /> */}
                        {/* <StudentDetails
                            displayName={displayName}
                            // email={saved.gmail || user?.gmail || ""}
                            // avatarSrc={avatarSrc}
                            editing={editing}
                            saving={saving}
                            saveError={saveError}
                            // onAvatarChange={setAvatarSrc}
                            onEdit={() => setEditing(true)}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        /> */}
                        <ResultCard
                            user={user}
                            userId={id}
                            role={user?.role ?? "student"}
                            displayName={displayName}
                            rollNumber={rollNumber}
                            classIn={saved.classIn}
                        />
                    </div>


                    {/* ── Right column ── */}


                    {user?.role === "admin" ?

                      <AdminSection/>

                        : <Card className="flex-1 w-full max-w-full border-gray-100 shadow-sm rounded-2xl">
                            <CardContent className="p-6 lg:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">


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
                        </Card>}




                </div>
            </div>
        </section>
    );
}