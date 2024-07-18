"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { BookOpen, CalendarCheck2, Clipboard, FileIcon, StarIcon, TrashIcon, TvMinimalPlay } from "lucide-react";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/files", label: "All Files", icon: FileIcon, colorClass: "text-blue-500", hoverClass: "hover:text-blue-700" },
    { href: "/dashboard/favorites", label: "Favorites", icon: StarIcon, colorClass: "text-yellow-400", hoverClass: "hover:text-yellow-400" },
    { href: "/dashboard/formats", label: "Formats", icon: Clipboard, colorClass: "text-green-500", hoverClass: "hover:text-green-500" },
    { href: "/dashboard/manuals", label: "Manuals", icon: BookOpen, colorClass: "text-teal-500", hoverClass: "hover:text-teal-700" },
    { href: "/dashboard/schedule", label: "Schedule", icon: CalendarCheck2, colorClass: "text-purple-500", hoverClass: "hover:text-purple-700" },
    { href: "/dashboard/video", label: "Video", icon: TvMinimalPlay, colorClass: "text-red-500", hoverClass: "hover:text-red-500" },
    { href: "/dashboard/trash", label: "Trash", icon: TrashIcon, colorClass: "text-red-600", hoverClass: "hover:text-red-600" }
  ];

  return (
    <div className="w-40 flex flex-col gap-4">
      {navItems.map(({ href, label, icon: Icon, colorClass, hoverClass }) => (
        <Link key={href} href={href}>
          <Button variant="link" className={clsx("flex gap-2", { [colorClass]: pathname.includes(href), [hoverClass]: true })}>
            <Icon className={clsx("transition-colors duration-200", { [colorClass]: pathname.includes(href), [hoverClass]: true })} /> {label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
