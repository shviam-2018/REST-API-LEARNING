import { useState, useEffect } from "react";

const baseUrl = "http://185.7.81.47:3001/api/v1/movies";

export function PutMovieById() {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/${movieId}`);
        const result = await response.json();
        if (result.success) {
          const mv = result.data;
          setMovie(mv);
          setTitle(mv.title || "");
          setDirector(mv.director || "");
          setYear(mv.year ? String(mv.year) : "");
        } else {
          setError("Failed to fetch movie");
        }
      } catch (err) {
        setError('Error fetching movie: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [movieId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!movieId) {
      setError('Please provide an ID to update');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const body = { title, director, year: Number(year) };
      const res = await fetch(`${baseUrl}/${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Failed to update (${res.status})`);
      }
      const updated = data?.data ?? data?.movie ?? data;
      setMovie(updated);
      setStatus('Oppdatert!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{border:'1px solid #ddd',padding:8,margin:8}}>
      <h3>Oppdater film (PUT)</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input
          type="number"
          placeholder="Film ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
      </div>

      {loading && <div>Laster film...</div>}
      {error && <div style={{color:'red'}}>Feil: {error}</div>}
      {status && <div style={{color:'green'}}>{status}</div>}

      {movie && (
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:360}}>
          <label>
            Tittel
            <input value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <label>
            Regissør
            <input value={director} onChange={e=>setDirector(e.target.value)} />
          </label>
          <label>
            År
            <input type="number" value={year} onChange={e=>setYear(e.target.value)} />
          </label>
          <div style={{display:'flex',gap:8}}>
            <button type="submit" disabled={saving}>{saving ? 'Lagrer...' : 'Oppdater film'}</button>
          </div>
        </form>
      )}

      {!movie && !loading && <div>Ingen film lastet. Skriv ID og vent.</div>}
    </div>
  );
}