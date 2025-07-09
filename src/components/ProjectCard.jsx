import { RiLink } from "react-icons/ri";


const ProjectCard = ({ img, name, description, tags, link }) => {
  return (
    <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
      {/* Thumbnail */}
      <div className="thumbnail w-80 lg:w-96">
        <img src={img} alt={name} className="object-cover rounded-lg h-full" />
      </div>

      {/* Content */}
      <div className="content flex flex-col justify-between gap-2 md:gap-4 w-80 lg:w-96">
        <div className="dis bg-zinc-900 rounded-lg p-4 h-full">
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
        </div>

        <a
          href={link}
          className="link bg-zinc-900 rounded-lg p-3 flex justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiLink size={32}/>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
