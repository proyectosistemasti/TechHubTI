import Link from "next/link";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <div>FileDrive</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
            Privacy Policy
          </Link>
          <Link
            className="text-blue-900 hover:text-blue-500"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
          <Link className="text-blue-900 hover:text-blue-500" href="/manuals">
            Manuales
          </Link>
        </div>
      </div>
    </div>
  );
}
