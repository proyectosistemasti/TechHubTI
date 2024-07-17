import Breadcrumb from "@/_components/Common/Breadcrumb";
import Contact from "@/_components/Contact";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";

const ContactPage = () => {
  return (
    <>
      <Header/>
      <Breadcrumb
        pageName="Contact Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <Contact />
      <Footer/>
    </>
  );
};

export default ContactPage;
