let movies = [
    { id: 1, title: 'Johnny English', director: 'Peter Howitt', year: 2003 },
    { id: 2, title: 'Singham', director: 'Rohit Shetty', year: 2011 },
    { id: 3, title: 'Golmaal: Fun Unlimited', director: 'Rohit Shetty', year: 2006 },
    { id: 4, title: 'Terminator 3: Rise of the Machines', director: 'Jonathan Mostow', year: 2003 },
    { id: 5, title: 'Aashiqui 2', director: 'Mohit Suri', year: 2013 },
];

// Get all movies
const getAllMovies = () => {
    return [...movies];
}

// Add movie
const addMovie = (movie) => {
    const id = movies.length ? movies[movies.length - 1].id + 1 : 1; // Ensure the ID is unique by checking the length of the movies array
    const newMovie = { id, ...movie };
    movies.push(newMovie);
    return newMovie;
}

// Get movie by id
const getMovieById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return null; // Return null if id is not a number
    return movies.find((movie) => movie.id === id); // // Ensure the id is a number with parseInt
}

// GET movies by year
const getMoviesByYear = (year) => {
    year = parseInt(year);
    if (isNaN(year)) return null; // Return null if year is not a number
    return movies.filter((movie) => movie.year === year);
}

// GET movie by director
const getMoviesByDirector = (director) => {
    return movies.filter((movie) => movie.director === director);
}

// Delete movie by id
const deleteMovieById = (id) => {
    id = parseInt(id); // Ensure the ID is a number
    if (isNaN(id)) return false; // Handle invalid IDs

    // makes index = id of movie
    const index = movies.findIndex((movie) => movie.id === id);

    // Check if index is not -1/does not exist | if it does exist, delete it by splicing. Splicing removes the element at the specified index
    if (index !== -1) {
        movies.splice(index, 1);
        return true;
    }
    return false;
}

// Update movie by id
const updateMovieById = (id, updatedMovie) => {
    id = parseInt(id); // Ensure the ID is a number
    if (isNaN(id)) return false; // Handle invalid IDs

    // makes index = id of movie | check if id/movie exists | if it does, update it.
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedMovie };
        return movies[index];
    }
    return null;
}


module.exports = {
    getAllMovies,
    getMoviesByDirector,
    addMovie,
    getMovieById,
    getMoviesByYear,
    deleteMovieById,
    updateMovieById
}