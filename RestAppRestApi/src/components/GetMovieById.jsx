import { useEffect, useState } from "react";

const baseUrl = "http://185.7.81.47:3001/api/v1/movies";

export function GetMovieById() {
  const [movieId, setMovieId] = useState("");
  const [TempMovieId, setTempMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return; // Don't fetch if movieId is empty

    const fetchMovieById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/${movieId}`);
        const result = await response.json();
        if (result.success) {
          setMovie(result.data);
        } else {
          setError("Failed to fetch movie");
        }
      } catch (error) {
        setError('Error fetching movie: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById(); // Actually call the function!
  }, [movieId]);

  return (
    <div>
      <input 
        type="number" 
        placeholder="Enter movie ID"
        value={TempMovieId}
        onChange={(e) => setTempMovieId(e.target.value)}
      />
      <button onClick={() => setMovieId(TempMovieId)}>Fetch Movie</button>
      {loading && <div>Loading movie...</div>}
      {error && <div>Error: {error}</div>}
      {movie && (
        <div>
          <h2>{movie.title} ({movie.year})</h2>
          <p>Directed by: {movie.director}</p>
        </div>
      )}
    </div>
  );
}