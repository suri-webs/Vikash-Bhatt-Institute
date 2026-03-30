import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// ── Left column skeletons ──────────────────────────────────────────────────

function ProfileCardSkeleton() {
    return (
        <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardContent className="p-5">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Skeleton className="w-18 h-18 rounded-xl shrink-0" />

                    {/* Name / email / badge row */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-3.5 w-44 rounded-md" />

                        <div className="flex items-center justify-between mt-2.5">
                            {/* Badge */}
                            <Skeleton className="h-6 w-28 rounded-full" />
                            {/* Edit button */}
                            <Skeleton className="h-7 w-16 rounded-lg" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ProfileStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
                <Card key={i} className="rounded-2xl border shadow-none">
                    <CardContent className="p-5 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                        <Skeleton className="h-3 w-24 rounded-md" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// ── Field skeleton (label + input box) ────────────────────────────────────

function FieldSkeleton({ wide = false }: { wide?: boolean }) {
    return (
        <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-24 rounded-md" />
            <Skeleton className={`h-11 rounded-xl ${wide ? "min-h-24" : ""} w-full`} />
        </div>
    );
}

// ── Right panel skeletons ──────────────────────────────────────────────────

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
                <div className="my-1 h-px bg-gray-100" />
                <FieldSkeleton />
                <FieldSkeleton />
                {/* Date of Birth */}
                <FieldSkeleton />
            </div>
        </div>
    );
}

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
                <FieldSkeleton wide />
                {/* Bio — taller box */}
                <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-16 rounded-md" />
                    <Skeleton className="h-28 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

// ── Composed full-page skeleton ────────────────────────────────────────────

export function ProfileSkeleton() {
    return (
        <section className="my-20 h-screen px-6 py-12">
            <div className="max-w-[85%] mx-auto">

                {/* Page header */}
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-7 w-36 rounded-md" />
                    <Skeleton className="h-3.5 w-72 rounded-md" />
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* Left column */}
                    <div className="flex flex-col gap-4 w-full lg:w-100 shrink-0">
                        <ProfileCardSkeleton />
                        <ProfileStatsSkeleton />
                    </div>

                    {/* Right column */}
                    <Card className="flex-1 min-w-0 border-gray-100 shadow-sm rounded-2xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <PersonalInfoSkeleton />
                                <AdditionalInfoSkeleton />
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}

