import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// ── Profile Card Skeleton ──────────────────────────────────────────────────
function ProfileCardSkeleton() {
  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Skeleton className="w-[72px] h-[72px] rounded-lg shrink-0" />

          {/* Name / email / badge row */}
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-3.5 w-44 rounded-md" />
            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Result Card Skeleton ───────────────────────────────────────────────────
function ResultCardSkeleton() {
  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl">
      <CardContent className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-28 rounded-xl" />
      </CardContent>
    </Card>
  );
}

// ── Field Skeleton ─────────────────────────────────────────────────────────
function FieldSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-3.5 w-24 rounded-md" />
      <Skeleton className={`w-full rounded-xl ${tall ? "h-24" : "h-11"}`} />
    </div>
  );
}

// ── Personal Info Skeleton ─────────────────────────────────────────────────
function PersonalInfoSkeleton() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="h-3 w-36 rounded-md" />
      </div>
      <div className="space-y-4">
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        {/* Date of Birth */}
        <FieldSkeleton />
      </div>
    </div>
  );
}

// ── Additional Info Skeleton ───────────────────────────────────────────────
function AdditionalInfoSkeleton() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="h-3 w-36 rounded-md" />
      </div>
      <div className="space-y-4">
        {/* Location — taller box */}
        <FieldSkeleton tall />
        {/* Bio — taller box */}
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-16 rounded-md" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Admin Skeleton (stat tiles + search + cards) ───────────────────────────
function AdminSkeleton() {
  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-gray-100">
            <div className="flex items-start justify-between">
              <Skeleton className="w-9 h-9 rounded-xl" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-12 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3">
        <Skeleton className="w-4 h-4 rounded-full shrink-0" />
        <Skeleton className="flex-1 h-4 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Student cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
            {/* Card header */}
            <div className="flex items-start justify-between p-5 pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
              </div>
              <Skeleton className="w-7 h-7 rounded-lg" />
            </div>

            {/* Status badge */}
            <div className="px-5 pb-3">
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-100 mx-0" />

            {/* Info rows */}
            <div className="px-5 py-3 flex flex-col gap-2">
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3.5 w-3/4 rounded-md" />
              <Skeleton className="h-3.5 w-1/2 rounded-md" />
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-100" />

            {/* CTA button */}
            <div className="px-4 py-3">
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Composed full-page skeleton ────────────────────────────────────────────
export function ProfileSkeleton({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <section className="my-20 px-6 py-12">
      <div className={`${isAdmin ? "max-w-[90%]" : "max-w-[85%]"} max-sm:max-w-full mx-auto`}>

        {/* Page header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-7 w-36 rounded-md" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
            <ProfileCardSkeleton />
            {!isAdmin && <ResultCardSkeleton />}
          </div>

          {/* Right column */}
          {isAdmin ? (
            <AdminSkeleton />
          ) : (
            <Card className="flex-1 min-w-0 border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <PersonalInfoSkeleton />
                  <AdditionalInfoSkeleton />
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </section>
  );
}