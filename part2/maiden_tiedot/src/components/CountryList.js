import React from 'react'

import Country from './Country'

const CountryList = ({ countries, searchFilter, countryToShow, handleSetCountryToShowChange }) => {

  const showCountry = (name) => {
    if (name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return true
    }
    return false
  }

  const countriesToShow = () => {
    return countries.filter(country => showCountry(country.name) === true)
  }

  let rowsToShow = countriesToShow()

  if (countryToShow !== '') {
    let country = rowsToShow.find(country => country.alpha3Code === countryToShow)
    return (
      <Country key={country.alpha3Code} country={country} showDetailed={true} />
    )
  }

  if (rowsToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter.</p>
      </div>
    )
  }

  const rows = rowsToShow.map(country =>
    <Country key={country.alpha3Code} country={country}
      handleSetCountryToShowChange={handleSetCountryToShowChange}
      showDetailed={false} />
  )

  return (
    <ul>
      {rows}
    </ul>
  )
}

export default CountryList