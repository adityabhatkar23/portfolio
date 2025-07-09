import { skills } from "./skills";
import { motion } from "motion/react";
import TextScrambleComponent from "./Text";

const Bento = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div className="bg-zin grid sm:grid-cols-3 grid-cols-1 gap-4 ">
      <motion.div
        className=" shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-2 sm:pb-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className=" font-extrabold text-3xl mb-2">Who am I?</h1>
        <p className=" font-semibold text-lg text-neutral-300 ">
          Hi! I’m Aditya. I’m a student at VPKBIET, learning how to build
          software. <br />
          I enjoy creating things with code and trying out new ideas.
          <br />
          If you have a project I can help with, or just want to say hi — feel
          free to contact me!
        </p>
      </motion.div>

      <motion.div
        className=" shadow-neutral-800 shadow bg-neutral-950 rounded-2xl overflow-hidden sm:col-span-1 sm:row-span-2"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <img src="https://images.unsplash.com/photo-1632578810034-0642549a33a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdvbGZ8ZW58MHx8MHx8fDA%3D" />
      </motion.div>

      <motion.div
        className="shadow-slate-800 shadow bg-slate-600 rounded-2xl p-4 col-span-1"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <h1 className=" font-bold text-3xl text-center font-jetbrains-mono">
          “Student & Developer”
        </h1>
      </motion.div>

      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-1 sm:row-span-2 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <motion.h1
          className="text-6xl hover:cursor-pointer"
          whileHover={{ rotate: [0, 20, -20, 20, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          👋🏼
        </motion.h1>
        <h1 className=" text-slate-600 text-4xl font-black">Aditya</h1>
      </motion.div>

      <motion.div
        className="shadow-slate-800 shadow bg-slate-600 rounded-2xl p-4 flex items-center justify-center h-48 overflow-hidden sm:col-span-1 sm:col-start-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
          <TextScrambleComponent/>
      </motion.div>

      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-1 sm:row-start-3 sm:row-span-2 flex flex-col gap-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className=" font-bold text-3xl ">
          Technologies I have worked with
        </h1>
        <motion.div
          className=" grid grid-cols-3 gap-4 self-centerw-full h-full p-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {skills.map((skill) => (
            <motion.a
              key={skill.name}
              variants={item}
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
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-2 sm:col-start-2 sm:pb-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className=" font-bold text-3xl">Education </h1>
        <p className=" font-semibold text-lg">
          B.TECH (AI-DS){" "}
          <span className=" text-sm text-neutral-500">(2023 - Today)</span>
          <p className=" text-lg text-neutral-300">
            Currently Pursuing B.TECH in Artificial Intelligence and Data
            Science from VPKBIET.
          </p>
        </p>
      </motion.div>
    </div>
  );
};

export default Bento;
