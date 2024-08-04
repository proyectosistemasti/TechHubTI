import Breadcrumb from "@/_components/Common/Breadcrumb";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import { Providers } from "../provider";
import Contactos from "@/_components/Contactos";

const AboutPage = () => {
  return (
    <>
      <Providers>
        <Header />
        <Breadcrumb
          pageName=""
          description=""
        />
        <Contactos/>
        <Footer />
      </Providers>
    </>
  );
};

export default AboutPage;