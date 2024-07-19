import AboutSectionOne from "@/_components/About/AboutSectionOne";
import AboutSectionTwo from "@/_components/About/AboutSectionTwo";
import Blog from "@/_components/Blog";
import Brands from "@/_components/Brands";
import ScrollUp from "@/_components/Common/ScrollUp";
import Contact from "@/_components/Contact";
import Features from "@/_components/Features";
import Hero from "@/_components/Hero";
import Pricing from "@/_components/Pricing";
import Testimonials from "@/_components/Testimonials";
import Video from "@/_components/Video";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  redirect('/home');
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
