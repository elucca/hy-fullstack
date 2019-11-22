import React from 'react'
import Languages from './Languages'

const Country = ({ country, handleSetCountryToShowChange, showDetailed }) => {
  if (showDetailed) {
    return (
      <div>
        <h1>{country.name}</h1>

        <ul>
          <li>Capital: &nbsp; {country.capital}</li>
          <li>Population: &nbsp; {country.population}</li>
        </ul>

        <Languages country={country} />
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