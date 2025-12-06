const express = require('express');
const { fetchAllMovies, fetchMovieById, fetchMoviesByDirector, createMovie, modifyMovieById, fetchMoviesByYear, removeMovieById } = require('../Controllers/movieController');

const router = express.Router();

// Routes
router.get('/', fetchAllMovies);
router.get('/:id', fetchMovieById);
router.get('/director/:director', fetchMoviesByDirector);
router.get('/year/:year', fetchMoviesByYear);
router.post('/', createMovie);
router.put('/:id', modifyMovieById);
router.delete('/:id', removeMovieById);

module.exports = router;