import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { userLogout } from '../../APIs/ServerAPI/users.server';
import { appContext } from '../../context/appContext';

import './AsideBar.css'
import './AsideBarResponsive.css'
function AsideBar({ history }) {
  // Global State
  const { token, setToken, setUserLoggedIn, userLoggedIn, socket, setSocket } = useContext(appContext);


  const handleLogout = async () => {
    const logout = await userLogout(token);
    if (logout.status === 200) {
      localStorage.removeItem('user')
      setToken(null)
      setUserLoggedIn(null)
      socket.disconnect();
      setSocket(null);
    }
  }

  return (
    <aside className='adise-bar'>
      <nav className='aside-nav'>
        <ul className='aside-ul'>

          <NavLink exact activeClassName="aside-active" to={`/profile/${userLoggedIn._id}`} ><i className="fa-solid fa-user"></i> <li>My Profile</li></NavLink>
          <NavLink exact activeClassName="aside-active" to='/planning' ><i className="fa-solid fa-plane"></i> <li>Planning Trip</li></NavLink>
          <NavLink exact activeClassName="aside-active" to='/partners' ><i className="fa-solid fa-handshake"></i> <li>Partners</li></NavLink>
          <NavLink exact activeClassName="aside-active" to='/chats' ><i className="fa-solid fa-comments"></i> <li>Chats</li></NavLink>
          <Link onClick={handleLogout} to="/"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</Link>


        </ul>
      </nav>
    </aside>
  )
}

export default AsideBar