import { RiLink } from "react-icons/ri";
import { motion } from "motion/react";

const ProjectCard = ({ img, name, description, tags, link }) => {
  return (
    <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
      {/* Thumbnail */}
      <motion.div
        className="shadow-neutral-800 shadow w-80 lg:w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
      >
        <img src={img} alt={name} className="object-cover rounded-lg h-full" />
      </motion.div>

      {/* Content */}
      <div className="content flex flex-col justify-between gap-2 md:gap-4 w-80 lg:w-96">
        <motion.div
          className="shadow-neutral-800 shadow bg-zinc-950 rounded-lg p-4 h-full"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="font-bold text-2xl mb-2">{name}</h1>
          <p className="text-xs text-zinc-400">{description}</p>
          <div className="tags mt-2 flex gap-1 flex-wrap">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-zinc-700 rounded-full px-2 py-0.5 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.a
          href={link}
          className="link shadow-neutral-800 shadow bg-neutral-950 rounded-lg p-3 flex justify-center"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0, duration: 0.3, ease: "easeOut" }}
        >
          <RiLink size={32} />
        </motion.a>
      </div>
    </div>
  );
};

export default ProjectCard;
