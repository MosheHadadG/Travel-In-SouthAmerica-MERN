import React, { useContext, useState } from 'react'
import { io } from "socket.io-client";
// import { myContext } from '../../context/myContext'
import { createUser } from '../../APIs/ServerAPI/users.server'
import RegisterForm from './RegisterForm/RegisterForm'
import Spinner from "../../components/Spinner/Spinner"

import './RegisterPage.css'
import './RegisterPageResponsive.css'
import { appContext } from '../../context/appContext'

const maleAvatar = 'uploads\\avatars\\695237a4-b9ba-4d3d-ae1b-2bc0a0af5379.jpeg'
const femaleAvatar = 'uploads\\avatars\\d6c3c19d-709e-4a4e-aa7f-0a677f98afd7.jpeg'

function RegisterPage({ history }) {
  const { setToken, setUserLoggedIn, setSocket } = useContext(appContext);
  const [errorMsg, setErrorMsg] = useState('')
  const [spinner, setSpinner] = useState(false)

  const createNewUser = async (newUser) => {
    const { firstName, lastName, email, password, gender, age, city } = newUser;
    if (!firstName || !lastName || !email
      || !password || !gender || !age || !city) return setErrorMsg('Please enter all fields');
    
    const avatar = gender === 'Male' ? maleAvatar : femaleAvatar;
    
    setSpinner(true);
    const userCreated = await createUser({ ...newUser, age: +age, avatar });
    setSpinner(false)

    if (userCreated.response && userCreated.response.status === 400)
      return setErrorMsg(userCreated.response.statusText);
    

    setSocket(io("https://travel-in-southamerica-api.herokuapp.com"));
    const userToken = userCreated.token;
    setToken(userToken);
    setUserLoggedIn(userCreated.user);
    localStorage.setItem("user", JSON.stringify({token: userToken, user: userCreated.user}));
    history.push('/')
  }

  return (
    <div className='register-container'>
      {spinner ?
        <Spinner /> :
        <>
          <div className='register-title'>
            <h2>Create a new account</h2>
          </div>
          <RegisterForm createNewUser={createNewUser} />
          <div className='register-bottom'>
            {errorMsg && <h3 className='errorMsg'>{errorMsg}</h3>}
          </div>
        </>
      }
    </div>
  )
}

export default RegisterPage;