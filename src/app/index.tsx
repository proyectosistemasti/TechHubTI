import React from 'react';
// import Features from '../components/Features';
// import HeroSection from '../components/HeroSection';
// import Layout from '../layouts/Layout';
// import Testimonials from '../components/Testimonials';
// import CallToAction from '../components/CallToAction';
// import Blog from '../components/Blog';
// import Stats from '../components/Stats';
import Features from './_components/Features';
import HeroSection from './_components/HeroSection';
import Layout from './Layout2';
import Testimonials from './_components/Testimonials';
import CallToAction from './_components/CallToAction';
import Blog from './_components/Blog';
import Stats from './_components/Stats';

const HomePage = () => {
  return (
    <Layout>
      <main className="mb-40 space-y-40">
        <HeroSection />
        <Features />
        <Stats />
        <Testimonials />
        <CallToAction />
        <Blog />
      </main>
      <title>Welcome to Astrolus.</title>
    </Layout>
  );
};

export default HomePage;
