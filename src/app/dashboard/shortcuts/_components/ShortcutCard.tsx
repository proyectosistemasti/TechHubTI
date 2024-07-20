// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Edit2,
//   TrashIcon,
//   MoreVertical,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { useToast } from "@/components/ui/use-toast";
// import { Protect } from "@clerk/nextjs";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// // Componente para manejar las acciones del shortcut
// function ShortcutCardActions({ shortcut, isFavorited }: { shortcut: Shortcut; isFavorited: boolean }) {
//   const deleteShortcut = useMutation(api.shortcuts.deleteShortcut);
//   const updateShortcut = useMutation(api.shortcuts.updateShortcut);

//   const { toast } = useToast();
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [title, setTitle] = useState(shortcut.title || "");
//   const [description, setDescription] = useState(shortcut.description || "");
//   const [password, setPassword] = useState(shortcut.password || "");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <>
//       <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Edit Shortcut</AlertDialogTitle>
//             <AlertDialogDescription>
//               Modify the title, description, and password for this shortcut.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <CardContent>
//             <label className="block mb-2">
//               Title:
//               <Input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter the title"
//               />
//             </label>
//             <label className="block mb-2">
//               Description:
//               <Textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter a description"
//               />
//             </label>
//             <label className="block mb-2 relative">
//               Password (optional):
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 pr-10"
//                 placeholder="Enter a password (optional)"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center px-3"
//               >
//                 {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//               </button>
//             </label>
//           </CardContent>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setIsEditOpen(false)}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={async () => {
//                 await updateShortcut({ shortcutId: shortcut._id, url: shortcut.url, description, title, password });
//                 toast({
//                   variant: "default",
//                   title: "Shortcut updated",
//                   description: "The shortcut was updated successfully.",
//                 });
//                 setIsEditOpen(false);
//               }}
//             >
//               Save
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action will permanently delete the shortcut.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={async () => {
//                 await deleteShortcut({ shortcutId: shortcut._id });
//                 toast({
//                   variant: "default",
//                   title: "Shortcut deleted",
//                   description: "The shortcut was deleted successfully.",
//                 });
//               }}
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <MoreVertical />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem
//             onClick={() => setIsEditOpen(true)}
//             className="flex items-center gap-1 cursor-pointer"
//           >
//             <Edit2 className="w-5 h-5" /> Edit
//           </DropdownMenuItem>

//           <Protect role="org:admin" fallback={<></>}>
//             <DropdownMenuItem
//               onClick={() => setIsConfirmOpen(true)}
//               className="flex items-center gap-1 text-red-600 cursor-pointer"
//             >
//               <TrashIcon className="w-5 h-5" /> Delete
//             </DropdownMenuItem>
//           </Protect>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// }

// // Componente para mostrar la tarjeta del shortcut
// export function ShortcutCard({ shortcut }: { shortcut: Shortcut }) {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="relative">
//         <CardTitle className="text-lg font-bold">{shortcut.title || "Untitled Shortcut"}</CardTitle>
//         <div className="absolute top-2 right-2">
//           <ShortcutCardActions shortcut={shortcut} isFavorited={false} />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <p className="text-sm text-neutral-600">{shortcut.description || "No description available"}</p>
//         {shortcut.password && (
//           <div className="mt-2 text-xs text-neutral-500">
//             <span>Password protected</span>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between text-xs text-neutral-800">
//         <div className="flex items-center gap-2">
//           <span>Created:</span>
//           <span>{new Date().toLocaleDateString()}</span>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
