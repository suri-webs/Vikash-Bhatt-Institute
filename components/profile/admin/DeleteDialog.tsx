import { Trash2 } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from ".";

interface DeleteDialogProps {
    user: User | null;
    onClose: () => void;
    onConfirm: (u: User) => void;
}

export function DeleteDialog({ user, onClose, onConfirm }: DeleteDialogProps) {
    return (
        <AlertDialog open={!!user} onOpenChange={(open) => { if (!open) onClose(); }}>
            <AlertDialogContent className="rounded-2xl max-w-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-sm font-semibold">Delete student</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-gray-400">
                        Are you sure you want to remove{" "}
                        <span className="font-medium text-gray-600">{user?.username}</span>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel
                        onClick={onClose}
                        className="flex-1 rounded-md h-11 text-sm"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => user && onConfirm(user)}
                        className="flex-1 rounded-md text-white h-11 text-sm bg-red-600 hover:bg-red-700 gap-1.5"
                    >
                        <Trash2 size={12} /> Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}