import React, { useContext, useEffect, useState } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { appContext } from '../../../context/appContext';
import Avatar from '@mui/material/Avatar';
import './PartnerCard.css'
import './PartnerCardResponsive.css'


const PartnerCard = ({ user }) => {
  const { baseURL, onlineUsers } = useContext(appContext);
  const [onlineUser, setOnlineUser] = useState(false);

  useEffect(() => {
    if (onlineUsers?.length > 0) {
      return setOnlineUser(onlineUsers.find((onlineUser) => onlineUser.userId === user._id));
    }
    return;

  }, [onlineUsers])

  return (
    <Card>
      <Card.Content>
        <div className="partner-avatar">
          <Avatar
            className='partnerAvatarImg'
            alt="Profile Avatar"
            src={`${baseURL}/${user.avatar}`}
            sx={{ width: 200, height: 200 }}
          />
          {onlineUser && <div className="PartnerOnlineBadge"></div>}
        </div>
        <div className='partner-name-age'>
          <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
          <Card.Meta>{`${user.age}, ${user.city}`}</Card.Meta>
        </div>
        <Card.Description>
          {user.firstName} is a comedian living in Nashville.
        </Card.Description>
      </Card.Content>
      {/* <Card.Content extra>
          friend
      </Card.Content> */}
    </Card>
  )

}


export default PartnerCard;