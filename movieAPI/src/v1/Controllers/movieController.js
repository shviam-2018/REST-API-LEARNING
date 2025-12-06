const {getMoviesByDirector, getAllMovies, addMovie, getMovieById, deleteMovieById, updateMovieById, getMoviesByYear} = require('../Data/DB_movie');

// Get all movies
const fetchAllMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.status(200).json({success: true, data: movies});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies' });
    }
};

// GET movie by ID
const fetchMovieById = async (req, res) => {
    try {
        const movie = await getMovieById(req.params.id);
        res.status(200).json({success: true, data: movie});
        if (!movie) {
            return res.status(404).json({ success: false, error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movie' });
    }
};

// Get movies by director
const fetchMoviesByDirector = async (req, res) => {
    try {
        const director = await getMoviesByDirector(req.params.director);
        res.status(200).json({success: true, data: director});
        if (!director) {
            return res.status(404).json({ success: false, error: 'Director not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies by director' });
    }
};

// Add movie
const createMovie = async (req, res) => {
    try {
        const { director, year, title } = req.body;
        const newMovie = await addMovie({ director, year, title });
        res.status(201).json({ success: true, data: newMovie });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add movie' });
    }
};

// update movie by ID
const modifyMovieById = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, director, year} = req.body;
        const updatedMovie = await updateMovieById(id, {title, director, year});
        res.status(200).json({success: true, data: updatedMovie});
    } catch (error) {
        if (!id) {
            return res.status(400).json({ success: false, error: 'Movie ID does not exist' });
        }
        res.status(500).json({ success: false, error: 'Failed to update movie' });
    }
}

// GET movies by year
const fetchMoviesByYear = async (req, res) => {
    try {
        const {year} = req.params;
        const movies = await getMoviesByYear(year);
        res.status(200).json({success: true, data: movies});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch movies by year' });
    }
}

// Delete movie by ID
const removeMovieById = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteed = await deleteMovieById(id);
        res.status(200).json({success: true, message: 'Movie deleted successfully'});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete movie' });
    }
}

module.exports = {
    fetchAllMovies,
    fetchMovieById,
    fetchMoviesByDirector,
    createMovie,
    modifyMovieById,
    fetchMoviesByYear,
    removeMovieById
};