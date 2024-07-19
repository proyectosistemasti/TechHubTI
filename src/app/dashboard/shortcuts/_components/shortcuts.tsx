// shortcuts.tsx

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Protect } from "@clerk/nextjs";
import {
  Edit2,
  TrashIcon,
  MoreVertical,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Define the type for the shortcut prop
interface Shortcut {
  _id: string;
  description?: string;
}

interface ShortcutActionsProps {
  shortcut: Shortcut;
}

export function ShortcutActions({ shortcut }: ShortcutActionsProps) {
  const deleteShortcut = useMutation(api.shortcuts.deleteShortcut);
  const updateShortcut = useMutation(api.shortcuts.updateShortcut);

  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [description, setDescription] = useState(shortcut.description || "");

  return (
    <>
      {/* Edit Shortcut Dialog */}
      <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Shortcut</AlertDialogTitle>
            <AlertDialogDescription>
              Modify the description for this shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsEditOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await updateShortcut({ shortcutId: shortcut._id, description });
                toast({
                  variant: "default",
                  title: "Shortcut updated",
                  description: "The shortcut description was updated successfully.",
                });
                setIsEditOpen(false);
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteShortcut({ shortcutId: shortcut._id });
                toast({
                  variant: "default",
                  title: "Shortcut deleted",
                  description: "The shortcut was deleted successfully.",
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-5 h-5" /> Edit
          </DropdownMenuItem>

          <Protect
            role="org:admin"
            fallback={<></>}
          >
            <DropdownMenuItem
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-1 text-red-600 cursor-pointer"
            >
              <TrashIcon className="w-5 h-5" /> Delete
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
