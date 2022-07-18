import { BrowserRouter, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { appContext } from './context/appContext';
import { getMyUser } from './APIs/ServerAPI/users.server';
import { io } from "socket.io-client";

import NavBar from './components/NavBar/NavBar';
import HomePage from './screens/Home_Page/HomePage';
import LoginPage from './screens/Login_Page/LoginPage';
import AttractionsPage from './screens/Attractions_Page/AttractionsPage'
import RegisterPage from './screens/Register_Page/RegisterPage';
import DestinationsPage from './screens/Destinations_Page/DestinationsPage';
import AsideBar from './components/AsideBar/AsideBar';
import PartnersPage from './screens/Partners_Page/PartnersPage';
import PlanningPage from './screens/Planning_Page/PlanningPage';
import ProfilePage from './screens/Profile_Page/ProfilePage';
import PageNotFound from './screens/Page_Not_Found/PageNotFound';
import TripPage from './screens/Trip_Page/TripPage';
import ChatPage from './screens/Chat_Page/ChatPage';

import './App.css';
// import Footer from './components/Footer/Footer';
import DestinationPage from './screens/Destination_Page/DestinationPage';
import AttractionPage from './screens/Attraction_Page/AttractionPage';




function App() {
  const { token, setToken, 
    setUserLoggedIn, userLoggedIn, setSocket, socket, setOnlineUsers } = useContext(appContext)

  const fetchUserLoggedIn = async (token, user) => {
    const userLoggedIn = await getMyUser(token);
    if(!userLoggedIn) return;
    setUserLoggedIn(userLoggedIn.user);
    setSocket(io("https://travel-in-southamerica-api.herokuapp.com/"));
    user.user = userLoggedIn.user;
    localStorage.setItem('user', JSON.stringify(user));
  } 

  useEffect(() => {
    setSocket(null);
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage)
      setToken(user.token);
      setUserLoggedIn(user.user);
      fetchUserLoggedIn(user.token, user);  
    }
  }, [])

  useEffect(() => {
    if(!userLoggedIn) return;
    if(!socket) return;
    socket.emit("addUser", userLoggedIn._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users)
    })

  }, [socket])



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/destinations" component={DestinationsPage} />
        <Route exact path="/destinations/:destName" component={DestinationPage} />
        <Route exact path="/attractions" component={AttractionsPage} />
        <Route exact path="/attractions/:attrId" component={AttractionPage} />
        <Route exact path="/404" component={PageNotFound} />

        {!token ?
          <>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={RegisterPage} />

          </> :
          <>
            <AsideBar />
            <Route exact path="/partners" component={PartnersPage} />
            <Route exact path="/planning" component={PlanningPage} />
            <Route exact path="/planning/:id" component={TripPage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/chats" component={ChatPage} />
          </>
        }
       {/* <Footer /> */}
      </BrowserRouter >
    </div>
  );
}

export default App;
