import { createContext, useState } from "react";

export const appContext = createContext();

function ContextProvider({ children }) {
  const [token , setToken] = useState(null); 
  const [ userLoggedIn, setUserLoggedIn ] = useState(null);
  const [ baseURL, setBaseURL ] = useState('https://travel-in-southamerica-api.herokuapp.com');
  const [ socket, setSocket ] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([])
  

  const value = {
    token,
    setToken,
    userLoggedIn,
    setUserLoggedIn,
    baseURL,
    socket,
    setSocket,
    onlineUsers,
    setOnlineUsers
  }

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
}

export default ContextProvider;