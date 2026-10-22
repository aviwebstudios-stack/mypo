import { useParams, Link } from "react-router-dom";
import { projects } from "../data/content";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="project-details wrap">
        <Link className="detail-topnav" to="/">← Projects</Link>
        <p>Project not found.</p>
      </section>
    );
  }

  return (
    <section className="project-details wrap">
      <Link className="detail-topnav" to="/">← Projects</Link>

      {project.image && (
        <img src={project.image} alt={project.title} className="detail-hero" />
      )}

      <h1 className="font-display">{project.title}</h1>
      <p className="detail-summary">{project.description}</p>

      {project.metrics?.length > 0 && (
        <div className="detail-metrics">
          {project.metrics.map((m) => (
            <span key={m} className="metric-block">{m}</span>
          ))}
        </div>
      )}

      <div className="detail-actions">
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer" className="btn-primary">
            Visit Live Site <span className="arrow">→</span>
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
            GitHub
          </a>
        )}
      </div>

      <div className="detail-section">
        <h2>Overview</h2>
        <p>{project.overview}</p>
      </div>

      {project.gallery?.length > 0 && (
        <div className="detail-section">
          <h2>Gallery</h2>
          <div className="detail-gallery">
            {project.gallery.map((src) => (
              <img key={src} src={src} alt={project.title} />
            ))}
          </div>
        </div>
      )}

      {project.features?.length > 0 && (
        <div className="detail-section">
          <h2>Features</h2>
          <ul>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-section">
        <h2>Tech Stack</h2>
        <div className="stack-badges">
          {project.stack.map((s) => (
            <span key={s} className="stack-badge">{s}</span>
          ))}
        </div>
      </div>

      {project.challenges?.length > 0 && (
        <div className="detail-section">
          <h2>Challenges</h2>
          <ul>
            {project.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {project.learned?.length > 0 && (
        <div className="detail-section">
          <h2>What I Learned</h2>
          <ul>
            {project.learned.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}