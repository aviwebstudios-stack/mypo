import { useEffect, useState } from "react";

const POLL_INTERVAL = 15000; // 15s

export default function Spotify() {
  const [data, setData] = useState(null);

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

  // Avoid a flash of "not playing" before the first fetch resolves
  if (data === null) return null;

  const isPlaying = data.isPlaying;

  return (
    <section className="wrap spotify-section">
      <div className="spotify-card">
        {isPlaying ? (
          <>
            <div className="spotify-now">
              <img
                src={data.albumImageUrl}
                alt={data.album}
                className="spotify-art"
              />
              <div className="spotify-info">
                <p className="spotify-text">I'm currently listening to</p>
                <p className="spotify-song">
                  {data.title} <span className="spotify-dash">–</span>{" "}
                  {data.artist}
                </p>
              </div>
            </div>

            <div className="spotify-links">
              <span className="eq-bars" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>

              <a
                href={data.links.youtubeMusic}
                target="_blank"
                rel="noreferrer"
                className="spotify-link-icon spotify-link-yt"
                aria-label="Listen on YouTube Music"
                title="YouTube Music"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 8l7 4-7 4V8z" fill="currentColor" />
                </svg>
              </a>

              <a
                href={data.links.spotify}
                target="_blank"
                rel="noreferrer"
                className="spotify-link-icon spotify-link-spotify"
                aria-label="Listen on Spotify"
                title="Spotify"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 10.5c3.5-1 8-.6 11 1.2M6.5 13.5c3-1 6.5-.6 9 1M7 16.5c2.4-.7 5-.4 7 .8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              <a
                href={data.links.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="spotify-link-icon spotify-link-apple"
                aria-label="Listen on Apple Music"
                title="Apple Music"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 6.5v7.7a2.6 2.6 0 1 1-1.3-2.25V9L10 9.9v5.3a2.6 2.6 0 1 1-1.3-2.25V7.8L15 6.5z"
                    fill="currentColor"
                  />
                </svg>
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
  );
}