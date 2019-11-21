import React, { useState, useEffect } from 'react';
import axios from 'axios'

import FilterInput from './components/FilterInput'
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <FilterInput searchFilter={searchFilter}
        handleSearchFilterChange={handleSearchFilterChange}
      />
      <CountryList countries={countries} searchFilter={searchFilter} />
    </div>
  );
}

export default App;
