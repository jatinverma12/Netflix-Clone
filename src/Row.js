import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl)
      setMovies(response.data.results)
    }

    fetchData()
  }, [fetchUrl])
  //fetchUrl should be the dependency as if suppose different url is passes then useEffect won;t run unless fetchUrl is
  //defined as a dependency

  const base_url = 'https://image.tmdb.org/t/p/original'
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && 'row_posterLarge'} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            } `}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
