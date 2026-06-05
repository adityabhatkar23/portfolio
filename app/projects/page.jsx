"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import projects from "../../data/projects.json";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectsPage() {
  const reversedProjects = [...projects].reverse();
  const featuredProjects = reversedProjects.slice(0, 6);
  const archiveProjects = reversedProjects.slice(6);

  const constraintsRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const positions = [
    { left: "4%", top: "2%", width: "28rem", rotate: -2, smRotate: -1 },
    { left: "58%", top: "6%", width: "18rem", rotate: 1, smRotate: 1 },
    { left: "57%", top: "34%", width: "22rem", rotate: 6, smRotate: -0.5 },
    { left: "1%", top: "25%", width: "24rem", rotate: 2, smRotate: 1 },
    { left: "66%", top: "58%", width: "18rem", rotate: -3, smRotate: -1 },
    { left: "14%", top: "49%", width: "26rem", rotate: 1, smRotate: 0.5 },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground overflow-hidden">
      <div
        ref={constraintsRef}
        className="relative h-auto md:h-[900px] overflow-visible md:overflow-hidden px-4 md:px-0"
      >
        {featuredProjects.map((proj, idx) => {
          const p = positions[idx] || {
            left: "0%",
            top: "0%",
            width: "auto",
            rotate: 0,
            smRotate: 0,
          };

          return (
            <motion.div
              key={proj.id}
              drag={isDesktop}
              dragConstraints={constraintsRef}
              dragElastic={0.05}
              dragMomentum={true}
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: p.rotate * 8,
                x: p.rotate * 60,
                y: p.rotate * 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: isDesktop ? p.rotate : p.smRotate,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: idx * 0.1,
                type: "spring",
                stiffness: 90,
                damping: 14,
              }}
              dragTransition={{
                bounceStiffness: 600,
                bounceDamping: 20,
                timeConstant: 150,
                power: 0.1,
              }}
              whileHover={
                isDesktop
                  ? {
                      scale: 1.02,
                      rotate: 0,
                      zIndex: 50,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      },
                    }
                  : {
                      scale: 1.02,
                      rotate: 0,
                    }
              }
              whileDrag={{
                scale: 1.04,
                rotate: 0,
                zIndex: 100,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.12)",
              }}
              style={{
                "--sm-rotate": `${p.smRotate}deg`,
                "--md-left": p.left,
                "--md-top": p.top,
                "--md-width": p.width,
                "--md-rotate": `${p.rotate}deg`,
              }}
              className="relative md:absolute rotate-[var(--sm-rotate)] md:left-[var(--md-left)] md:top-[var(--md-top)] md:w-[var(--md-width)] md:rotate-[var(--md-rotate)] w-full mb-6 md:mb-0 border border-border bg-card p-6 hover:border-custom-primary transition-colors duration-300 md:hover:cursor-grab active:md:hover:cursor-grabbing"
            >
              <span className="absolute top-4 right-5 text-2xl opacity-10 italic select-none">
                {String(proj.id).padStart(2, "0")}
              </span>

              <span className="text-[9px] border px-2 py-1 select-none">
                FEATURED
              </span>

              <h2 className="text-2xl md:text-3xl mt-5 mb-3 font-serif-dm select-none">
                {proj.name}
              </h2>

              <p className="text-xs leading-relaxed text-muted-foreground select-none">
                {proj.description}
              </p>

              <div className="flex justify-between mt-8 pt-4 border-t border-dashed select-none">
                <div className="text-[10px] opacity-50">
                  {proj.tags.slice(0, 2).join(" · ")}
                </div>

                <div className="flex gap-2 pointer-events-auto relative z-10">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border bg-card hover:bg-muted"
                    >
                      <FaGithub size={12} />
                    </a>
                  )}

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border bg-card hover:bg-muted"
                    >
                      <FaExternalLinkAlt size={11} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.a
          href="https://github.com/adityabhatkar23"
          target="_blank"
          rel="noreferrer"
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -2,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
          }}
          style={{
            left: "42%",
            top: "35%",
          }}
          className="hidden md:flex absolute w-[220px] h-[220px] border border-border items-center justify-center hover:bg-secondary transition"
        >
          <img
            src="/svgwaves_io_one-piece.svg"
            alt="Logo"
            className="w-40 invert opacity-10 pointer-events-none"
          />
        </motion.a>
      </div>

      <div className="max-w-6xl mx-auto px-4 ">
        <div className="flex justify-between border-b pb-4 mb-6">
          <h2 className="text-3xl font-serif-dm">Archive</h2>
          <span className="text-xs opacity-50 font-mono">
            {archiveProjects.length}
          </span>
        </div>

        {archiveProjects.map((proj) => (
          <div key={proj.id} className="flex justify-between py-4 border-b">
            <div>
              <h3>{proj.name}</h3>
              <span className="text-xs opacity-50">
                {proj.tags.join(" · ")}
              </span>
            </div>
            <div className="flex gap-4">
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
              )}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer">
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
