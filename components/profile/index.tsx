"use client";

import { useState, useRef, useEffect } from "react";
import { User, MapPin, Pencil, BookOpen, Award, Camera, X, CalendarDays } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function getInitials(username: string) {
    return username.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

interface LocationState {
    country: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
}

interface ProfileFormState {
    firstName: string;
    lastName: string;
    gmail: string;
    phone: string;
    dob: string;
    bio: string;
    location: LocationState;
}

const emptyLocation: LocationState = { country: "", state: "", city: "", pincode: "", address: "" };
const BIO_MAX = 500;

function formatLocation(loc: LocationState): string {
    return [loc.address, loc.city, loc.state, loc.pincode, loc.country]
        .filter(Boolean).join(", ");
}

// ✅ Safe date formatter — avoids hydration mismatch from new Date() on server
function formatDob(dob: string): string {
    if (!dob) return "";
    // Parse as local date to avoid timezone shift
    const [year, month, day] = dob.split("-").map(Number);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${String(day).padStart(2, "0")} ${months[month - 1]} ${year}`;
}

const emptyForm: ProfileFormState = {
    firstName: "", lastName: "", gmail: "",
    phone: "", dob: "", bio: "",
    location: { ...emptyLocation },
};

export default function Profile() {
    const { user, setUser } = useAuth();

    // ✅ mounted guard — prevents any client-only state from rendering on server
    const [mounted, setMounted] = useState(false);

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dobRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<ProfileFormState>(emptyForm);
    const [saved, setSaved] = useState<ProfileFormState>(emptyForm);

    // ✅ Set mounted on client only
    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Sync form only after mount + user loaded
    useEffect(() => {
        if (!mounted || !user) return;
        const firstName = user.username?.split(" ")[0] ?? "";
        const lastName = user.username?.split(" ").slice(1).join(" ") ?? "";
        const loc = (user as any).location;
        const updated: ProfileFormState = {
            firstName, lastName,
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

    const handleChange = (field: keyof Omit<ProfileFormState, "location">, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleLocationChange = (field: keyof LocationState, value: string) =>
        setForm((prev) => ({ ...prev, location: { ...prev.location, [field]: value } }));

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        setSaveError(null);
        try {
            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: (user as any).id ?? (user as any)._id,
                    firstName: form.firstName, lastName: form.lastName,
                    gmail: form.gmail, phone: form.phone, dob: form.dob, bio: form.bio,
                    country: form.location.country, state: form.location.state,
                    city: form.location.city, pincode: form.location.pincode,
                    address: form.location.address,
                    ...(avatarSrc ? { avatar: avatarSrc } : {}),
                }),
            });
            const data = await res.json();
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

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setAvatarSrc(reader.result as string);
        reader.readAsDataURL(file);
    };

    // ✅ Use saved state for display — derived from stable state, not inline computations
    const displayName = saved.firstName || saved.lastName
        ? `${saved.firstName} ${saved.lastName}`.trim()
        : (user?.username ?? "User");

    const locationDisplay = formatLocation(saved.location);

    // ✅ Don't render anything until client is mounted — prevents hydration mismatch
    if (!mounted) return null;

    return (
        <section className="my-20 px-6 py-12">
            <div className="max-w-[85%] mx-auto">

                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-gray-900 leading-tight">My Profile</h1>
                    <p className="text-gray-400 mt-1 text-sm">Manage your personal info, security and learning progress.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* ══ LEFT COLUMN ══ */}
                    <div className="flex flex-col gap-4 w-full lg:w-[400px] shrink-0">

                        {/* Profile card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-4">

                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-[72px] h-[72px] rounded-xl overflow-hidden border border-gray-100 bg-gray-100">
                                        {/* ✅ avatarSrc is client-only state, safe after mount */}
                                        {avatarSrc ? (
                                            <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <User size={28} className="text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        <Camera size={11} className="text-gray-400" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">{displayName}</h2>
                                    <p className="text-sm text-gray-500 truncate mt-0.5">{saved.gmail || user?.gmail}</p>

                                    <div className="flex items-center justify-between mt-2.5">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                            Learning Member
                                        </span>

                                        {/* ✅ editing is client-only state, safe after mount */}
                                        {editing ? (
                                            <div className="flex gap-1.5">
                                                <button
                                                    onClick={handleCancel}
                                                    disabled={saving}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                                                >
                                                    <X size={11} />
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                                        <polyline points="17 21 17 13 7 13 7 21" />
                                                        <polyline points="7 3 7 8 15 8" />
                                                    </svg>
                                                    {saving ? "Saving..." : "Save"}
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                                            >
                                                <Pencil size={11} /> Edit
                                            </button>
                                        )}
                                    </div>

                                    {saveError && (
                                        <p className="text-xs text-red-500 mt-2">{saveError}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#fef9ec] border border-amber-100 rounded-2xl p-5 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <BookOpen size={18} className="text-amber-500" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Courses Enrolled</p>
                            </div>
                            <div className="bg-[#f0fdf7] border border-emerald-100 rounded-2xl p-5 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                        <Award size={18} className="text-emerald-500" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Courses Completed</p>
                            </div>
                        </div>
                    </div>

                    {/* ══ RIGHT COLUMN ══ */}
                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

                            {/* ── PERSONAL INFORMATION ── */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <User size={13} className="text-[#0BBFE0]" />
                                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                                        Personal Information
                                    </h3>
                                </div>
                                <div className="space-y-4">

                                    <ViewEditField label="First Name" value={form.firstName} editing={editing} onChange={(v) => handleChange("firstName", v)} placeholder="Enter your first name" />
                                    <ViewEditField label="Last Name" value={form.lastName} editing={editing} onChange={(v) => handleChange("lastName", v)} placeholder="Enter your last name" />
                                    <ViewEditField label="Email Address" value={form.gmail} editing={editing} onChange={(v) => handleChange("gmail", v)} type="email" placeholder="Enter your email" />
                                    <ViewEditField label="Phone Number" value={form.phone} editing={editing} onChange={(v) => handleChange("phone", v)} placeholder="12345678" />

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1.5">Date of Birth</label>
                                        {editing ? (
                                            <div
                                                onClick={() => dobRef.current?.showPicker?.()}
                                                className="flex items-center w-full text-sm rounded-xl border border-[#0BBFE0] bg-white px-4 py-3 cursor-pointer focus-within:ring-2 focus-within:ring-cyan-100 transition-all"
                                            >
                                                <CalendarDays size={15} className="text-gray-400 mr-2.5 shrink-0" />
                                                <input
                                                    ref={dobRef}
                                                    type="date"
                                                    value={form.dob}
                                                    onChange={(e) => handleChange("dob", e.target.value)}
                                                    className="flex-1 outline-none bg-transparent text-gray-800"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800">
                                                {/* ✅ formatDob is timezone-safe, no new Date() */}
                                                {form.dob
                                                    ? formatDob(form.dob)
                                                    : <span className="text-gray-400">Not specified</span>
                                                }
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* ── ADDITIONAL INFORMATION ── */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <MapPin size={13} className="text-[#0BBFE0]" />
                                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                                        Additional Information
                                    </h3>
                                </div>
                                <div className="space-y-4">

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">Location</label>
                                        {editing ? (
                                            <div className="space-y-2">
                                                <input type="text" value={form.location.address} onChange={(e) => handleLocationChange("address", e.target.value)} placeholder="Street address" className={editInputCls} />
                                                <input type="text" value={form.location.city} onChange={(e) => handleLocationChange("city", e.target.value)} placeholder="City" className={`${editInputCls} w-1/2`} />
                                                <div className="flex gap-2">
                                                    <input type="text" value={form.location.state} onChange={(e) => handleLocationChange("state", e.target.value)} placeholder="State" className={`${editInputCls} flex-1`} />
                                                    <input type="text" value={form.location.country} onChange={(e) => handleLocationChange("country", e.target.value)} placeholder="Country" className={`${editInputCls} flex-1`} />
                                                </div>
                                                <input type="text" value={form.location.pincode} onChange={(e) => handleLocationChange("pincode", e.target.value)} placeholder="Pincode" className={`${editInputCls} w-1/3`} />
                                            </div>
                                        ) : (
                                            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 min-h-[96px] text-gray-800">
                                                {locationDisplay || <span className="text-gray-400">Not specified</span>}
                                            </div>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1.5">Bio</label>
                                        {editing ? (
                                            <>
                                                <textarea
                                                    rows={5}
                                                    value={form.bio}
                                                    maxLength={BIO_MAX}
                                                    onChange={(e) => handleChange("bio", e.target.value)}
                                                    placeholder="Tell us about yourself..."
                                                    className="w-full text-sm rounded-xl border border-[#0BBFE0] bg-white px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 placeholder:text-gray-300"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">{form.bio.length}/{BIO_MAX} characters</p>
                                            </>
                                        ) : (
                                            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 min-h-[100px] text-gray-800">
                                                {form.bio || <span className="text-gray-400">No bio added yet</span>}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ── Shared edit input class ──
const editInputCls = "w-full text-sm rounded-xl border border-[#0BBFE0] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 placeholder:text-gray-300";

// ── ViewEditField ──
interface ViewEditFieldProps {
    label: string;
    value: string;
    editing: boolean;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
}

function ViewEditField({ label, value, editing, onChange, type = "text", placeholder }: ViewEditFieldProps) {
    return (
        <div>
            <label className="block text-sm text-gray-500 mb-1.5">{label}</label>
            {editing ? (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={editInputCls}
                />
            ) : (
                <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800">
                    {value || <span className="text-gray-400">Not specified</span>}
                </div>
            )}
        </div>
    );
}