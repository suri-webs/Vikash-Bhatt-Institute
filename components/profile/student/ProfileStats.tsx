import { BookOpen, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  count: number;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
}

function StatCard({ count, label, icon, bgColor, iconBg }: StatCardProps) {
  return (
    <Card className={`${bgColor} rounded-2xl border shadow-none`}>
      <CardContent className="p-5 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <p className="text-3xl font-bold text-gray-900">{count}</p>
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>{icon}</div>
        </div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}

export function ProfileStats({ enrolled = 0, completed = 0 }: { enrolled?: number; completed?: number }) {
  return (
    <div className="grid grid-cols-2 max-sm:hidden gap-3">
      <StatCard count={enrolled}  label="Courses Enrolled"   icon={<BookOpen size={18} className="text-amber-500" />}   bgColor="bg-[#fef9ec] border-amber-100"   iconBg="bg-amber-100" />
      <StatCard count={completed} label="Courses Completed"  icon={<Award size={18} className="text-emerald-500" />}    bgColor="bg-[#f0fdf7] border-emerald-100" iconBg="bg-emerald-100" />
    </div>
  );
}