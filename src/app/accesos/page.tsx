import Breadcrumb from "@/_components/Common/Breadcrumb";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import { Providers } from "../provider";
import AccesosDirectos from "@/_components/Accesos";

const AboutPage = () => {
  return (
    <>
      <Providers>
        <Header />
        <Breadcrumb
          pageName=""
          description=""
        />
        <AccesosDirectos/>
        <Footer />
      </Providers>
    </>
  );
};

export default AboutPage;
