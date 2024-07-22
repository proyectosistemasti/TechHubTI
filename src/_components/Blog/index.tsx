import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section id="blog" className="bg-primary/5 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Equipo de trabajo"
          paragraph="Nuestro departamento está conformado por 6 colaboradores incluyendo la Jefatura de HXA, nuestro horario esta dividido en  3 turnos que se encuentran distrubuidos de la siguiente manera: de 8:00 am a 4:00 pm, de 3:00 pm a 11:00 pm y de 10:00 pm a 6:00 am."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
