import AboutSectionManuals from "@/_components/About/AboutSectionManuals";
import AboutSectionFormats from "@/_components/About/AboutSectionFormats";
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
import Testimonials from "@/_components/Testimonials";
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
        <AboutSectionManuals />
        <AboutSectionFormats />
        <Testimonials />
        <Footer />
      </Providers>
    </ConvexClientProvider>
  );
}
