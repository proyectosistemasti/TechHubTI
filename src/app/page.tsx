'use client';

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const {organization} = useOrganization();
  const files = useQuery(api.files.getFiles)
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button
        onClick={() => {
          createFile({
            name: 'Hello Worldddd'
          })
        }}>
        Click Me
      </Button>
    </main>
  );
}
