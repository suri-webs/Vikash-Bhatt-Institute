import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { LocationState, ProfileFormState } from "@/components/utils/types/profile";
import { getServerUrl } from "@/components/utils/config";

const emptyLocation: LocationState = {
    country: "", state: "", city: "", pincode: "", address: "",
};

const emptyForm: ProfileFormState = {
    classIn: "", rollNumber: 0,
    fullName: "", gmail: "",
    phone: "", dob: "", bio: "",
    location: { ...emptyLocation },
};

export function useProfileForm() {
    const { user, setUser } = useAuth();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const [form, setForm] = useState<ProfileFormState>(emptyForm);
    const [saved, setSaved] = useState<ProfileFormState>(emptyForm);

    useEffect(() => {
        if (!user) return;
        const loc = (user as any).location;
        const populated: ProfileFormState = {
            fullName: user.username ?? "",
            classIn: user.classIn ?? "",
            rollNumber: user.rollNumber ?? 0,
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
        setForm(populated);
        setSaved(populated);
        if ((user as any).avatar) setAvatarSrc((user as any).avatar);
    }, [user]);

    const handleChange = (field: string, value: string | number) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleLocationChange = (field: keyof LocationState, value: string) =>
        setForm((prev) => ({ ...prev, location: { ...prev.location, [field]: value } }));

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        setSaveError(null);
        try {
            const res = await axios.put(
                `${getServerUrl()}/users`,
                {
                    id: (user as any)._id ?? (user as any).id,
                    username: form.fullName,
                    fullName: form.fullName,
                    classIn: form.classIn,
                    rollNumber: form.rollNumber,
                    gmail: form.gmail,
                    phone: form.phone,
                    dob: form.dob,
                    bio: form.bio,
                    ...form.location,
                    ...(avatarSrc ? { avatar: avatarSrc } : {}),
                },
                { withCredentials: true }
            );

            if (res.data && !res.data.success && res.data.message) {
                setSaveError(res.data.message);
                return;
            }

            if (setUser && res.data.user) setUser(res.data.user);
            setSaved({ ...form, location: { ...form.location } });
            setEditing(false);
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? e?.message ?? "Network error. Please try again.";
            setSaveError(msg);
            console.error("Save failed:", e?.response?.data ?? e);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setForm({ ...saved, location: { ...saved.location } });
        setEditing(false);
        setSaveError(null);
    };

    return {
        user, form, saved, editing, saving, saveError, avatarSrc,
        setAvatarSrc, setEditing,
        handleChange, handleLocationChange, handleSave, handleCancel,
    };
}