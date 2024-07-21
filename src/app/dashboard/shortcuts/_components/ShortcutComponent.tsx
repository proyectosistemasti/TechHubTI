import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Edit2, TrashIcon, MoreVertical } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import Link from 'next/link';

interface Shortcut {
  _id: Id<"shortcuts">;
  url: string;
  description?: string;
  title: string;
  password?: string;
  userId: Id<"users">;
  _creationTime: Date;
}

export function ShortcutComponent() {
  const createShortcut = useMutation(api.shortcuts.createShortcut);
  const deleteShortcut = useMutation(api.shortcuts.deleteShortcut);
  const updateShortcut = useMutation(api.shortcuts.updateShortcut);

  const queryResult = useQuery(api.shortcuts.getShortcuts);

  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editShortcut, setEditShortcut] = useState<Shortcut | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Convertir _creationTime de number a Date
  const shortcuts = Array.isArray(queryResult)
    ? queryResult.map(shortcut => ({
      ...shortcut,
      _creationTime: new Date(shortcut._creationTime),
    }))
    : [];

  function normalizeUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

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
                await createShortcut({
                  url,
                  title,
                  description,
                  password
                });
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
              URL:
              <Input
                value={editShortcut?.url || ""}
                onChange={(e) => {
                  if (editShortcut) {
                    setEditShortcut({ ...editShortcut, url: e.target.value });
                  }
                }}
                className="mt-1"
                placeholder="Enter the URL"
              />
            </label>
            <label className="block mb-2">
              Title:
              <Input
                value={editShortcut?.title || ""}
                onChange={(e) => {
                  if (editShortcut) {
                    setEditShortcut({ ...editShortcut, title: e.target.value });
                  }
                }}
                className="mt-1"
                placeholder="Enter the title"
              />
            </label>
            <label className="block mb-2">
              Description:
              <Textarea
                value={editShortcut?.description || ""}
                onChange={(e) => {
                  if (editShortcut) {
                    setEditShortcut({ ...editShortcut, description: e.target.value });
                  }
                }}
                className="mt-1"
                placeholder="Enter a description"
              />
            </label>
            <label className="block mb-2 relative">
              Password (optional):
              <Input
                type={showPassword ? "text" : "password"}
                value={editShortcut?.password || ""}
                onChange={(e) => {
                  if (editShortcut) {
                    setEditShortcut({ ...editShortcut, password: e.target.value });
                  }
                }}
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
                if (editShortcut) {
                  await updateShortcut({
                    shortcutId: editShortcut._id,
                    url: editShortcut.url,
                    title: editShortcut.title,
                    description: editShortcut.description,
                    password: editShortcut.password
                  });
                  toast({
                    variant: "default",
                    title: "Shortcut updated",
                    description: "The shortcut was updated successfully.",
                  });
                }
                setIsEditOpen(false);
                setEditShortcut(null);
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this shortcut?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (editShortcut) {
                  await deleteShortcut({ shortcutId: editShortcut._id });
                  toast({
                    variant: "default",
                    title: "Shortcut deleted",
                    description: "The shortcut was deleted successfully.",
                  });
                }
                setIsConfirmOpen(false);
                setEditShortcut(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shortcuts</h1>
        <Button onClick={() => setIsAddOpen(true)}>Add Shortcut</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shortcuts.map((shortcut) => (
          <Card key={shortcut._id.toString()} className="relative overflow-hidden border border-gray-200 shadow-md rounded-lg">
            <CardHeader className="flex justify-between items-start p-4 bg-gray-50">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-800">{shortcut.title}</CardTitle>
                <p className="text-sm text-gray-500">{formatRelative(shortcut._creationTime, new Date())}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 text-gray-500 absolute top-2 right-2">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {
                    setEditShortcut(shortcut);
                    setIsEditOpen(true);
                  }}>
                    <Edit2 className="mr-2 w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setEditShortcut(shortcut);
                    setIsConfirmOpen(true);
                  }}>
                    <TrashIcon className="mr-2 w-4 h-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 bg-white">
              <p className="text-sm mb-2 text-gray-700 line-clamp-2">{shortcut.description}</p>
              <Link href={normalizeUrl(shortcut.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all block truncate">
                {shortcut.url}
              </Link>
              {shortcut.password && (
                <div className="flex items-center mt-2">
                  <span className="font-semibold mr-2">Password:</span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={shortcut.password}
                    readOnly
                    className="mr-2"
                  />
                  <Button variant="ghost" onClick={() => setShowPassword(!showPassword)} className="p-2 text-gray-500">
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 bg-gray-50">
              <p className="text-sm text-gray-500">{formatRelative(shortcut._creationTime, new Date())}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
