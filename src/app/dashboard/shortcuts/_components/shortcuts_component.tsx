import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Protect } from "@clerk/nextjs";
import { Edit2, TrashIcon, MoreVertical, Eye, EyeOff } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "../../../../../convex/_generated/dataModel";

// Define the type for the shortcut prop
interface Shortcut {
  _id: Id<"shortcuts">;
  url: string;
  description?: string;
  title?: string;
  password?: string;
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
  const [title, setTitle] = useState(shortcut.title || "");
  const [description, setDescription] = useState(shortcut.description || "");
  const [password, setPassword] = useState(shortcut.password || "");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <>
      {/* Edit Shortcut Dialog */}
      <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Shortcut</AlertDialogTitle>
            <AlertDialogDescription>
              Modify the title, description, and password for this shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <label className="block mb-2">
              Title:
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                placeholder="Enter the title"
              />
            </label>
            <label className="block mb-2">
              Description:
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                placeholder="Enter a description"
              />
            </label>
            <label className="block mb-2 relative">
              Password (optional):
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 pr-10"
                placeholder="Enter a password (optional)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsEditOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await updateShortcut({ shortcutId: shortcut._id, url: shortcut.url, description, title, password });
                toast({
                  variant: "default",
                  title: "Shortcut updated",
                  description: "The shortcut was updated successfully.",
                });
                setIsEditOpen(false);
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Deletion Dialog */}
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

          <Protect role="org:admin" fallback={<></>}>
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

export function ShortcutsComponent() {
  const createShortcut = useMutation(api.shortcuts.createShortcut);
  const queryResult = useQuery(api.shortcuts.getShortcuts);

  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle loading and error states
  const shortcuts = Array.isArray(queryResult) ? queryResult : [];

  return (
    <div className="p-4">
      {/* Add Shortcut Dialog */}
      <AlertDialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Shortcut</AlertDialogTitle>
            <AlertDialogDescription>
              Provide the URL, title, description, and optional password for the new shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <label className="block mb-2">
              URL:
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
                placeholder="Enter the URL"
              />
            </label>
            <label className="block mb-2">
              Title:
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                placeholder="Enter the title"
              />
            </label>
            <label className="block mb-2">
              Description:
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                placeholder="Enter a description"
              />
            </label>
            <label className="block mb-2 relative">
              Password (optional):
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 pr-10"
                placeholder="Enter a password (optional)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAddOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await createShortcut({ url, title, description, password });
                toast({
                  variant: "default",
                  title: "Shortcut created",
                  description: "The shortcut was created successfully.",
                });
                setIsAddOpen(false);
                setUrl("");
                setTitle("");
                setDescription("");
                setPassword("");
              }}
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={() => setIsAddOpen(true)}
        className="mb-4 bg-blue-600 text-white hover:bg-blue-700"
      >
        Add Shortcut
      </Button>

    </div>
  );
}
