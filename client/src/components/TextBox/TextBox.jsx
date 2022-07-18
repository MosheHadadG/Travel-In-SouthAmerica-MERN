import React from 'react'
import './TextBox.css'

function TextBox({ title, text }) {
  return (
    <div className='text-box ui raised segment'>
      <article>
        <h2>{title}</h2>
        <div className='content'>{text}</div>
      </article>
    </div>
  )
}

export default TextBox