import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { appContext } from '../../../context/appContext'
import './Message.css'

function Message({ message, own, user }) {

  const { baseURL, userLoggedIn } = useContext(appContext);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Link to={`/profile/${own ? userLoggedIn._id : user?._id}`}>
          <img
            className="messageImg"
            src={own ? `${baseURL}/${userLoggedIn.avatar}` : `${baseURL}/${user?.avatar}`}
            alt="" />
        </Link>
        <p className="messageText">{message && message.text}</p>
      </div>
      <div className="messageBottom">
        {message && format(message.createdAt)}
      </div>
    </div>
  )
}

export default Message