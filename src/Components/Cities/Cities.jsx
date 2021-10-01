import { useContext, useRef, useState } from 'react'
import './Cities.css'
import { cities } from '../../CityNames'
import { WeatherContext } from '../../Context/Context'

function Cities() {

  const [output, setOutput] = useState([])
  const [typing, setTyping] = useState(false)
  const searchTerm = useRef()
  const { cityName, setCityName, showMenu, setShowMenu } = useContext(WeatherContext)

  const getSearchTerm = () => {
    setOutput([])
    if (searchTerm.current.value) {
      setTyping(true)
      cities.filter(item => {
        return item.toLowerCase().includes(searchTerm.current.value.toLowerCase()) ? (
          setOutput(output => [...output, item])
        ) : null
      })
    } else {
      setTyping(false)
    }
  }

  const getCityName = evt => {
    setCityName(evt.target.textContent)
    setShowMenu(false)
  }

  return (
    <section className={showMenu ? 'show_menu' : 'cities'}>
      <div className='cities_wrapper'>
        <div className='cities_wrapper-top'>
          <input className='cities_search-input' ref={searchTerm} spellCheck='false' onChange={getSearchTerm} type="text" placeholder="Search location" />
          <button className='close_menu' onClick={() => setShowMenu(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className='cities_list'>
          {
            typing ? (
              output.map((city, index) => {
                return (
                  <li className={cityName === city ? 'active cities_item' : 'cities_item'} key={index}>
                    <button className='cities_item-btn' onClick={getCityName} type='button'>{city}</button>
                  </li>
                )
              })
            ) : (
              cities.map((city, index) => {
                return (
                  <li className={cityName === city ? 'active cities_item' : 'cities_item'} key={index}>
                    <button className='cities_item-btn' onClick={getCityName} type='button'>{city}</button>
                  </li>
                )
              })
            )
          }
        </ul>
      </div>
    </section>
  )
}

export default Cities