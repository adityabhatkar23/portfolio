import ProjectCard from "../../components/ProjectCard";
import projects from "../../data/projects.json";

export default function ProjectsPage() {
  return (
    <div className="p-4 flex flex-col gap-6">
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
    </div>
  );
}
