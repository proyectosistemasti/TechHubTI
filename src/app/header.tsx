import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";

export function Header() {
  return (
    <div className="py-4 border-b bg-gray-50">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          TechHub TI
        </div>
        <div className="flex gap-2">
        <OrganizationSwitcher/>
        <UserButton />
        <SignOutButton>
          <Button>
            Sign Out
          </Button>
        </SignOutButton>
        <SignInButton>
          <Button>
            Sign In
          </Button>
        </SignInButton>
        </div>
      </div>
    </div>
  )
}
