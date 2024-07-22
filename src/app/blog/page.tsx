import SingleBlog from "@/_components/Blog/SingleBlog";
import blogData from "@/_components/Blog/blogData";
import Breadcrumb from "@/_components/Common/Breadcrumb";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import { Providers } from "../provider";

const Blog = () => {
  return (
    <>
      <Providers>

        <Header />
        <Breadcrumb
          pageName="Equipo de trabajo"
          description="Nuestro departamento está conformado por 6 colaboradores incluyendo la Jefatura de HXA, nuestro horario esta dividido en  3 turnos que se encuentran distrubuidos de la siguiente manera: de 8:00 am a 4:00 pm, de 3:00 pm a 11:00 pm y de 10:00 pm a 6:00 am."
        />

        <section className="pt-[120px] pb-[120px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap justify-center">
              {blogData.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog blog={blog} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </Providers>
    </>
  );
};

export default Blog;
