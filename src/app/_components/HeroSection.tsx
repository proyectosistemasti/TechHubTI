'use client';

import Container from "./Container";

const HeroSection = () => (
  <div className="relative" id="home">
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
      <div className="blur-[106px] h-56 bg-gradient-to-br from-purple-800 to-indigo-900 dark:from-blue-700"></div>
      <div className="blur-[106px] h-32 bg-gradient-to-r from-purple-600 to-indigo-600 dark:to-indigo-800"></div>
    </div>
    <Container>
      <div className="relative ml-auto pt-36">
        <div className="mx-auto text-center lg:w-2/3">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl xl:text-7xl">Shaping a world with <span className="text-primary dark:text-white">reimagination.</span></h1>
          <p className="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
          <div className="flex flex-wrap justify-center mt-16 gap-y-4 gap-x-6">
            <a
              href="#"
              className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:bg-purple-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white"
              >Get started</span>
            </a>
            <a
              href="#"
              className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-purple-600/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span
                className="relative text-base font-semibold text-purple-600 dark:text-white"
              >Learn more</span>
            </a>
          </div>
          <div className="justify-between hidden py-8 mt-16 border-gray-100 border-y dark:border-gray-800 sm:flex">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-12 sm:grid-cols-4 md:grid-cols-6">
          <div className="p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/microsoft.svg" className="w-auto h-12 mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/airbnb.svg" className="w-auto h-12 mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="flex p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/google.svg" className="w-auto m-auto h-9" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/ge.svg" className="w-auto h-12 mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="flex p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/netflix.svg" className="w-auto h-8 m-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
          <div className="p-4 transition duration-200 grayscale hover:grayscale-0">
            <img src="./images/clients/google-cloud.svg" className="w-auto h-12 mx-auto" loading="lazy" alt="client logo" width="" height="" />
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default HeroSection;
