import AboutSectionOne from "@/_components/About/AboutSectionOne";
import AboutSectionTwo from "@/_components/About/AboutSectionTwo";
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
          pageName="Manuales y Formatos"
          description="Los formatos y manuales que se encuentran en esta sección le serán de utilidad para la instalación  y configuraciones de ciertas aplicaciones utilizadas en HXA."
        />
        <AboutSectionOne />
        <AboutSectionTwo />
        <Footer />
      </Providers>
    </>
  );
};

export default AboutPage;
