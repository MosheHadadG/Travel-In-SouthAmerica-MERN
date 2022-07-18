import React, { useContext, useEffect, useRef, useState } from 'react'
import { getMyConversations } from '../../APIs/ServerAPI/conversations.server'
import { getMessagesByConversationId, sendMessage } from '../../APIs/ServerAPI/messages.server'
import { getUserById } from '../../APIs/ServerAPI/users.server'
import { appContext } from '../../context/appContext'
import Conversation from './Conversation/Conversation'
import Message from './Message/Message'

import './ChatPage.css'
import './ChatPageResponsive.css'



function ChatPage() {
  const { userLoggedIn, token, socket, onlineUsers } = useContext(appContext);
  const [conversations, setConversations] = useState([]);
  const [filterConversations, setFilterConversations] = useState([]);
  const [ term, setTerm ] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [userCurrentChat, setUserCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);


  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      const conversations = await getMyConversations(token);
      setConversations(conversations);
    }
    getConversations();
  }, [])

  useEffect(() => {
    if(!socket) return;
    // socket.current = io("ws://localhost:5050")
    //  data from socket server
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    })
  },[socket])

  useEffect(() => {
    if (!arrivalMessage) return;
    if (!currentChat) return;
    currentChat.members.includes(arrivalMessage.senderId) &&
      setMessages(prev => [...prev, arrivalMessage])

  }, [arrivalMessage, currentChat])



  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        const messages = await getMessagesByConversationId(token, currentChat._id);
        setMessages(messages);
      }
      const getUserCurrentChat = async () => {
        const friendId = currentChat.members.find((member) => member !== userLoggedIn._id);
        const user = await getUserById(token, friendId);
        if (user.response && user.response.status === 404) return;
        setUserCurrentChat(user);
      }
      getMessages();
      getUserCurrentChat();
    }

  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      text: newMessage
    }

    const receiverId = currentChat.members.find((member) => member !== userLoggedIn._id)
    // To Socket Server 
    socket.emit("sendMessage", {
      senderId: userLoggedIn._id,
      receiverId: receiverId,
      text: newMessage
    });

    // To MongoDB
    const resMessage = await sendMessage(token, message);
    setMessages([...messages, resMessage]);
    setNewMessage('')

  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })

  }, [messages])


  return (

    <div className='chats-page-main'>
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <input 
          type="text" 
          placeholder='Search for friends' 
          className='chatMenuInput' />
  
          {conversations.slice(0).reverse().map((conversation) => {
            return (
              <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                <Conversation conversation={conversation} onlineUsers={onlineUsers} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-box-wrapper">
          {
            currentChat ?

              <>
                <div className="chat-box-top">
                  <h2 className='conversationWithText'>
                    {`Conversation with ${userCurrentChat?.firstName} ${userCurrentChat?.lastName}`}
                  </h2>
                  {
                    messages.map((message, idx) => {
                      return (
                        <div key={message._id ? message._id : idx} ref={scrollRef}>
                          <Message
                            message={message}
                            user={userCurrentChat}
                            own={message.senderId === userLoggedIn._id} />
                        </div>
                      )
                    })
                  }

                </div>
                <div className="chat-box-bottom">
                  <textarea
                    className="chat-message-input"
                    placeholder='Write a message...'
                    onChange={({ target }) => setNewMessage(target.value)}
                    value={newMessage}
                  >
                  </textarea>
                  <button className="ui secondary button" onClick={handleSubmit}>Send</button>
                </div>
              </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
        </div>
      </div>
      {/* <div className="chat-online">
        <div className="chat-online-wrapper">
          <ChatOnline />
        </div>
      </div> */}
    </div>

  )
}

export default ChatPage