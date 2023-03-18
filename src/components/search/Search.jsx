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

  // search handler function
  const searchHandler = () => {
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
      {setLocation.length !== 0 ? (
        <Weather forecastData={forecast} locationData={location} />
      ) : null}
    </>
  )
}

export default Search
