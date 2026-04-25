import { LucideIcon } from "lucide-react";

interface StatTileProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  pill?: string;
  pillStyle?: string;
  dashed?: boolean;
  onClick?: () => void;
}

export function StatTile({ icon: Icon, iconBg, iconColor, label, value, pill, pillStyle, dashed, onClick }: StatTileProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 rounded-2xl bg-white ${
        dashed
          ? "border border-dashed border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
          : "border border-gray-100 hover:border-gray-200 transition-colors"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={16} className={iconColor} />
        </div>
        {pill && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${pillStyle}`}>
            {pill}
          </span>
        )}
      </div>
      <div>
        <p className={`font-semibold leading-none mb-1 ${dashed ? "text-sm text-gray-400" : "text-xl text-gray-900"}`}>
          {value}
        </p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}