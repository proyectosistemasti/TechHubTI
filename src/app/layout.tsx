"use client";

import ScrollToTop from "@/_components/ScrollToTop";
import "../styles/index.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-black">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
