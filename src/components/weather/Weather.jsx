import React, { useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import './weather.css'
import Moment from 'moment'
const Weather = ({ image, forecastData, locationData }) => {
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
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    700: { items: 2 },
    500: { items: 2 },
    400: { items: 2 },
    300: { items: 2 },
  }

  const items = forecastData[0].hour.map((item, id) => (
    <div key={id}>
      <div className='hour_row'>
        <h1 className='row_title'>{getDayfromDateCard(item.time)}</h1>
        <img src={`https:${item.condition.icon}`} alt='condition' />
        <h1>
          {`${item.temp_c}`}
          <span>&deg;</span>C
        </h1>
      </div>
    </div>
  ))

  useEffect(() => {}, [])
  return (
    <div className='main'>
      <div className='main_items' style={{ backgroundImage: `url(${image})` }}>
        <div className='title_card'>
          {locationData.length !== 0 && forecastData.length !== 0 ? (
            <>
              <p>
                {locationData.name}, {locationData.country}
              </p>
              <img src={getimg()} alt='condition' />
              <p>{forecastData[0].day.condition.text}</p>

              <h1>
                {`${forecastData[0].day.avgtemp_c}`}
                <span>&deg;</span>C
              </h1>
              <h1>{getDayfromDate()}</h1>
              <h1>
                {Moment(locationData.localtime.substring(0, 10)).format(
                  'YYYY/MM/DD'
                )}
              </h1>
            </>
          ) : null}
        </div>
        <div className='hour_card'>
          {locationData.length !== 0 && forecastData.length !== 0 ? (
            <div className='carousel'>
              <AliceCarousel
                disableButtonsControls
                disableDotsControls
                disableSlideInfo
                mouseTracking
                items={items}
                responsive={responsive}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Weather
