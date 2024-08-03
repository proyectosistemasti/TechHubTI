import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (

      <footer
        className="wow fadeInUp relative z-6 pt-2 md:pt-4 lg:pt-5 mb-8"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-2 flex flex-grow my-7">
            <div className="w-full px-2 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="max-w-[400px]">
                <Link href="https://www.grupoxcaret.com/es/" className="inline-block">
                  <Image
                    src="/images/footer/hxa.svg"
                    alt="logo"
                    width={140}
                    height={30}
                    className="w-full dark:hidden"
                  />
                  <Image
                    src="/HXA.png"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={140}
                    height={30}
                  />
                </Link>
                <p className="mb-9 text-base font-medium leading-relaxed text-body-color">
                  En grupo Xcaret estamos comprometidos con el planeta y con nuestro gran amor por México.
                </p>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/hotelxcaretmexico/"
                    aria-label="social-link"
                    className="mr-6 text-[#CED3F6] hover:text-primary"
                  >
                    <svg
                      width="9"
                      height="18"
                      viewBox="0 0 9 18"
                      className="fill-current"
                    >
                      <path d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58064 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5 0.65382 10.5H2.25205H2.73636V11.0645V16.7379C2.73636 17.1331 3.00273 17.5 3.39018 17.5H5.66644C5.81174 17.5 5.93281 17.4153 6.02968 17.3024C6.12654 17.1895 6.19919 16.9919 6.19919 16.8226V11.0927V10.5282H6.70771H7.79741C8.11222 10.5282 8.35437 10.3024 8.4028 9.96371V9.93548V9.90726L8.74182 7.95968C8.76604 7.7621 8.74182 7.53629 8.59653 7.31048C8.54809 7.16935 8.33016 7.02823 8.13643 7Z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    aria-label="social-link"
                    className="mr-6 text-[#CED3F6] hover:text-primary"
                  >
                  </a>
                  <a
                  href="https://www.instagram.com/hotelxcaretarte/"
                  aria-label="Instagram"
                  className="mr-6 text-[#CED3F6] hover:text-primary"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.313.974.974 1.25 2.24 1.312 3.607.059 1.268.07 1.648.07 4.851s-.011 3.584-.07 4.851c-.062 1.367-.337 2.633-1.312 3.608-.974.974-2.24 1.25-3.608 1.312-1.268.059-1.648.07-4.851.07s-3.584-.011-4.851-.07c-1.367-.062-2.633-.337-3.608-1.312-.974-.974-1.25-2.24-1.312-3.608-.059-1.267-.07-1.647-.07-4.851s.011-3.584.07-4.851c.062-1.367.337-2.633 1.312-3.608.974-.974 2.24-1.25 3.608-1.312 1.267-.059 1.647-.07 4.851-.07zm0-2.163c-3.259 0-3.67.014-4.947.072-1.467.062-2.937.352-4.051 1.467-1.114 1.115-1.405 2.584-1.467 4.051-.058 1.277-.072 1.688-.072 4.947s.014 3.67.072 4.947c.062 1.467.352 2.937 1.467 4.051 1.115 1.115 2.584 1.405 4.051 1.467 1.277.058 1.688.072 4.947.072s3.67-.014 4.947-.072c1.467-.062 2.937-.352 4.051-1.467 1.115-1.115 1.405-2.584 1.467-4.051.058-1.277.072-1.688.072-4.947s-.014-3.67-.072-4.947c-.062-1.467-.352-2.937-1.467-4.051-1.115-1.115-2.584-1.405-4.051-1.467-1.277-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.163 2.76-6.163 6.163s2.76 6.163 6.163 6.163 6.163-2.76 6.163-6.163-2.76-6.163-6.163-6.163zm0 10.327c-2.296 0-4.163-1.867-4.163-4.163s1.867-4.163 4.163-4.163 4.163 1.867 4.163 4.163-1.867 4.163-4.163 4.163zm6.406-11.845c-.796 0-1.438-.642-1.438-1.438s.642-1.438 1.438-1.438 1.438.642 1.438 1.438-.642 1.438-1.438 1.438z"/>
                  </svg>
                </a>

                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12 flex justify-center items-center">
              <div className="mb-12 lg:mb-16">
                <a href="https://www.hotelxcaret.com/es/hotel-xcaret-mexico/">
                  <img
                    src="/images/footer/hxm.svg"
                    alt="Imagen del Hotel Xcaret México"
                    className="mb-2 w-40 items-center bg-white"
                  />
                </a>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12 flex justify-center items-center">
              <div className="mb-12 lg:mb-16">
                <a href="https://www.lacasadelaplaya.com/es/">
                  <img
                    src="/images/footer/casa-playa.svg"
                    alt="Imagen del Hotel Xcaret México"
                    className="mb-2 w-20 items-center bg-white"
                  />
                </a>
              </div>
            </div>
          </div>
        
        </div>
        <div className="bg-primary/10 w-full">
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-0 bottom-24 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="bg-white w-full bottom-0 dark:bg-black ">
        <div className="flex justify-between items-center mx-auto container px-4">
          <p className="text-gray-500 text-sm dark:text-white ">
            &copy; {new Date().getFullYear()} Grupo Xcaret. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            <a href="https://www.hotelxcaretarte.com/es/aviso-de-privacidad/" className="text-gray-500 hover:text-gray-700 dark:text-white ">
              Aviso de Privacidad
            </a>
          </p>
        </div>
      </div>
        
      </footer>
      

  );
};

export default Footer;
