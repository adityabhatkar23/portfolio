import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "./projects.json";

const Projects = () => {
  return (
    <main className="p-4 flex flex-col gap-6">
      {[...projects]
        .reverse()
        .map((project) => (
          <ProjectCard
            key={project.id}
            img={project.img}
            name={project.name}
            description={project.description}
            tags={project.tags}
            link={project.link}
          />
        ))}
    </main>
  );
};

export default Projects;
