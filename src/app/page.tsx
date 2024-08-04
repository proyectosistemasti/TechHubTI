import AboutSectionManuals from "@/_components/About/AboutSectionManuals";
import AboutSectionFormats from "@/_components/About/AboutSectionFormats";
import ScrollUp from "@/_components/Common/ScrollUp";
import Features from "@/_components/Features";
import Hero from "@/_components/Hero";
import Video from "@/_components/Video";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  redirect('/inicio');
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionManuals />
      <AboutSectionFormats />
    </>
  );
}
