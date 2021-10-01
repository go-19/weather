import { createContext, useState } from 'react';

const WeatherContext = createContext();

function Provider ({children}) {

  const [cityName, setCityName] = useState('Tashkent')
  const [showMenu, setShowMenu] = useState(false)

  const values = {cityName, setCityName, showMenu, setShowMenu}

  return (
    <>
      <WeatherContext.Provider value={values}>
        {children}
      </WeatherContext.Provider>
    </>
  )
}

export {
  Provider,
  WeatherContext
}