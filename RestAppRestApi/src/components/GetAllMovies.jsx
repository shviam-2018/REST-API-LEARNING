import { useEffect, useState } from "react";

const baseUrl = "http://185.7.81.47:3001/api/v1/movies";

export function GetAllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(baseUrl);
        const result = await response.json();
        
        if (result.success) {
          setMovies(result.data);
        } else {
          setError("Failed to fetch movies");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ol>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - Directed by {movie.director}
          </li>
        ))}
      </ol>
    </div>
  );
}