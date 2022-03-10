import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl)
      setMovies(response.data.results)
    }

    fetchData()
  }, [fetchUrl])
  //fetchUrl should be the dependency as if suppose different url is passes then useEffect won;t run unless fetchUrl is
  //defined as a dependency
  const opts = {
    height: '390',
    width: '99%',
    playerVars: {
      autoplay: 0,
    },
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(null, { tmdbId: movie?.id })
        .then((url) => {
          setError('')
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((error) => {
          setError(
            "Could not find this movie's trailer. Please try different movie."
          )
        })
    }
  }

  const base_url = 'https://image.tmdb.org/t/p/original'
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && 'row_posterLarge'} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            } `}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: '40px' }}>
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  )
}

export default Row
