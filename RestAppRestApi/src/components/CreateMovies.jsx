import { useState, useEffect } from "react";
const baseUrl = "http://185.7.81.47:3001/api/v1/movies";

export function CreateMovies() {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const body = { title, director, year: Number(year) };
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || `Failed to create movie (${res.status})`);
            }
            // Clear form on success
            setTitle('');
            setDirector('');
            setYear('');
            alert('Film opprettet!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    });
    
    return (
        <div style={{border:'1px solid #ddd',padding:8,margin:8}}>
            <h3>Legg til ny film</h3>
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:360}}>
                <label>
                    Tittel
                    <input 
                        value={title} 
                        onChange={e=>setTitle(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Regissør
                    <input 
                        value={director} 
                        onChange={e=>setDirector(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    År
                    <input 
                        type="number" 
                        value={year} 
                        onChange={e=>setYear(e.target.value)} 
                        required 
                    />
                </label>
                {error && <div style={{color:'red'}}>Feil: {error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Lagrer...' : 'Legg til film'}
                </button>
            </form>
        </div>
    );
}