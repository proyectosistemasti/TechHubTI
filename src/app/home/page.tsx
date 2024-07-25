import AboutSectionOne from "@/_components/About/AboutSectionOne";
import AboutSectionTwo from "@/_components/About/AboutSectionTwo";
import ScrollUp from "@/_components/Common/ScrollUp";
import Features from "@/_components/Features";
import Hero from "@/_components/Hero";
import Video from "@/_components/Video";
import { Inter } from "next/font/google";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import { Providers } from "../provider";
import ScheduleImage from "@/_components/Schedule/schedule";
import ConvexClientProvider from "../ConvexClientProvider";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ConvexClientProvider>
      <Providers>
        <Header />
        <ScrollUp />
        <Hero />
        {/* <ScheduleImage /> */}
        <Features />
        <Video />
        <AboutSectionOne />
        <AboutSectionTwo />
        <Footer />
      </Providers>
    </ConvexClientProvider>
  );
}
