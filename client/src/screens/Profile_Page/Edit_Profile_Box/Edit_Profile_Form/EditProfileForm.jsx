import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import './EditProfileForm.css'
import { appContext } from '../../../../context/appContext';
import EditProfieCheckBoxes from './EditProfieCheckBoxes';


function EditProfileForm({ closeEditProfile, handleUpdateUser }) {
  const { userLoggedIn } = useContext(appContext);
  const { firstName, lastName, city, about, interests, age } = userLoggedIn;

  const initialState = {
    firstName,
    lastName,
    city,
    about,
    interests,
    age,
  }
  const [editProfileForm, setEditProfileForm] = useState(initialState)

  const handleChange = ({ target: { name, value } }) => {
    setEditProfileForm({ ...editProfileForm, [name]: value })
  }

  const handleUpdateInterests = (updatedInterests) => {
    setEditProfileForm({ ...editProfileForm, interests: updatedInterests })
  }


  return (
    <div className='edit-profile-form'>
      <div className='edit-profile-name'>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name='firstName'
            label="First Name"
            onChange={handleChange}
            defaultValue={firstName}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            defaultValue={lastName}
          />
        </FormControl>
      </div>
      <div className="edit-age-city">
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name='age'
            label="Age"
            onChange={handleChange}
            type="number"
            defaultValue={age}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name="city"
            label="City"
            onChange={handleChange}
            defaultValue={city}
          />
        </FormControl>
      </div>
      <div className='edit-about'>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            placeholder="About..."
            multiline
            onChange={handleChange}
            name="about"
            defaultValue={about}
            rows={4}
          
          />
        </FormControl>
      </div>
      <div className="edit-interests">
        <EditProfieCheckBoxes handleUpdateInterests={handleUpdateInterests} />
      </div>
      <div className="edit-buttons">
        <button onClick={() => handleUpdateUser(editProfileForm)} className="ui secondary button">
          Save
        </button>
        <button onClick={closeEditProfile} className="ui button">
          Cancel
        </button>
      </div>

    </div>
  )
}

export default EditProfileForm