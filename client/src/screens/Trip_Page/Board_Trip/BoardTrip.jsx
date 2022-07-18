import React, { useState } from 'react'
import { useEffect } from 'react'
import BoxFlag from '../Box_Flag/BoxFlag'
import './BoardTrip.css'
import './BoardTripResponsive.css'
function BoardTrip({ countriesPlan }) {
  const [countriesPlanDelay, setCountriesPlanDelay] = useState([])

  useEffect(() => {
    countriesPlan.forEach((country, idx) => {
      setTimeout(() => {
        setCountriesPlanDelay(prev => [...prev, country])
      }, idx * 450)
    })

  }, [])

  return (
    <div className='board-trip'>
      {countriesPlanDelay?.map((country) => {
        return <BoxFlag key={country.name} name={country.name} flagSrc={country.flagWaving} />
      })}

    </div>
  )
}

export default BoardTrip