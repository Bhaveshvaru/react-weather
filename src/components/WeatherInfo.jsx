import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherInfo = () => {
  const getData = () => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/history.json',
      params: { q: 'Singapore' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RapidAPIKey,
        'X-RapidAPI-Host': process.env.REACT_APP_RapidAPIHost,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }
  useEffect(() => {}, [])
  return (
    <div>
      <h1 onClick={getData}>Weather</h1>
    </div>
  )
}

export default WeatherInfo
