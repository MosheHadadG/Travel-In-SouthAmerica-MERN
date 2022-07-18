import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { appContext } from '../../context/appContext';
import { userLogin } from '../../APIs/ServerAPI/users.server';
import Spinner from '../../components/Spinner/Spinner';
import { io } from "socket.io-client";


import './LoginPage.css'

const initialState = {
  email: '',
  password: '',
}


function LoginPage({ history }) {
  const { setToken, setUserLoggedIn, setSocket } = useContext(appContext);
  const [formLogin, setFormLogin] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState('')
  const [spinner, setSpinner] = useState(false)

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormLogin({ ...formLogin, [nameInput]: value })
  }

  const handleClick = async (event) => {
    event.preventDefault()
    if (!formLogin.email || !formLogin.password)
      return setErrorMsg("Please enter all fields");

    setSpinner(true);
    const userLogged = await userLogin(formLogin);
    setSpinner(false);
    if (userLogged.error) return setErrorMsg(userLogged.error);
    setSocket(io("https://travel-in-southamerica-api.herokuapp.com"));
    setToken(userLogged.token);
    setUserLoggedIn(userLogged.user);
    localStorage.setItem("user", JSON.stringify({ token: userLogged.token, user: userLogged.user }));
    history.push('/')
  }

  return (
    <div className='login-container'>
      {spinner ?
        <Spinner /> :
        <>
          <div className='login-title'>
            <h2>Log in</h2>
          </div>

          <form className='login-form' action="">
            <div className='login-inputs'>

              <input onChange={handleChange} placeholder="Email"
                name='email' value={formLogin.email} type="email" required />

              <input onChange={handleChange} placeholder="Password"
                name='password' autoComplete="true" password={formLogin.password} type="password" required />
            </div>

            <button onClick={handleClick} type='submit'>Login</button>
          </form>
          <div className='login-bottom'>
            {errorMsg && <h3 className='errorMsg'>{errorMsg}</h3>}
            <h3>Don't have an account yet? <Link to="/signup">Sign Up</Link></h3>

          </div>
        </>
      }
    </div>
  )
}

export default LoginPage;