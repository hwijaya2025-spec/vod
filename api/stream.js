import moviesData from '../movies.json';

export default async function handler(req, res) {
  // Izinkan akses dari aplikasi Android
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query; // Contoh uji: /api/stream?id=gohan-movie

  if (!id) {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  // Cari film berdasarkan ID di movies.json
  const movie = moviesData.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  try {
    // Merakit link Turboviplay secara otomatis dari ID yang tersimpan
    const freshStreamUrl = `https://cdn4.turboviplay.com/data3/${movie.turboviplay_id}/${movie.turboviplay_id}.m3u8`;

    return res.status(200).json({
      success: true,
      title: movie.title,
      streamUrl: freshStreamUrl
    });

  } catch (error) {
    return res.status(500).json({ error: "Failed to generate stream link" });
  }
}
