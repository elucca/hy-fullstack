import React from 'react'
import Languages from './Languages'

const Country = ({ country, showDetailed }) => {
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
      {country.name}
    </li>
  )


}

export default Country