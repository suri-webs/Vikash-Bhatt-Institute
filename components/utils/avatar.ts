const AVATAR_PALETTE = [
  { bg: "bg-blue-50   border-blue-100",     text: "text-blue-700"   },
  { bg: "bg-violet-50 border-violet-100",   text: "text-violet-700" },
  { bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-50  border-amber-100",    text: "text-amber-700"  },
  { bg: "bg-rose-50   border-rose-100",     text: "text-rose-700"   },
  { bg: "bg-cyan-50   border-cyan-100",     text: "text-cyan-700"   },
];

export function avatarStyle(name: string) {
  return AVATAR_PALETTE[(name?.charCodeAt(0) ?? 65) % AVATAR_PALETTE.length];
}