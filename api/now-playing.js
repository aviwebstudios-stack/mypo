// api/now-playing.js
// Vercel serverless function.
// Reads SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// from environment variables (set these in Vercel project settings,
// and in a local .env file for local dev with `vercel dev`).

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

class SpotifyError extends Error {
  constructor(code, message, status = 502) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// fetch() only throws on network failures (DNS, timeout, connection reset),
// so anything caught here means Spotify was never reached.
async function request(url, options, target) {
  try {
    return await fetch(url, options);
  } catch (err) {
    throw new SpotifyError(
      "SPOTIFY_NETWORK_ERROR",
      `Network error reaching ${target}: ${err.message}`,
      503
    );
  }
}

async function getAccessToken() {
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await request(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    },
    "Spotify accounts service"
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new SpotifyError(
      "SPOTIFY_TOKEN_REFRESH_FAILED",
      `Token refresh failed with status ${res.status}${body ? `: ${body}` : ""}`
    );
  }

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  try {
    const accessToken = await getAccessToken();

    const nowPlayingRes = await request(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` } },
      "Spotify API"
    );

    if (nowPlayingRes.status === 401) {
      throw new SpotifyError(
        "SPOTIFY_UNAUTHORIZED",
        "Spotify rejected the access token (401)"
      );
    }

    if (nowPlayingRes.status >= 500) {
      throw new SpotifyError(
        "SPOTIFY_SERVER_ERROR",
        `Spotify API returned ${nowPlayingRes.status}`
      );
    }

    if (!nowPlayingRes.ok) {
      throw new SpotifyError(
        "SPOTIFY_REQUEST_FAILED",
        `Spotify API returned ${nowPlayingRes.status}`
      );
    }

    // Cache at the edge for a few seconds so rapid page loads don't
    // hammer Spotify's API. Only successful responses are cached.
    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

    // 204 = nothing currently playing
    if (nowPlayingRes.status === 204) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = await nowPlayingRes.json();

    if (!song || !song.item) {
      return res.status(200).json({ isPlaying: false });
    }

    const title = song.item.name;
    const artist = song.item.artists.map((a) => a.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images?.[0]?.url ?? null;
    const spotifyUrl = song.item.external_urls.spotify;
    const isPlaying = song.is_playing;

    const searchQuery = encodeURIComponent(`${title} ${artist}`);

    return res.status(200).json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      links: {
        spotify: spotifyUrl,
        youtubeMusic: `https://music.youtube.com/search?q=${searchQuery}`,
        appleMusic: `https://music.apple.com/us/search?term=${searchQuery}`,
      },
    });
  } catch (err) {
    console.error(err);
    res.setHeader("Cache-Control", "no-store");
    const code = err.code ?? "SPOTIFY_UNEXPECTED_ERROR";
    const status = err.status ?? 500;
    return res.status(status).json({ error: { code, message: err.message } });
  }
}
