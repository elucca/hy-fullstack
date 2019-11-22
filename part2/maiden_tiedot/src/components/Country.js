import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Languages from './Languages'
import Weather from './Weather'

const Country = ({ country, handleSetCountryToShowChange, showDetailed }) => {

  const [weather, setWeather] = useState()

  // Weather API lookup
  // lol exposed throwaway key
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=9e24e35d2c73ae54ac38255c6e95da30&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country.capital])

  if (showDetailed) {
    return (
      <div>
        <h1>{country.name}</h1>

        <ul>
          <li>Capital: &nbsp; {country.capital}</li>
          <li>Population: &nbsp; {country.population}</li>
        </ul>

        <Languages country={country} />

        <Weather city={country.capital} weather={weather} />

        <img src={country.flag} alt={'Flag'} />

      </div>
    )
  }

  return (
    <li>
      {country.name}&nbsp;
      <button name={country.alpha3Code} onClick={() => handleSetCountryToShowChange(country.alpha3Code)}>
        show
      </button>
    </li>
  )


}

export default Country