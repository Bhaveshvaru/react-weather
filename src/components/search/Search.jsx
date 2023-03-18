import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import './search.css'
import Weather from '../weather/Weather.jsx'

const Search = () => {
  const date = new Date()
  const d = date.toISOString().substring(0, 10)
  const [searchField, setSearchField] = useState('')
  const [location, setLocation] = useState([])
  const [forecast, setForecast] = useState([])
  const [loader, setLoader] = useState(false)

  // search handler function
  const searchHandler = () => {
    setLoader(true)
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/history.json',
      params: { q: `${searchField}`, dt: `${d}`, lang: 'en' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RapidAPIKey,
        'X-RapidAPI-Host': process.env.REACT_APP_RapidAPIHost,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setLocation(response.data.location)
        setForecast(response.data.forecast.forecastday)
        setSearchField('')
        setLoader(false)
      })
      .catch(function (error) {
        if (error.code === 'ERR_BAD_REQUEST') {
          window.alert('No Country Found! Try again...')
          setSearchField('')
        }
      })
  }
  useEffect(() => {}, [])
  return (
    <>
      <div className='search'>
        <TextField
          id='outlined-basic'
          label='Search Country'
          variant='outlined'
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <SearchIcon className='icon' onClick={searchHandler} />
      </div>
      {loader ? (
        <h1>Loading</h1>
      ) : location.length !== 0 ? (
        <Weather forecastData={forecast} locationData={location} />
      ) : (
        <h1>Search Country or city </h1>
      )}
    </>
  )
}

export default Search
