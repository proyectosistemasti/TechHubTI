import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ImageIcon,
  MoreVertical,
  TrashIcon,
  FileTextIcon,
  FileIcon,
  NotepadTextIcon,
  FileBarChart2,
  StarIcon,
  StarHalf,
  UndoIcon,
  Download,
  FileSpreadsheet, // Added for xlsx
  Presentation, // Added for pptx
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
import { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Protect } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from 'date-fns';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Componente para manejar las acciones del archivo
export function FileCardActions({ file, fileUrl, isFavorited }: { file: Doc<"files">; fileUrl: string | null; isFavorited: boolean; }) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const { toast } = useToast();
  const me = useQuery(api.users.getMe);
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
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === me?._id
              );
            }}
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

// Componente para mostrar la tarjeta del archivo
export function FileCard({ file }: { file: Doc<"files"> & { isFavorited: boolean } }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const url = useQuery(api.files.getFileUrl, { fileId: file.fileId });

  useEffect(() => {
    if (url) {
      setFileUrl(url);
    }
  }, [url]);

  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId
  });

  // Define icons for file types
  const typeIcons: Record<string, ReactNode> = {
    image: <ImageIcon />,
    pdf: <FileIcon />,
    csv: <FileBarChart2 />,
    doc: <FileTextIcon />,
    txt: <NotepadTextIcon />,
    xlsx: <FileSpreadsheet />, // Added for xlsx
    pptx: <Presentation />, // Added for pptx
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-base font-bold">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} fileUrl={fileUrl} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex items-center justify-center overflow-hidden">
        {file.type === "image" && fileUrl ? (
          <Image
            alt={file.name}
            src={fileUrl}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : file.type === "pdf" && fileUrl ? (
          <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js`}>
            <Viewer fileUrl={fileUrl} />
          </Worker>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {typeIcons[file.type]}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between flex-col gap-2 md:flex-row">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Avatar className="w-7 h-7">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-neutral-800">
          Uploaded {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
