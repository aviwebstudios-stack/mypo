import { Link } from "react-router-dom";
import { projects } from "../data/content";

function ProjectRow({ project }) {
  return (
    <Link id={project.id} className="project-row" to={`/projects/${project.id}`}>
      <div className="project-head">
        <span className="project-title font-display">{project.title}</span>
        <span className="project-arrow">↗</span>
      </div>

      {project.domain && <p className="project-domain">{project.domain}</p>}

      <p className="project-desc">{project.description}</p>

      {project.stack?.length > 0 && (
        <p className="project-stack">{project.stack.join(" • ")}</p>
      )}
    </Link>
  );
}

export default function Projects() {
  return (
    <section className="projects wrap">
      <h2 className="projects-title font-display">Projects</h2>
      <hr className="projects-rule" />
      {projects.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}
    </section>
  );
}