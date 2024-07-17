'use client'
import React, { ReactNode } from "react";
import Head from "next/head";
import AppFooter from "./_components/AppFooter";
import AppHeader from './_components/AppHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content="Astro" />
        <meta name="description" content="Template built with tailwindcss using Tailus blocks v2" />
        <title>Tailus astro theme</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppHeader />
      {children}
      <AppFooter />
      <style jsx global>{`
        html {
          font-family: Urbanist, sans-serif;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Layout;
