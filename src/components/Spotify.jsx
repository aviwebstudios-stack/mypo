import { useEffect, useState } from "react";
import { FaPlay, FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

const POLL_INTERVAL = 15000; // 15s

function EqBars() {
  return (
    <span className="eq-badge" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </span>
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
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ isPlaying: false });
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Close modal with Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (data === null) return null;

  const isPlaying = data.isPlaying;

  return (
    <>
      <section className="wrap spotify-section">
        <div
          className={`spotify-mini${isPlaying ? " is-clickable" : ""}`}
          onClick={() => isPlaying && setOpen(true)}
          role={isPlaying ? "button" : undefined}
          tabIndex={isPlaying ? 0 : undefined}
        >
          {isPlaying ? (
            <>
              <img
                src={data.albumImageUrl}
                alt={data.album}
                className="spotify-mini-art"
              />
              <div className="spotify-mini-info">
                <p className="spotify-mini-label">I'm currently listening to</p>
                <p className="spotify-mini-song">
                  {data.title} <span className="spotify-dash">–</span>{" "}
                  {data.artist}
                </p>
                <p className="spotify-mini-platform">Spotify</p>
              </div>

              <div className="spotify-mini-actions">
                <EqBars />
                <a
                  href={data.links.youtubeMusic}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="icon-btn icon-btn-yt"
                  aria-label="Listen on YouTube Music"
                  title="YouTube Music"
                >
                  <FaPlay />
                </a>
                <a
                  href={data.links.spotify}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="icon-btn icon-btn-spotify"
                  aria-label="Listen on Spotify"
                  title="Spotify"
                >
                  <FaSpotify />
                </a>
                <a
                  href={data.links.appleMusic}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="icon-btn icon-btn-apple"
                  aria-label="Listen on Apple Music"
                  title="Apple Music"
                >
                  <SiApplemusic />
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="spotify-text">
                Not listening to anything right now.
              </p>
              <img
                src="/images/spongebob-sleeping.gif"
                alt="Sleeping SpongeBob"
                className="spotify-gif"
              />
            </>
          )}
        </div>
      </section>

      {open && isPlaying && (
        <div
          className="np-modal-backdrop"
          onClick={() => setOpen(false)}
        >
          <div className="np-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="np-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <img
              src={data.albumImageUrl}
              alt={data.album}
              className="np-modal-art"
            />

            <p className="np-modal-label">I'm currently listening to</p>
            <h3 className="np-modal-title font-display">{data.title}</h3>
            <p className="np-modal-artist">{data.artist}</p>
            <p className="np-modal-album">{data.album}</p>

            <span className="np-modal-badge">Spotify</span>

            <div className="np-modal-actions">
              <a
                href={data.links.youtubeMusic}
                target="_blank"
                rel="noreferrer"
                className="np-action-btn np-action-yt"
              >
                <FaPlay /> YouTube Music
              </a>
              <a
                href={data.links.spotify}
                target="_blank"
                rel="noreferrer"
                className="np-action-btn np-action-spotify"
              >
                <FaSpotify /> Spotify
              </a>
              <a
                href={data.links.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="np-action-btn np-action-apple"
              >
                <SiApplemusic /> Apple Music
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}