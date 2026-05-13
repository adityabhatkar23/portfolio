"use client";

import { skills } from "./skills";
import { motion } from "motion/react";
import TextScrambleComponent from "./Text";
import MiniSnake from "./Game";

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
    <div className="grid sm:grid-cols-12 grid-cols-1 gap-4 min-h-[60vh]">
      {/* About */}
      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-8 sm:row-span-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className="font-extrabold text-3xl mb-2">Who am I?</h1>

        <p className="font-semibold text-lg text-neutral-300">
          Hi! I’m Aditya. I’m a student at VPKBIET, learning how to
          build software.
          <br />
          I enjoy creating things with code and trying out new ideas.
          <br />
          If you have a project I can help with, or just want to say hi
          — feel free to contact me!
        </p>
      </motion.div>

      {/* Snake */}
      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl overflow-hidden sm:col-span-4 sm:row-span-6 sm:col-start-9"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <MiniSnake />
      </motion.div>

      {/* Student Developer */}
      <motion.div
        className="shadow-slate-800 shadow bg-slate-600 rounded-2xl p-4 flex items-center justify-center sm:col-span-4 sm:row-span-2 sm:row-start-5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <h1 className="font-bold text-3xl text-center font-jetbrains-mono">
          “Student & Developer”
        </h1>
      </motion.div>

      {/* Intro */}
      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 sm:col-span-4 sm:row-span-5 sm:col-start-5 sm:row-start-5"
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

        <h1 className="text-slate-600 text-4xl font-black">
          Aditya
        </h1>
      </motion.div>

      {/* Text Scramble */}
      <motion.div
        className="shadow-slate-800 shadow bg-slate-600 rounded-2xl p-4 flex items-center justify-center overflow-hidden sm:row-span-3 sm:col-start-9 sm:row-start-7 sm:col-span-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="h-[80px] w-full flex items-center justify-center overflow-hidden">
  <TextScrambleComponent />
</div>
      </motion.div>

      {/* Tech */}
      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 flex flex-col gap-3 sm:col-span-4 
        sm:col-span-4 sm:row-span-6 sm:row-start-7"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className="font-bold text-3xl">
          Technologies I have worked with
        </h1>

        <motion.div
          className="grid grid-cols-3 gap-4 w-full h-full p-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {skills.map((skill) => {
            const Icon = skill.Icon;
            return (
              <motion.a
                key={skill.name}
                variants={item}
                href={skill.href}
                target="_blank"
                rel="noreferrer"
                aria-label={skill.name}
                className="flex items-center justify-center"
              >
                <Icon
                  size={48}
                  stroke={1.25}
                  className="text-neutral-400 grayscale"
                  aria-hidden
                />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Education */}
      <motion.div
        className="shadow-neutral-800 shadow bg-neutral-950 rounded-2xl p-4 sm:col-span-8 sm:row-span-3 sm:col-start-5 sm:row-start-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className="font-bold text-3xl">Education</h1>

        <p className="font-semibold text-lg">
          B.TECH (AI-DS)
          <span className="text-sm text-neutral-500">
            {" "}
            (2023 - Today)
          </span>

          <span className="text-lg text-neutral-300 block mt-2">
            Currently Pursuing B.TECH in Artificial Intelligence and
            Data Science from VPKBIET.
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Bento;
