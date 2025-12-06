import { useEffect, useState } from "react";

const baseUrl = "http://185.7.81.47:3001/api/v1/movies";

export function GetMovieByYear() {
  const [movieYear, setMovieYear] = useState("");
  const [TempMovieYear, setTempMovieYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieYear) return;

    const fetchMovieByYear = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/year/${movieYear}`);
        const result = await response.json();
        if (result.success) {
          setMovies(result.data);
        } else {
          setError("Failed to fetch movies");
        }
      } catch (error) {
        setError('Error fetching movies: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieByYear();
  }, [movieYear]);

  return (
    <div>
      <input 
        type="number" 
        placeholder="Enter movie year"
        value={TempMovieYear}
        onChange={(e) => setTempMovieYear(e.target.value)}
      />
      <button onClick={() => setMovieYear(TempMovieYear)}>Fetch Movies</button>
      {loading && <div>Loading movies...</div>}
      {error && <div>Error: {error}</div>}
      {movies.length > 0 && (
        <div>
          <h1>Movies from {movieYear}</h1>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h2>{movie.title} ({movie.year})</h2>
                <p>Directed by: {movie.director}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && movies.length === 0 && movieYear && (
        <div>No movies found for year {movieYear}</div>
      )}
    </div>
  );
}