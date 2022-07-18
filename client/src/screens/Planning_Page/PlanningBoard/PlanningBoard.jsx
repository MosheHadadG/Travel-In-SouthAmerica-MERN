import React, { useEffect } from 'react'
import routeDashedLine from "../../../images/planning-page/route-planning.png"
import './PlanningBoard.css'
import './PlanningBoardResponsive.css'



function PlanningBoard({ countriesPlan, handleRemovedCountryPlan }) {



  const renderedCountriesInPlan = countriesPlan.map((country) => {
    return (
      <div
        onClick={({ target }) => handleRemovedCountryPlan((target.alt))}
        key={country.name}
        className="country-in-plan">
          <img src={country.flag} alt={country.name} />
        <img className='route-dashed-line' src={routeDashedLine} alt="Dashed Line" />
      </div>
    );
  })
  return (
    
    <div className='planning-board'>
      {/* <h3>You can remove a country by clicking on the country flag</h3> */}
      <div className='countries-in-plan'>
        <h3>Start <i className="fa-solid fa-plane"></i></h3>
        {renderedCountriesInPlan}
        <h3>End <i className="fa-solid fa-house"></i></h3>
      </div>

    </div>
  )
}

export default PlanningBoard