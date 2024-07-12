import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";


export default function DashboadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="es">
    //   <body className={inter.className}>
    //     <ConvexClientProvider>
    //       <Toaster />
    //       <Header />
    //       {children}
    //     </ConvexClientProvider>
    //   </body>
    // </html>

    <main className="container pt-12 mx-auto">
      <div className="flex gap-8">
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
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
