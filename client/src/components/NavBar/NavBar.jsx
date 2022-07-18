import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom"
import Avatar from '@mui/material/Avatar';

import { appContext } from "../../context/appContext";
import "./NavBar.css"
import "./NavBarResponsive.css"
function NavBar() {
  const path = useLocation().pathname;
  let location = path.split("/")[1];
  location = location === '404' ? 'NotFound' : location
  const { token, userLoggedIn, baseURL } = useContext(appContext);

  return (
    <div className={"background " + location}>
      <div className="header">
        <div className="top-header"></div>
        <div className="header-navbar">
          <ul className="header-nav-left">
            <li><NavLink exact activeClassName="active" to='/' >Home</NavLink></li>
            <li><NavLink exact activeClassName="active" to='/destinations' >Destinations</NavLink></li>
            <li><NavLink exact activeClassName="active" to='/attractions' >Attractions</NavLink></li>
          </ul>
          <div className="logo">
            <p><span className="grey"><i className="fa-solid fa-plane-departure"></i> TISA</span> <span className="logoSmall">Travel In South America</span></p>
          </div>
          <ul className="header-nav-right">
            {!token ?
              <>
                <li><NavLink exact activeClassName="active" to='/login' >Login</NavLink></li>
                <li><NavLink exact activeClassName="active" to='/signup' >Sign Up</NavLink></li>
              </> :
              <>
                <li className="welcome-avatar">
                  {`Welcome ${userLoggedIn.firstName} ${userLoggedIn.lastName}`}
                  <Avatar alt="avatar" sx={{ width: 56, height: 56 }} src={`${baseURL}/${userLoggedIn.avatar}`} />
                </li>
              </>
            }
          </ul>
        </div>
        {location === 'attractions' || location === 'destinations'
         || location === 'partners' || location === 'planning' 
         || location === 'profile' || location === 'chats' ?
          <div className="title-page">
            <h1>{ location !== 'profile' && location !== 'chats' && location[0].toUpperCase() + location.slice(1)}</h1>
          </div>
          : <></>
        }

      </div>
    </div>


  );
}

export default NavBar;