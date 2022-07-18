import React, { useEffect } from 'react'
import './CountriesBox.css'
import './CountriesBoxResponsive.css'
import { countriesSouthAmerica } from '../countriesSouthAmerica'

function CountriesBox({ handleClickedCountry, countriesPlan }) {
  let countryInPlan;
  const renderedCountries = countriesSouthAmerica.map((country) => {
    countryInPlan = countriesPlan.includes(country)
    
    return (
      <div key={country.name} className="list-country">
        <button className={countryInPlan ? "btn-country btnClicked" : "btn-country"}
          name={country.name}
          onClick={() => handleClickedCountry(country)}>
            <img className='country-flag-btn' src={country.flag} alt="" />
          <p>{country.name}</p>
        </button>
      </div>

    );
  })

  return (
    <div className='countries-box'>
      <h4>Arrange the countries on your route</h4>
      <div className='list-countries'>
        {renderedCountries}

      </div>
    </div>
  )
}

export default CountriesBox