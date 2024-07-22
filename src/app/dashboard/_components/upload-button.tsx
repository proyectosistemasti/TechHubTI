'use client';

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

// Define file categories as a literal union type
const fileCategories = ["manual", "format", "schedule", "video", "other"] as const;
type FileCategory = typeof fileCategories[number];

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
  category: z.enum(fileCategories).optional() // Allow undefined as a valid option
});

export function UploadButton() {
  const organization = useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
      category: undefined // Use undefined as initial value for category
    },
  });

  const fileRef = form.register("file");

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
      orgId = organization.organization?.id ?? user.user?.id;
    }

    if (!orgId) return;

    setIsLoading(true);

    try {
      const postUrl = await generateUploadUrl();

      const file = values.file[0];
      const fileType = file.type;

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": fileType },
        body: file,
      });

      const { storageId } = await result.json();

      const types = {
        "image/png": "image",
        "image/jpg": "image",
        "image/jpeg": "image",
        "application/pdf": "pdf",
        "text/csv": "csv",
        "application/msword": "doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "doc",
        "text/plain": "txt"
      } as Record<string, Doc<"files">["type"]>;

      const fileTypeKey = types[fileType];

      // Validar si es un archivo de tipo schedule
      if (values.category === "schedule" && !fileType.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Schedule files must be images.",
        });
        setIsLoading(false);
        return;
      }

      try {
        await createFile({
          name: values.title,
          fileId: storageId,
          orgId,
          type: fileTypeKey,
          category: values.category as FileCategory
        });

        form.reset();
        setIsFileDialogOpen(false);

        toast({
          variant: "success",
          title: "File Uploaded",
          description: "Now everyone can view your file",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Your file could not be uploaded, try again later"
        });
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "An error occurred while uploading, try again later"
      });
      setIsLoading(false);
    }
  }
  
  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}>
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>
            This file will be accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange }, ...field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} onChange={(e) => onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select {...field} className="input">
                      <option value="">Select Category</option>
                      {fileCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex gap-1"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
