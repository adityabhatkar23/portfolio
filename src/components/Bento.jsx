import { skills } from "./skills";

const Bento = () => {
  return (
    <div className=" grid sm:grid-cols-3 grid-cols-1 gap-4 md:gap-2">
      <div className=" bg-neutral-950 rounded-2xl p-4 sm:col-span-2 sm:pb-6">
        <h1 className=" font-extrabold text-3xl mb-2">Who am I?</h1>
        <p className=" font-semibold text-lg text-neutral-300 ">
          Hi! I’m Aditya. I’m a student at VPKBIET, learning how to build
          software. <br />
          I enjoy creating things with code and trying out new ideas.
          <br />
          If you have a project I can help with, or just want to say hi — feel
          free to contact me!
        </p>
      </div>

      <div className=" bg-neutral-950 rounded-2xl overflow-hidden sm:col-span-1 sm:row-span-2">
        <img src="https://images.unsplash.com/photo-1632578810034-0642549a33a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdvbGZ8ZW58MHx8MHx8fDA%3D" />
      </div>

      <div className=" bg-slate-600 rounded-2xl p-4 col-span-1">
        <h1 className=" font-bold text-3xl text-center font-jetbrains-mono">
          “Student & Developer”
        </h1>
      </div>

      <div className=" bg-neutral-950 rounded-2xl p-4 sm:col-span-1 sm:row-span-2 flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl hover:cursor-pointer">👋🏼</h1>
        <h1 className=" text-slate-600 text-4xl font-black">Aditya</h1>
      </div>

      <div className=" bg-slate-600 rounded-2xl p-4 sm:col-span-1 sm:col-start-3">
        <h1 className=" font-bold text-3xl text-center p-">
          “The only way to do great work is to love what you do.”
        </h1>
      </div>

      <div className=" bg-neutral-950 rounded-2xl p-4 sm:col-span-1 sm:row-start-3 sm:row-span-2 flex flex-col gap-3">
        <h1 className=" font-bold text-3xl ">
          Technologies I have worked with
        </h1>
        <div className="grid grid-cols-3 gap-4 self-centerw-full h-full p-4">
          {skills.map((skill) => (
            <a
              key={skill.name}
              href={skill.href}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={skill.src}
                width="48"
                height="48"
                alt={skill.name}
                className="grayscale"
              />
            </a>
          ))}
        </div>
      </div>

      <div className=" bg-neutral-950 rounded-2xl p-4 sm:col-span-2 sm:col-start-2 sm:pb-12">
        <h1 className=" font-bold text-3xl">Education </h1>
        <p className=" font-semibold text-lg">
          B.TECH (AI-DS){" "}
          <span className=" text-sm text-neutral-500">(2023 - Today)</span>
          <p className=" text-lg text-neutral-300">
            Currently Pursuing B.TECH in Artificial Intelligence and Data
            Science from VPKBIET.
          </p>
        </p>
      </div>
    </div>
  );
};

export default Bento;
