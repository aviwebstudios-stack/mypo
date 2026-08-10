import { profile } from "../data/content";

export default function Hero() {
  return (
    <section id="top" className="hero wrap">
      <h1 className="hero-name font-display">{profile.name}.</h1>
      <p className="hero-role">{profile.role}</p>

      <p className="hero-creator">{profile.heroTagline}</p>

      <div className="hero-socials">
        {profile.socials.map((s, i) => (
          <span key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {s.label}
            </a>
            {i < profile.socials.length - 1 ? <span> · </span> : null}
          </span>
        ))}
      </div>

      <div className="hero-actions">
        <a href={profile.resumeUrl} download className="btn-resume">
          Download résumé ↓
        </a>

        <a href="#projects" className="btn-projects">
          View Projects <span className="arrow-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
