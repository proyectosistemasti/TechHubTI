import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { SideNav } from "../side-nav";


export default function DashboardLayout({
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
        <SideNav />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
