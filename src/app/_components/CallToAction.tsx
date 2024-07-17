import Container from "./Container";

const CallToAction = () => (
  <div className="relative py-16">
    {/* Fondo con degradado y efecto de espacio */}
    <div className="absolute inset-0 grid w-full grid-cols-2 m-auto h-max -space-x-52 opacity-40 dark:opacity-20">
      <div className="blur-[106px] h-56 bg-gradient-to-br from-purple-800 to-purple-400 dark:from-blue-700"></div>
      <div className="blur-[106px] h-32 bg-gradient-to-r from-indigo-600 to-cyan-400 dark:to-indigo-600"></div>
    </div>

    {/* Contenido centrado en un contenedor */}
    <Container>
      <div className="relative">
        {/* Imágenes de avatares */}
        <div className="flex items-center justify-center -space-x-2">
          <img
            loading="lazy"
            width="400"
            height="400"
            src="./images/avatars/avatar.webp"
            alt="member photo"
            className="object-cover w-8 h-8 rounded-full"
          />
          {/* Agrega más imágenes de avatares si es necesario */}
        </div>

        {/* Texto principal */}
        <div className="m-auto mt-6 space-y-6 md:w-8/12 lg:w-7/12">
          <h1 className="text-4xl font-bold text-center text-purple-400 dark:text-white md:text-5xl">Get Started now</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300">
            Be part of millions of people around the world using Tailus in modern User Interfaces.
          </p>

          {/* Botones de llamada a la acción */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="relative flex items-center justify-center w-full h-12 px-8 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-purple-600 before:to-purple-400 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white dark:text-dark">Get Started</span>
            </a>
            <a
              href="#"
              className="relative flex items-center justify-center w-full h-12 px-8 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-purple-600 before:to-indigo-600 before:border before:border-transparent before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white dark:text-white">More about</span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default CallToAction;
