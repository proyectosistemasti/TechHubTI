import Testimonials from "@/_components/Testimonials";
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
        <Testimonials/>
        <Footer />
      </Providers>
    </>
  );
};

export default AboutPage;