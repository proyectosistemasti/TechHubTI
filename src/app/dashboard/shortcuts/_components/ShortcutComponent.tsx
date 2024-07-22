'use client';

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, MoreVertical, TrashIcon, Edit2, GridIcon, RowsIcon } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import Link from "next/link";

interface Shortcut {
  _id: Id<"shortcuts">;
  url: string;
  description?: string;
  title: string;
  password?: string;
  userId: Id<"users">;
  _creationTime: Date;
}

interface ShortcutComponentProps {
  shortcuts: Shortcut[];
}

export function ShortcutComponent({ shortcuts }: ShortcutComponentProps) {
  const createShortcut = useMutation(api.shortcuts.createShortcut);
  const deleteShortcut = useMutation(api.shortcuts.deleteShortcut);
  const updateShortcut = useMutation(api.shortcuts.updateShortcut);
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
  const [tab, setTab] = useState("list");

  function normalizeUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  return (
    <div>
      {/* Add Shortcut Dialog */}
      <AlertDialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Shortcut</AlertDialogTitle>
            <AlertDialogAction>
              Modify the title, description, and password for this shortcut.
            </AlertDialogAction>
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
                  url: normalizeUrl(url),
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
            <AlertDialogAction>
              Modify the title, description, and password for this shortcut.
            </AlertDialogAction>
          </AlertDialogHeader>
          <div className="p-4">
            <label className="block mb-2">
              URL:
              <Input
                value={editShortcut?.url || ""}
                onChange={(e) => {
                  if (editShortcut) {
                    setEditShortcut({ ...editShortcut, url: normalizeUrl(e.target.value) });
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
            <AlertDialogAction>
              Are you sure you want to delete this shortcut?
            </AlertDialogAction>
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
                  setIsConfirmOpen(false);
                  setEditShortcut(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Tabs for List and Grid Views */}
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList className="mb-2 gap-2">
          <TabsTrigger className="gap-2" value="list"><RowsIcon /> Table</TabsTrigger>
          <TabsTrigger className="gap-2" value="grid"><GridIcon /> Grid</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Table>
            <TableCaption>A list of your shortcuts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcuts.map((shortcut) => (
                <TableRow key={shortcut._id}>
                  <TableCell>{shortcut.title}</TableCell>
                  <TableCell>{shortcut.description}</TableCell>
                  <TableCell>
                    <a href={normalizeUrl(shortcut.url)} target="_blank" rel="noopener noreferrer">
                      {normalizeUrl(shortcut.url)}
                    </a>
                  </TableCell>
                  <TableCell>{formatRelative(shortcut._creationTime, new Date())}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditShortcut(shortcut);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditShortcut(shortcut);
                            setIsConfirmOpen(true);
                          }}
                        >
                          <TrashIcon className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {shortcuts.map((shortcut) => (
              <Card key={shortcut._id}>
                <CardHeader>
                  <CardTitle>{shortcut.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{shortcut.description}</p>
                  <Link href={normalizeUrl(shortcut.url)} target="_blank">
                    {normalizeUrl(shortcut.url)}
                  </Link>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditShortcut(shortcut);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => {
                      setEditShortcut(shortcut);
                      setIsConfirmOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={() => setIsAddOpen(true)}>Add Shortcut</Button>
    </div>
  );
}
