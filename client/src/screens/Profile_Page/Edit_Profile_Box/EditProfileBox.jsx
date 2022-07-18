import React, { useContext, useState } from 'react'
import { updateMyUser } from '../../../APIs/ServerAPI/users.server';
import { appContext } from '../../../context/appContext';
import EditProfileForm from './Edit_Profile_Form/EditProfileForm'

import './EditProfileBox.css'
import Spinner from '../../../components/Spinner/Spinner';


function EditProfileBox({ closeEditProfile, setProfile }) {
  const { token, setUserLoggedIn } = useContext(appContext);
  const [spinner, setSpinner] = useState(false)

  const handleUpdateUser = async (updatedUser) => {
    setSpinner(true)
    const userAfterUpdate = await updateMyUser(token, updatedUser);
    setSpinner(false)
    if (!userAfterUpdate) return;
    closeEditProfile()

    setUserLoggedIn(userAfterUpdate);
    setProfile(userAfterUpdate)
    
    const userLocalStorage = localStorage.getItem('user');
    const user = JSON.parse(userLocalStorage)
    user.user = userAfterUpdate
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <div className="edit-profile-box">
      <div className="edit-profile-content">
        {spinner ? <Spinner /> :
          <>
            <div className="ui vertical segment">
              <h2>Edit Profile</h2>
            </div>
            <div className="edit-profile">
              <EditProfileForm handleUpdateUser={handleUpdateUser} closeEditProfile={closeEditProfile} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default EditProfileBox;