"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";


export function SideNav() {
  return (
      <div className="w-40 flex flex-col gap-4">
        <Link href="/dashboard/files">
          <Button variant={"link"} className="flex gap-2">
            <FileIcon /> All Files
          </Button>
        </Link>

        <Link href="/dashboard/favorites">
          <Button variant={"link"} className="flex gap-2">
            <StarIcon /> Favorites
          </Button>
        </Link>

        <Link href="/trash">
          <Button variant={"link"} className="flex gap-2">
            <TrashIcon /> Trash
          </Button>
        </Link>
      </div>
  )
}
