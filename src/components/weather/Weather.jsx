import React, { useEffect } from 'react'
import './weather.css'
import Moment from 'moment'
const Weather = ({ forecastData, locationData }) => {
  const getimg = () => {
    let img = forecastData[0].day.condition.icon.substring(
      2,
      forecastData[0].day.condition.icon.length
    )
    return `https://${img}`
  }
  const getDayfromDate = () => {
    const week = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const d = locationData.localtime.substring(0, 10)
    const date = new Date(`${d}`)
    let day = date.getDay(date)
    return week[day]
  }
  const getDayfromDateCard = (t) => {
    let time = t.substring(11, 16)
    let formatted = Moment(time, 'HH:mm').format('hh:mm A')
    return formatted
  }

  useEffect(() => {}, [])
  return (
    <>
      <div className='title'>
        {locationData.length !== 0 && forecastData.length !== 0 ? (
          <>
            <h1>
              {locationData.name}, {locationData.country}
            </h1>
            <h1>
              {Moment(locationData.localtime.substring(0, 10)).format(
                'YYYY/MM/DD'
              )}
            </h1>
            <h1>{getDayfromDate()}</h1>
            <img src={getimg()} alt='condition' />
            <h1>{forecastData[0].day.condition.text}</h1>
            <h1>{`${forecastData[0].day.avgtemp_c}C`}</h1>
          </>
        ) : null}
      </div>
      <div className='hour'>
        {locationData.length !== 0 && forecastData.length !== 0 ? (
          <>
            {forecastData[0].hour.map((item, id) => (
              <div key={id}>
                <h1>{getDayfromDateCard(item.time)}</h1>
                <img src={`https:${item.condition.icon}`} alt='condition' />
                <h1>{`${item.temp_c}C`}</h1>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  )
}

export default Weather
