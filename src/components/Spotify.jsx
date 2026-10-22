import { useEffect, useState } from "react";

const POLL_INTERVAL = 15000; // 15s

/* ============================================
   EXACT BRAND ICONS
   ============================================ */

function IconYouTube(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <circle cx="12" cy="12" r="5.8" fill="none" stroke="white" strokeWidth="1.4" />
      <path d="M10.3 8.9v6.2l5.3-3.1-5.3-3.1Z" fill="white" />
    </svg>
  );
}

function IconSpotify(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#1ED760" />
      <path
        d="M7.2 9.3c3.3-1 6.9-.7 9.7 1 .4.2.9.1 1.1-.3.2-.4.1-.9-.3-1.1-3.2-1.9-7.2-2.3-11-1.1-.4.1-.7.6-.5 1 .1.4.6.7 1 .5Zm.4 3.2c2.8-.8 5.4-.5 7.7.9.4.2.8.1 1-.2.2-.4.1-.8-.2-1-2.7-1.6-5.7-2-8.9-1-.4.1-.6.5-.5.9.1.3.5.6.9.4Zm.5 2.9c2-.6 4-.4 5.7.6.3.2.7.1.9-.2.2-.3.1-.7-.2-.9-2-1.2-4.4-1.5-6.8-.8-.3.1-.5.5-.4.8.1.4.4.6.8.5Z"
        fill="#111"
      />
    </svg>
  );
}

function IconAppleMusic({ gradientId, ...props }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="5" x2="19" y1="3" y2="21">
          <stop stopColor="#FB5C74" />
          <stop offset="1" stopColor="#FA243C" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" fill={`url(#${gradientId})`} />
      <path
        d="M16.8 6.1v8.7c0 1.3-1 2.2-2.4 2.2-1.1 0-2-.6-2-1.5 0-1 1-1.7 2.2-1.7.3 0 .6 0 .8.1V8.6l-5.9 1.2v6.3c0 1.3-1 2.2-2.4 2.2-1.1 0-2-.6-2-1.5 0-1 1-1.7 2.2-1.7.3 0 .6 0 .8.1V8.7l8.7-1.8Z"
        fill="white"
      />
    </svg>
  );
}

const WAVE_BARS = [
  { height: 8, duration: 900, delay: 0 },
  { height: 16, duration: 760, delay: 120 },
  { height: 12, duration: 980, delay: 80 },
  { height: 20, duration: 820, delay: 200 },
  { height: 8, duration: 880, delay: 160 },
];

function EqBars({ className = "spotify-eq" }) {
  return (
    <div className={className} aria-hidden="true">
      {WAVE_BARS.map((bar, i) => (
        <span
          key={i}
          className="spotify-eq-bar"
          style={{
            height: `${bar.height}px`,
            animationDuration: `${bar.duration}ms`,
            animationDelay: `${bar.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function Spotify() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        if (!res.ok || json.error) {
          const { code, message } = json.error ?? {};
          throw new Error(
            `${code ?? `HTTP_${res.status}`}: ${message ?? res.statusText}`
          );
        }
        if (!cancelled) setData(json);
      } catch (err) {
        console.error("[now-playing]", err);
        if (!cancelled) setData({ isPlaying: false, error: true });
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock page scroll while the modal is open so long titles scroll
  // inside the modal instead of pushing the whole page down.
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  if (data === null) return null;

  const isPlaying = data.isPlaying;

  return (
    <>
      <section className="wrap spotify-section">
        {isPlaying ? (
          <div
            className="spotify-mini-card is-clickable"
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
          >
            <div className="spotify-mini-text">
              <p className="spotify-mini-label">I'm currently listening to</p>
              <p className="spotify-mini-song">
                {data.title} <span className="spotify-dash">-</span>{" "}
                {data.artist}
              </p>
              <p className="spotify-mini-platform">Spotify</p>
            </div>

            <div
              className="spotify-mini-links"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={data.links.youtubeMusic}
                target="_blank"
                rel="noreferrer"
                title="Play on YouTube Music"
                aria-label={`Play ${data.title} on YouTube Music`}
                className="icon-btn"
              >
                <IconYouTube />
              </a>
              <a
                href={data.links.spotify}
                target="_blank"
                rel="noreferrer"
                title="Play on Spotify"
                aria-label={`Play ${data.title} on Spotify`}
                className="icon-btn"
              >
                <IconSpotify />
              </a>
              <a
                href={data.links.appleMusic}
                target="_blank"
                rel="noreferrer"
                title="Play on Apple Music"
                aria-label={`Play ${data.title} on Apple Music`}
                className="icon-btn"
              >
                <IconAppleMusic gradientId="apple-music-gradient-mini" />
              </a>
            </div>

            <img
              src="/images/spongebob-listening.gif"
              alt="Listening SpongeBob"
              className="spotify-mini-gif"
            />
          </div>
        ) : (
          <div className="spotify-card">
            <p className="spotify-text">
              {data.error
                ? "Can't reach Spotify right now."
                : "Not listening to anything right now."}
            </p>
            <img
              src="/images/spongebob-sleeping.gif"
              alt="Sleeping SpongeBob"
              className="spotify-gif"
            />
          </div>
        )}
      </section>

      {open && isPlaying && (
        <div className="np-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="np-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="np-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="np-modal-art-wrap">
              <div
                className="np-modal-art-glow"
                style={{ backgroundImage: `url(${data.albumImageUrl})` }}
                aria-hidden="true"
              />
              <div className="np-modal-art-sheen" aria-hidden="true" />
              <img
                src={data.albumImageUrl}
                alt={data.album}
                className="np-modal-art-img"
              />
            </div>

            <div className="np-modal-body">
              <div className="np-modal-toprow">
                <p className="np-modal-label">I'm currently listening to</p>
                <EqBars className="np-modal-eq" />
              </div>

              <h2 className="np-modal-title">{data.title}</h2>
              <p className="np-modal-artist">{data.artist}</p>
              <p className="np-modal-album">{data.album}</p>

              <span className="np-modal-badge">Spotify</span>

              <div className="np-modal-actions">
                <a
                  href={data.links.youtubeMusic}
                  target="_blank"
                  rel="noreferrer"
                  title="Play on YouTube Music"
                  className="np-action-btn"
                >
                  <span className="np-action-icon">
                    <IconYouTube />
                  </span>
                  <span className="np-action-label">YouTube Music</span>
                </a>
                <a
                  href={data.links.spotify}
                  target="_blank"
                  rel="noreferrer"
                  title="Play on Spotify"
                  className="np-action-btn"
                >
                  <span className="np-action-icon">
                    <IconSpotify />
                  </span>
                  <span className="np-action-label">Spotify</span>
                </a>
                <a
                  href={data.links.appleMusic}
                  target="_blank"
                  rel="noreferrer"
                  title="Play on Apple Music"
                  className="np-action-btn"
                >
                  <span className="np-action-icon">
                    <IconAppleMusic gradientId="apple-music-gradient-modal" />
                  </span>
                  <span className="np-action-label">Apple Music</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}