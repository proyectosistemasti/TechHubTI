'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";
import { useEffect, useState } from "react";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, { userId });
  return (
    <div className="flex items-center w-40 gap-2 text-xs text-neutral-600">
      <Avatar className="w-7 h-7">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

function FileCardActionsWrapper({ file }: { file: Doc<"files"> }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const url = useQuery(api.files.getFileUrl, { fileId: file.fileId });

  useEffect(() => {
    if (url) {
      setFileUrl(url);
    }
  }, [url]);

  return <FileCardActions file={file} isFavorited={false} fileUrl={fileUrl} />;
}

export const columns: ColumnDef<Doc<"files">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => <UserCell userId={row.original.userId} />,
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => (
      <div>{formatRelative(new Date(row.original._creationTime), new Date())}</div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <FileCardActionsWrapper file={row.original}/>
      </div>
    ),
  },
];
