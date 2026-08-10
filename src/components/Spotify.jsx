export default function Spotify() {
  const isPlaying = false;

  return (
    <section className="wrap spotify-section">
      <div className="spotify-card">
        {isPlaying ? (
          <>
            {/* We'll replace this with the Spotify API later */}
            <p>Loading current song...</p>
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