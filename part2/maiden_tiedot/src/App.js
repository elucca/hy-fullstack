import React, { useState, useEffect } from 'react';
import axios from 'axios'

import FilterInput from './components/FilterInput'
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  // If countryToShow is not empty, show information for that country rather than the
  // full country list.
  const [countryToShow, setCountryToShow] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchFilterChange = (event) => {
    setCountryToShow('')
    setSearchFilter(event.target.value)
  }

  const handleSetCountryToShowChange = (alpha3Code) => {
    setCountryToShow(alpha3Code);
  }

  return (
    <div>
      <FilterInput searchFilter={searchFilter}
        handleSearchFilterChange={handleSearchFilterChange}
      />
      <CountryList countries={countries} searchFilter={searchFilter}
        countryToShow={countryToShow}
        handleSetCountryToShowChange={handleSetCountryToShowChange}
      />
    </div>
  );
}

export default App;
