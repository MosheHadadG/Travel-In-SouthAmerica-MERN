import React, { useState } from 'react'
import './RegisterForm.css'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  age: '',
  city: '',
}

function RegisterForm({ createNewUser }) {
  const [formRegister, setRegisterForm] = useState(initialState)

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setRegisterForm({ ...formRegister, [nameInput]: value })
  }

  const handleClick = (event) => {
    event.preventDefault()
    return formRegister;
  }

  return (

    <form className='register-form'>
      <div className='register-inputs'>

        <div className='register-first-last-name'>
          <input onChange={handleChange} placeholder="First Name"
            name='firstName' value={formRegister.firstName} type="text"  required/>

          <input onChange={handleChange} placeholder="Last Name"
            name='lastName' value={formRegister.lastName} type="text" required/>
        </div>

        <div className='register-email'>
          <input onChange={handleChange} placeholder="Email"
            name='email' value={formRegister.email} type="email" required/>
        </div>

        <div className='register-password'>
          <input onChange={handleChange} placeholder="Password"
            name='password' autoComplete='true' password={formRegister.password}
             type="password"  required/>
        </div>

        <div className='register-age-city'>
          <input onChange={handleChange} placeholder="Age (In Years)"
            name='age' value={formRegister.age} type="number"  required/>


          <input onChange={handleChange} placeholder="City"
            name='city' value={formRegister.city} type="text" />
        </div>
{/* 
        <div className='register-profile-img'>
          <input onChange={handleChange} placeholder="Profile Image (URL)"
            name='urlAvatar' value={formRegister.urlAvatar} type="file" />
        </div> */}

        {/* <div className='profile-img-preview'>
          <div className="avatar-preview"></div>

        </div> */}

        <div className='register-gender'>
          <select onChange={handleChange}
            name="gender" defaultValue='Default'>
            <option value="Default" disabled>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>


      </div>

      <button onClick={(event) => createNewUser(handleClick(event))} type='submit'>Sign Up</button>
    </form>
  )
}

export default RegisterForm