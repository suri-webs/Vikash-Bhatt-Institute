"use client";

import { useEffect, useState } from "react";
import { X, Check, GraduationCap, Hash, BookOpen, Layers, Mail, AlertCircle, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { User } from ".";
import Image from "next/image";

interface EditDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (u: User) => Promise<void>;
  error?: string | null;
  adminOnly?: boolean; 
}

const GRADIENTS = [
  ["#60a5fa", "#818cf8"],
  ["#34d399", "#2dd4bf"],
  ["#f472b6", "#fb7185"],
  ["#fb923c", "#fbbf24"],
  ["#a78bfa", "#c084fc"],
  ["#38bdf8", "#34d399"],
];

function getGrad(name: string) {
  return GRADIENTS[(name.charCodeAt(0) ?? 0) % GRADIENTS.length];
}

// ✅ Student fields (unchanged)
const STUDENT_FIELDS: {
  id: keyof User;
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder?: string;
}[] = [
    { id: "username", label: "Full name", icon: GraduationCap, placeholder: "e.g. Rahul Sharma" },
    { id: "rollNumber", label: "Roll number", icon: Hash, placeholder: "e.g. 12345" },
    { id: "classIn", label: "Class", icon: BookOpen, placeholder: "e.g. JEE / NEET / 10th" },
    { id: "batch", label: "Batch", icon: Layers, placeholder: "e.g. Batch A" },
    { id: "gmail", label: "Email address", icon: Mail, type: "email", placeholder: "student@gmail.com" },
  ];

// ✅ Admin fields — name, gmail, avatar only
const ADMIN_FIELDS: typeof STUDENT_FIELDS = [
  { id: "username", label: "Full name", icon: GraduationCap, placeholder: "e.g. Vikas Bhatt" },
  { id: "gmail", label: "Email address", icon: Mail, type: "email", placeholder: "admin@gmail.com" },
  { id: "avatar", label: "Profile image URL", icon: ImageIcon, placeholder: "https://..." },
];

export function EditDialog({ user, open, onClose, onSave, error, adminOnly = false }: EditDialogProps) {
  const [form, setForm] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (user) { setForm({ ...user }); setSaving(false); setPreviewError(false); }
  }, [user]);

  if (!form) return null;

  const fields = adminOnly ? ADMIN_FIELDS : STUDENT_FIELDS;
  const [gradFrom, gradTo] = getGrad(form.username ?? "U");
  const initial = (form.username ?? "U").charAt(0).toUpperCase();
  const hasAvatar = form.avatar && form.avatar.trim().length > 0;
  const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(form.username ?? "U")}&backgroundColor=b6e3f4,ffdfbf,c0aede`;

  const handleSubmit = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-100 rounded-3xl p-0 pb-2 gap-0 overflow-hidden border border-gray-100 shadow-2xl">

        <div
          className="h-16 w-full relative"
          style={{ background: `linear-gradient(135deg, ${gradFrom}22, ${gradTo}44)` }}
        >
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${gradTo}, transparent)` }} />
          <div className="absolute -bottom-4 -left-6 w-20 h-20 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradFrom}, transparent)` }} />
        </div>

        {/* Avatar preview */}
        <div className="flex flex-col items-center -mt-8 pb-2 px-5 relative z-10">
          <div className="w-16 relative h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center">
            {hasAvatar && !previewError ? (
              <Image
                src={form.avatar!}
                alt={form.username}
                fill
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setPreviewError(true)}
              />
            ) : !hasAvatar ? (
              <Image
                src={dicebear}
                alt={form.username}
                fill
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  (el.nextElementSibling as HTMLElement)!.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-full h-full items-center justify-center hidden text-white font-bold text-xl"
              style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
            >
              {initial}
            </div>
          </div>
          {/* ✅ hint for admin */}
          {adminOnly && (
            <p className="text-[10px] text-gray-400 mt-1.5">Paste image URL below to update photo</p>
          )}
        </div>

        <DialogHeader className="px-5 pb-1 text-center">
          <DialogTitle className="text-sm font-semibold text-gray-900">
            {adminOnly ? "Edit admin profile" : "Edit student"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            Updating <span className="font-medium text-gray-600">{form.username}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mx-5 mt-3 mb-1 h-px bg-gray-100" />

        {error && (
          <div className="mx-5 mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
            <AlertCircle size={13} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-500 font-medium leading-snug">{error}</p>
          </div>
        )}

        <div className="px-5 pt-3 pb-1 space-y-3">
          {fields.map(({ id, label, icon: Icon, type = "text", placeholder }) => (
            <div key={id} className="space-y-1">
              <Label
                htmlFor={id}
                className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Icon size={10} /> {label}
              </Label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={String(form[id] ?? "")}
                onChange={(e) => {
                  setPreviewError(false); // reset preview on URL change
                  setForm((p) => p ? { ...p, [id]: e.target.value } : p);
                }}
                className="h-9 rounded-xl text-sm border-gray-200 bg-gray-50 focus:bg-white focus-visible:ring-1 focus-visible:ring-blue-200 transition-colors"
              />
            </div>
          ))}
        </div>

        <DialogFooter className="px-5 pt-4 pb-5 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
            className="flex-1 min-h-11 rounded-xl text-xs border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <X size={11} className="mr-1.5" /> Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 min-h-11 rounded-xl text-xs font-semibold text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
          >
            {saving
              ? <span className="animate-pulse">Saving…</span>
              : <><Check size={11} className="mr-1.5" /> Save changes</>
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}