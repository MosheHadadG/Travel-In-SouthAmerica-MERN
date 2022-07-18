import React from 'react'
import './Card.css'

function Card({imgSrc, title}) {
  return (
    <div className="card-att-des">
      <div className="card-img">
        <img src={imgSrc} alt="" />
        <div className="card-title">
          <p>{title}</p>
        </div>
      </div>
    </div>
  )
}

export default Card