'use client';
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

  return (
    <main className="container pt-12 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>

      {files && files.length === 0 &&
        <div className="flex flex-col items-center w-full gap-4 mt-12">
          <Image
            alt="an image of a directory icon"
            width={300}
            height={300}
            src="/empty.svg"
          />
          <div className="text-2xl">
            You have no files, upload one now
          </div>
        </div>
      }

      <div className="grid grid-cols-4 gap-4">

        {files?.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>
    </main>
  );
}
