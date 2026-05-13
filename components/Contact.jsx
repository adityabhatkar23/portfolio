"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <div className="mx-auto mb-4 grid w-max max-w-full min-w-0 grid-cols-2 gap-4">
      <motion.div
        className="shadow-neutral-800 shadow mail flex min-h-36 w-40 shrink-0 items-center justify-center justify-self-center rounded-xl bg-neutral-950 py-3 md:min-auto md:w-56 md:justify-self-start row-start-2 md:row-start-1"
        
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:adityabhatkar23@gmail.com"
          className="flex items-center justify-center gap-2 rounded-lg bg-neutral-700 px-2 py-1 text-center"
        >
          <FaEnvelope />
          <span className="text-center text-xs tracking-wider">
            me@aditya.dev
          </span>
        </a>
      </motion.div>

      <motion.div
        className=" shadow-neutral-800 shadow bg-neutral-950 rounded-xl w-auto h-36 md:h-auto md:w-56 flex flex-col justify-center items-center github col-span-2 md:row-start-2 md:col-start-1 "
        initial={{ opacity: 0.1, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: -0.1, ease: "easeOut" }}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/adityabhatkar23/"
          className="text-3xl"
        >
          <FaGithub />
        </a>
        <h1 className="text-xl font-semibold">Github Profile</h1>
        <p className="text-center text-sm font-medium text-neutral-400">
          Find more of my repositories
        </p>
      </motion.div>

      <motion.div
        className=" shadow-neutral-800 shadow bg-neutral-950 rounded-xl md:h-64 w-40 md:w-56 flex justify-center items-center linkedin md:col-start-2 md:row-span-2 md:row-start-1"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://linkedin.com/in/aditya-bhatkar-8555122a3/"
          className="text-4xl"
        >
          <FaLinkedin />
        </a>
      </motion.div>

      <motion.div
        className="form contact-form col-span-2 mt-4 w-full min-w-0 md:row-start-3"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold">Contact with me</h1>

        <p className="my-2 mb-3 text-sm font-thin text-neutral-400">
          You can also get in touch with me through the form below
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="flex flex-col gap-3"
        >
          <input
            type="hidden"
            name="access_key"
            value="b1479364-bb59-4330-b8ff-91f224e0600d"
          />
          <motion.div className="flex flex-col rounded-lg bg-neutral-950 p-2">
            <label
              htmlFor="name"
              className="text-[11px] font-medium tracking-wider text-neutral-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-transparent text-xs outline-none placeholder:text-xs"
              placeholder="Your name"
            />
          </motion.div>
          <motion.div className="flex flex-col rounded-lg bg-neutral-950 p-2">
            <label
              htmlFor="email"
              className="text-[11px] font-medium tracking-wider text-neutral-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-transparent text-xs outline-none placeholder:text-xs"
              placeholder="example@mail.com"
            />
          </motion.div>
          <motion.div className="flex flex-col rounded-lg bg-neutral-950 p-2">
            <label
              htmlFor="message"
              className="text-[11px] font-medium tracking-wider text-neutral-200"
            >
              Message
            </label>
            <textarea
              rows={3}
              name="message"
              id="message"
              className="resize-none bg-transparent text-xs outline-none placeholder:text-xs"
              placeholder="Enter your message here"
            />
          </motion.div>

          <input
            type="submit"
            name="submit"
            id="submit"
            className="rounded-lg bg-neutral-700 p-2 text-center text-[13px] font-medium text-neutral-200 shadow shadow-neutral-950 outline-none"
            value="Send Message"
          />
        </form>
      </motion.div>
    </div>
  );
}
