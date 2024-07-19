// side-nav.tsx
'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { BookOpen, CalendarCheck2, Clipboard, FileIcon, GripIcon, LucidePaperclip, PaperclipIcon, StarIcon, TrashIcon, TvMinimalPlay } from "lucide-react";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true); // Toggle state

  const navItems = [
    { href: "/dashboard/files", label: "All Files", icon: FileIcon, colorClass: "text-blue-500", hoverClass: "hover:text-blue-500" },
    { href: "/dashboard/favorites", label: "Favorites", icon: StarIcon, colorClass: "text-yellow-300", hoverClass: "hover:text-yellow-300" },
    { href: "/dashboard/formats", label: "Formats", icon: Clipboard, colorClass: "text-green-500", hoverClass: "hover:text-green-500" },
    { href: "/dashboard/manuals", label: "Manuals", icon: BookOpen, colorClass: "text-teal-500", hoverClass: "hover:text-teal-500" },
    { href: "/dashboard/schedule", label: "Schedule", icon: CalendarCheck2, colorClass: "text-purple-500", hoverClass: "hover:text-purple-500" },
    { href: "/dashboard/video", label: "Video", icon: TvMinimalPlay, colorClass: "text-red-500", hoverClass: "hover:text-red-500" },
    { href: "/dashboard/others", label: "Others", icon: GripIcon, colorClass: "text-orange-500", hoverClass: "hover:text-orange-500" },
    { href: "/dashboard/shortcuts", label: "Shortcuts", icon: PaperclipIcon, colorClass: "text-cyan-400", hoverClass: "hover:text-cyan-400" },
    { href: "/dashboard/trash", label: "Trash", icon: TrashIcon, colorClass: "text-red-500", hoverClass: "hover:text-red-500" },
  ];

  return (
    <div className={clsx(
      "flex flex-col gap-4 md:w-64",
      "md:w-64 w-full",
      { "hidden": !isOpen, "block": isOpen }
    )}>
      <Button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">Toggle</Button>
      {navItems.map(({ href, label, icon: Icon, colorClass, hoverClass }) => (
        <Link key={href} href={href}>
          <Button
            variant="link"
            className={clsx(
              "flex gap-2 items-center p-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg",
              { [colorClass]: pathname.includes(href), [hoverClass]: true }
            )}
          >
            <Icon
              className={clsx(
                "transition-colors duration-300",
                { [colorClass]: pathname.includes(href), [hoverClass]: true }
              )}
            />
            {label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
