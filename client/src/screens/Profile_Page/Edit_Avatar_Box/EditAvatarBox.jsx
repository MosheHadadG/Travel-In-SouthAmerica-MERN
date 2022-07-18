import React, { useContext, useEffect, useRef, useState } from 'react'
import { updateMyUser, uploadMyAvatar } from '../../../APIs/ServerAPI/users.server';
import { appContext } from '../../../context/appContext';
import Avatar from '@mui/material/Avatar';

import './EditAvatarBox.css'
import Spinner from '../../../components/Spinner/Spinner';


function EditAvatarBox({ closeEditAvatar, setProfile }) {
  const { token, userLoggedIn, setUserLoggedIn, baseURL } = useContext(appContext);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spinner, setSpinner] = useState(false)


  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);

  }, [file])


  const pickedHandler = ({ target }) => {

    if (target.files && target.files.length === 1) {
      const pickedFile = target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }

  const handleUpdateAvatar = async () => {
    if (isValid) {
      setSpinner(true)
      const userAfterUploadAvatar = await uploadMyAvatar(token, file);
      setSpinner(false);

      if (userAfterUploadAvatar.response && userAfterUploadAvatar.response.status === 400) {
        return setErrorMsg(userAfterUploadAvatar.response.data.error);
      }
      closeEditAvatar()
      setUserLoggedIn(userAfterUploadAvatar);
      setProfile(userAfterUploadAvatar);

    }
    setErrorMsg('Pick image')
  }

  // const pickImageHandler = () => {
  //   filePickerRef.current.click();
  // }

  // const filePickerRef = useRef();

  return (
    <div className="edit-avatar-box">
      <div className="edit-avatar-content">
        {spinner ? <Spinner /> :
          <>
            <div className="ui vertical segment">
              <h2>Edit Avatar</h2>
            </div>

            <div className="edit-avatar">
              <div className='edit-avatar-form'>
                <Avatar
                  alt="Profile Avatar"
                  className='profile-avatar-preview'
                  src={previewUrl ? previewUrl : `${baseURL}/${userLoggedIn.avatar}`}
                  sx={{ width: 300, height: 300 }}
                />
                <div className="edit-avatar-inputs">
                  <input
                    // ref={filePickerRef}
                    type="file"
                    accept='.jpg, .png, .jpeg'
                    onChange={pickedHandler}
                  />
                </div>
                <div className="edit-avatar-msg">
                  {errorMsg && <p>{errorMsg}</p>}
        
                </div>
                <div className="edit-buttons">
                  <button onClick={handleUpdateAvatar} className="ui secondary button">
                    Save
                  </button>
                  <button onClick={closeEditAvatar} className="ui button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default EditAvatarBox;