import React from 'react'
import { Link } from 'react-router-dom'
import routeDashedLine from "../../../images/planning-page/route-planning.png"
import './BoxFlag.css'
import './BoxFlagResponsive.css'


function BoxFlag({name, flagSrc}) {
  return (
    <div className='box-flag'>
      <div className="box-flag-img">
        <Link to={`/destinations/${name}`}><img src={flagSrc} alt={ `${name} image`} /></Link>
      </div>
      <div className='box-flag-title'>
        <h2>{name.toUpperCase()}</h2>
      </div>
      <div className='box-dashed-route-line'>
      <img src={routeDashedLine} alt="Dashed Line" />

      </div>
    </div>
  )
}

export default BoxFlag