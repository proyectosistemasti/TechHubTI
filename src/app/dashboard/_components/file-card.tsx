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
import { restoreFile } from '../../../../convex/files';

// Componente para manejar las acciones del archivo
export function FileCardActions({ file, isFavorited }: { file: Doc<"files">; isFavorited: boolean; }) {
  // Mutación para eliminar el archivo
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const userProfile = useMutation(api.users.getUserProfile);
  const { toast } = useToast(); // Hook para mostrar notificaciones
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Estado para el diálogo de confirmación

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
                await deleteFile({
                  fileId: file._id, // Eliminar el archivo usando su ID
                });
                toast({
                  variant: "default",
                  title: "File market for deletion",
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
            onClick={async () => {
              await toggleFavorite({
                fileId: file._id
              });

              toast({
                variant: "default",
                title: isFavorited ? "Removed from favorites" : "Added to favorites",
                description: isFavorited ? "The file was removed from your favorites" : "The file was added to your favorites",
              });
            }}
            className="flex gap-1 items-center cursor-pointer text-yellow-500"
          >
            {isFavorited ? (
              <div className="flex gap-1 items-center">
                <StarHalf className="w-5 h-5" /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-1 items-center">
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
                  restoreFile({
                    fileId: file._id
                  })
                } else {
                  setIsConfirmOpen(true)
                }
              }

              }
              className="flex gap-1 items-center cursor-pointer"
            >
              {file.shouldDelete ? (
                <div className="flex gap-1 text-lime-400 items-center cursor-pointer">
                  <UndoIcon className="w-5 h-5" /> Restore
                </div>
              ) : (
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
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
export function FileCard({ file, favorites }: { file: Doc<"files">, favorites: Doc<"favorites">[] }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Estado para la URL del archivo
  const url = useQuery(api.files.getFileUrl, { fileId: file.fileId }); // Consulta para obtener la URL del archivo

  useEffect(() => {
    if (url) {
      setFileUrl(url); // Actualizar el estado de la URL del archivo
    }
  }, [url]);

  // Iconos para diferentes tipos de archivos
  const typeIcons: Record<string, ReactNode> = {
    image: <ImageIcon />,
    pdf: <FileIcon />,
    csv: <FileBarChart2 />,
    doc: <FileTextIcon />,
    txt: <NotepadTextIcon />,
  };

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  )

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 items-center">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex items-center justify-center overflow-hidden">
        {file.type === "image" && fileUrl ? (
          <Image
            alt={file.name}
            src={fileUrl} // Mostrar la imagen usando la URL
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {typeIcons[file.type]}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => {
            if (fileUrl) {
              window.open(fileUrl, "_blank"); // Abrir el archivo en una nueva pestaña
            }
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
