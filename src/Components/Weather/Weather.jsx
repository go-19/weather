import './Weather.css'
import { useContext, useEffect, useState } from "react"
import { WeatherContext } from '../../Context/Context'

function Weather({ api }) {

  const date = new Date()
  const { cityName, setShowMenu } = useContext(WeatherContext)
  const [data, setData] = useState({
    temp: null,
    cityName: null,
    last_updated: null,
    image: null,
    status: null
  })


  useEffect(() => {

    (async () => {

      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${cityName}&aqi=no`)

        if (response.status >= 200 && response.status <= 299) {

          const json = await response.json()
          setData({
            temp: json.current.temp_c,
            cityName: json.location.name,
            last_updated: json.current.last_updated,
            image: json.current.condition.icon,
            status: json.current.condition.text
          })
        } else {
          throw new Error(response.statusText || response.status)
        }
      }
      catch (err) {
        console.log(err);
      }

    })()

  }, [api, cityName])

  return (
    <section className={date.getHours() >= 6 && date.getHours() < 18 ? 'weather weather_sun' : 'weather weather_moon'}>
      <header className='weather_header'>
        <a className='weather_link' href="/https://www.weatherapi.com/">weatherapi.com</a>
        <button className='weather_menu' onClick={() => setShowMenu(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#fff" viewBox="0 0 24 24" stroke="#fff">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
      <main className='weather_info'>
        <section className='weather_info-wrapper'>
          {
            data.temp && (
              <>
                <div className='weather_info-status'>
                  <img className='weather_info-img' src={data.image} alt="" />
                  <p className='weather_info-text'>{data.status}</p>
                </div>
                <div className="weather_info-box">
                  <div className='weather_info-celcius'>
                    <p className='weather_info-number'>{data.temp}</p>
                    <span className='weather_info-symbol'>°</span>
                  </div>
                  <div className='weather_info-data'>
                    <p className='weather_info-location'>{data.cityName}</p>
                    <p className='weather_info-time'>{data.last_updated}</p>
                  </div>
                </div>
              </>
            )
          }
        </section>
      </main>
    </section>
  )
}

export default Weather