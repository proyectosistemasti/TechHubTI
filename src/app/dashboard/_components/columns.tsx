'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Doc, Id } from "../../../../convex/_generated/dataModel"
import { formatRelative } from "date-fns"
import { getUserProfile } from '../../../../convex/users';
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  })
  return (
    <div className="flex items-center w-40 gap-2 text-xs text-neutral-600">
      <Avatar className="w-7 h-7">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  )
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
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />
    },
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => {
      return <div>{formatRelative(new Date(row.original._creationTime), new Date())}</div>
    },
  }
]
