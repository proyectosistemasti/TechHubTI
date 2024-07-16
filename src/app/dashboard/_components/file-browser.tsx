'use client';

import { api } from "../../../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
// import { UploadButton } from "@/app/upload-button";
import { UploadButton } from "./upload-button";
import { FileCard } from "@/app/dashboard/_components/file-card";
import Image from "next/image";
// import { SearchBar } from "@/app/search-bar";
import { SearchBar } from "./search-bar";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "./file-table";
import { columns } from "./columns";

function PlaceHolder() {
  return (
    <div className="flex flex-col items-center w-full gap-8 mt-12">
      <Image
        alt="an image of a directory icon"
        width={300}
        height={300}
        src="/empty.svg"
      />
      <div className="text-2xl">
        You have no files, upload one now
      </div>
      <UploadButton />
    </div>
  )
}

export function FileBrowser({ title, favoritesOnly, deletedOnly }: { title: string, favoritesOnly?: boolean, deletedOnly?: boolean }) {

  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  )

  const files = useQuery
    (api.files.getFiles,
      orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : 'skip');
  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col items-center w-full gap-8 mt-24">
          <Loader2 className="w-32 h-32 text-gray-500 animate-spin" />
          <div className="text-2xl">Loading your files...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          {files.length === 0 && <PlaceHolder />}

          <DataTable columns={columns} data={files} />

          <div className="grid grid-cols-4 gap-4">
            {files?.map((file) => {
              return (
                <FileCard favorites={favorites ?? []} key={file._id} file={file} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
