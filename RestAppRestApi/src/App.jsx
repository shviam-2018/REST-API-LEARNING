import './App.css'
import { useState } from 'react'
import { GetAllMovies } from './components/GetAllMovies.jsx'
import {GetMovieById} from './components/GetMovieById.jsx'
import {GetMovieByYear} from './components/GetMovieByYear.jsx'
import {PutMovieById} from './components/PutMovieById.jsx'
import { CreateMovies } from './components/CreateMovies.jsx'
function App() {

  return (
    <>
      <h1>Movie List</h1>
      <GetAllMovies />
      <h1>Get Movie By ID</h1>
      <GetMovieById />
      <h1>Get Movie By Year</h1>
      <GetMovieByYear />
      <h1>Update Movie By ID</h1>
      <PutMovieById />
      <h1>Create New Movie</h1>
      <CreateMovies />
    </>
  )
}

export default App
