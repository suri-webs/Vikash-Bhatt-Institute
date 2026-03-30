import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "@/components/ui/common/AvatarDropdown";

interface User {
    id: string;
    username: string;
    gmail: string;
    role: string;
}

interface NavDesktopActionsProps {
    isLoggedIn: boolean;
    user: User | null;
    onEnquiryOpen: () => void;
    onLogoutOpen: () => void;
}

export function NavDesktopActions({ isLoggedIn, user, onEnquiryOpen, onLogoutOpen }: NavDesktopActionsProps) {
    const router = useRouter();

    return (
        <div className="hidden md:flex items-center gap-5">
            {isLoggedIn && user ? (
                <AvatarDropdown user={user} onLogout={onLogoutOpen} />
            ) : (
                <Button variant="outline" className="px-6 py-5" onClick={() => router.push("/login")}>
                    Login
                </Button>
            )}
        </div>
    );
}