import { Doc } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  FileIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
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
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";

export function FileCardActions({ file, fileUrl, isFavorited }: { file: Doc<"files">; fileUrl: string | null; isFavorited: boolean; }) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File marked for deletion",
                  description: "Your file will be deleted soon",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              if (fileUrl) {
                window.open(fileUrl, "_blank");
              }
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-5 h-5 " /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={async () => {
              await toggleFavorite({ fileId: file._id });

              toast({
                variant: "default",
                title: isFavorited ? "Removed from favorites" : "Added to favorites",
                description: isFavorited ? "The file was removed from your favorites" : "The file was added to your favorites",
              });
            }}
            className="flex items-center gap-1 text-yellow-500 cursor-pointer"
          >
            {isFavorited ? (
              <div className="flex items-center gap-1">
                <StarHalf className="w-5 h-5" /> Unfavorite
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5" /> Favorite
              </div>
            )}
          </DropdownMenuItem>

          <Protect
            role="org:admin"
            fallback={<></>}
          >
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              {file.shouldDelete ? (
                <div className="flex items-center gap-1 cursor-pointer text-lime-400">
                  <UndoIcon className="w-5 h-5" /> Restore
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 cursor-pointer">
                  <TrashIcon className="w-5 h-5" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
