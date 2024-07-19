"use client";

import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import ScrollToTop from "@/_components/ScrollToTop";
// import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-black">
        {/* <Providers> */}
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          <ScrollToTop />
        {/* </Providers> */}
      </body>
    </html>
  );
}
