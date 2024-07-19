import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="relative z-10 py-4 border-b bg-gray-50">
      <div className="container flex items-center justify-between mx-auto flex-wrap">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/gpo-xcaret-1-300x89.png"
            alt="TechHub TI Logo"
            width={150}
            height={150}
          />
          TechHub TI
        </Link>
        <div className="flex gap-2 mt-2 md:mt-0">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
