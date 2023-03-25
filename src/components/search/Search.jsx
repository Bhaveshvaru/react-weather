import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import './search.css'
import Weather from '../weather/Weather.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Blocks } from 'react-loader-spinner'

const Search = () => {
  const date = new Date()
  const d = date.toISOString().substring(0, 10)
  const [searchField, setSearchField] = useState('Singapore')
  const [location, setLocation] = useState([])
  const [forecast, setForecast] = useState([])
  const [loader, setLoader] = useState(false)
  const [image, setImage] = useState('')

  // search handler function
  const searchHandler = () => {
    setLoader(true)
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${searchField}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESSKEY}`
      )
      .then((res) => {
        setImage(res.data.results[0].urls.regular)
      })
      .catch((err) => {
        setLoader(false)
      })

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
        setLoader(false)

        if (error.code === 'ERR_BAD_REQUEST') {
          toast.error('No Country or City Found! Try again...', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          setSearchField('')
        }
      })
  }

  const keyHandler = (e) => {
    if (e.key === 'Enter') {
      searchHandler()
    }
  }

  useEffect(() => {
    searchHandler()
  }, [])
  return (
    <>
      <div className='search'>
        <TextField
          id='outlined-basic'
          label='Search Country / City'
          variant='outlined'
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onKeyPress={(e) => keyHandler(e)}
        />
        <SearchIcon className='icon' onClick={searchHandler} />
        <ToastContainer />
      </div>
      {loader ? (
        <div className='loader'>
          <Blocks
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
          />
        </div>
      ) : location.length !== 0 ? (
        <Weather
          image={image}
          forecastData={forecast}
          locationData={location}
        
        />
      ) : null}
    </>
  )
}

export default Search
