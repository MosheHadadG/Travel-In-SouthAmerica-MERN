import React from 'react'
import './Box.css'

function Box({srcIcon, title, desc}) {
  return (
    <div className='card-container'>
      <div className="card-icon">
        {srcIcon}
      </div>
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-description">
        <span>{desc}</span>
      </div>
    </div>
  )
}

export default Box