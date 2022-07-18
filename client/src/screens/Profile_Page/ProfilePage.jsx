import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { appContext } from '../../context/appContext';
import { getUserById } from '../../APIs/ServerAPI/users.server';
import { createConversation } from '../../APIs/ServerAPI/conversations.server';

import Spinner from '../../components/Spinner/Spinner'
import TextBox from '../../components/TextBox/TextBox'
import EditProfileBox from './Edit_Profile_Box/EditProfileBox';
import EditAvatarBox from './Edit_Avatar_Box/EditAvatarBox';

import './ProfilePage.css'
import './ProfilePageResponsive.css'




function ProfilePage(props) {
  const { token, userLoggedIn, baseURL, onlineUsers } = useContext(appContext);
  const [profile, setProfile] = useState({});
  const [editProfileMode, setEditProfileMode] = useState(false)
  const [editAvatarMode, setEditAvatarMode] = useState(false);
  const [onlineUser, setOnlineUser] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getUserById(token, props.match.params.id);
      if (user.response && user.response.status === 404) return props.history.push('/404');
      setProfile(user);
    }
    fetchProfile();

  }, [])

  useEffect(() => {
    if (Object.keys(profile) === 0) return;
    if (onlineUsers?.length > 0) {
      return setOnlineUser(onlineUsers.find((onlineUser) => onlineUser.userId === profile._id));
    }
    return;

  }, [profile, onlineUsers])

  const handleNewConversation = async () => {
    const conversation = await createConversation(token, { receiverId: profile._id });
    props.history.push('/chats');
  }

  function withoutTime(dateTime) {
    const date = new Date(dateTime);
    const dateWithoutTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    return dateWithoutTime;
  }

  const profilePlanningText = (profile) => {
    const { departureDate, returnDate, budget, countriesPlan } = profile.planning;
    const departureDateWithoutTime = withoutTime(departureDate);
    const returnDateWithoutTime = withoutTime(returnDate);

    return (
      <>
        <div className='date-budget-left-side'>
          <h4>Departue Date: <span className='orangeColor'>{departureDateWithoutTime}</span></h4>
          <h4>Return Date: <span className='orangeColor'>{returnDateWithoutTime}</span></h4>
          <h4>Budget: <span className='orangeColor'>{budget}$</span></h4>
        </div>
        <div className='countries-button-right-side'>
          <h4>Start: <span className='orangeColor'>{countriesPlan[0].name}</span></h4>
          <h4>End: <span className='orangeColor'>{countriesPlan[countriesPlan.length - 1].name}</span></h4>
          <Link to={`/planning/${profile.planning._id}`}><button className='ui secondary button'>Trip Page</button></Link>
        </div>
      </>
    );
  }

  const profileInterestsText = ({ interests }) => {
    const interestsText = interests.map((interest) => <div key={interest}>{interest}</div>)
    return (
      <div className='profile-interests'>
        {interestsText}
      </div>

    );
  }

  return (
    <div className='profile-page'>
      {editAvatarMode &&
        <EditAvatarBox
          setProfile={(user) => setProfile(user)}
          closeEditAvatar={() => setEditAvatarMode(false)} />
      }

      {editProfileMode &&
        <EditProfileBox
          setProfile={(user) => setProfile(user)}
          closeEditProfile={() => setEditProfileMode(false)} />}

      {Object.keys(profile).length > 0 ?
        <>
          <div className="profile-page-main">
            <div className="profile-avatar">
              <Avatar
                onClick={profile._id === userLoggedIn._id ? () => setEditAvatarMode(true) : null}
                alt="Profile Avatar"
                src={`${baseURL}/${profile.avatar}`}
                sx={{ width: 250, height: 250 }}
              />
              {onlineUser && <div className="ProfileOnlineBadge"></div>}
            </div>


            <div className='profile-name'>
              <h3>{`${profile.firstName} ${profile.lastName} `}</h3>
            </div>
            <div className='profile-age-city'>
              <h5>{`${profile.age}, ${profile.city}`}</h5>
            </div>
            
            {profile._id === userLoggedIn._id ?
              <div className='profile-edit-button'>
                <button onClick={() => setEditProfileMode(true)}
                  className='ui secondary button editProfile'><i
                    className="fa-solid fa-pen-to-square"></i>
                  Edit Profile
                </button>
              </div>
              :
              <div className='send-msg-button'>
                <button className='ui secondary button startConversation' onClick={handleNewConversation}>
                  <i className="fa-solid fa-message"></i>
                  Start Conversation
                </button>
              </div>
            }

            <div className='profile-bottom'>
              <TextBox title='About:' text={profile.about ?
                (profile.about) : ("There is no about yet...")} />
              <TextBox title='Interests:'
                text={profile.interests && profile.interests.length !== 0 ?
                  (profileInterestsText(profile)) : ("There is no interests yet...")} />
              <TextBox title='Planning:'
                text={profile.planning ?
                  (profilePlanningText(profile)) : ('There is no planning yet...')
                } />
            </div>
            <div className="bottom"></div>

          </div>
        </> :
        <Spinner />
      }
    </div>
  )
}

export default ProfilePage