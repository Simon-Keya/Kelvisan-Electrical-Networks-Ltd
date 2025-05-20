'use client';

interface ProjectCardProps {
  title: string;
  description: string;
}

export const ProjectCard = ({ title, description }: ProjectCardProps) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      <div className="card-body">
        <h3 className="card-title text-primary">{title}</h3>
        <p className="text-base-content">{description}</p>
      </div>
    </div>
  );
};
