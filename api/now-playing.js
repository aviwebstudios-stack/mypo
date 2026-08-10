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

async function getAccessToken() {
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to refresh token: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  // Cache at the edge for a few seconds so rapid page loads don't
  // hammer Spotify's API.
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  try {
    const accessToken = await getAccessToken();

    const nowPlayingRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // 204 = nothing currently playing
    if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400) {
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
    return res.status(200).json({ isPlaying: false });
  }
}
