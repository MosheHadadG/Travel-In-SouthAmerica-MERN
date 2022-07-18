import React, { useContext, useEffect, useState } from 'react'
import { getUserById } from '../../../APIs/ServerAPI/users.server';
import { appContext } from '../../../context/appContext';
import './Conversation.css'
import './ConversationResponsive.css'

function Conversation({ conversation, onlineUsers }) {
  const { token, baseURL, userLoggedIn } = useContext(appContext);
  const [user, setUser] = useState(null);
  const [ onlineUser, setOnlineUser ] = useState(false);
  
  useEffect(() => {
    const friendId = conversation.members.find((member) => member !== userLoggedIn._id);

    const getUser = async () => {
      const user = await getUserById(token, friendId);
      if (user.response && user.response.status === 404) return;
      setUser(user);
    }
    getUser();

  }, [conversation]);

  useEffect(() => {
    if(user) {
      if(onlineUsers?.length > 0) {
        return setOnlineUser(onlineUsers.find((onlineUser) => onlineUser.userId === user._id));

      }
      return;
    }
  }, [user, onlineUsers])
  

  return (
    <div className='conversation'>
      <div className="conversationImgContainer">
        <img className='conversationImg' src={user && `${baseURL}/${user.avatar}`} alt="" />
        {onlineUser && <div className="chatOnlineBadge"></div>}
      </div>
      <span className="conversationName">{user && `${user.firstName} ${user.lastName}`}</span>
    </div>
  )
}

export default Conversation;