import AboutSectionManuals from "@/_components/About/AboutSectionManuals";
import Breadcrumb from "@/_components/Common/Breadcrumb";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import { Providers } from "../provider";

const AboutPage = () => {
  return (
    <>
      <Providers>
        <Header />
        <Breadcrumb
          pageName=""
          description=""
        />
        <AboutSectionManuals />
        <Footer />
      </Providers>
    </>
  );
};

export default AboutPage;
