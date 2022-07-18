import axios from 'axios';

const baseURL = 'https://travel-in-southamerica-api.herokuapp.com/users';


export const createUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/create-user`, newUser);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const userLogin = async (userLogin) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userLogin);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const userLogout = async (token) => {
  const response = await axios.post(`${baseURL}/logout`, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response;
}

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/all-users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const users = response.data;
    return users;

  } catch (err) {
    return err;
  }

}

export const getMyUser = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/my-user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const myUser = response.data;
    return myUser;

  } catch (err) {
    return err;
  }
}

export const updateMyUser = async (token, updatedUser) => {
  try {
    const response = await axios.put(`${baseURL}/update-my-user`, updatedUser, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const uploadMyAvatar = async (token, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile)
    const response = await axios.post(`${baseURL}/upload-avatar`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const uploadAvatar = response.data;
    return uploadAvatar;

  } catch (err) {
    return err;
  }
}

export const getUserById = async (token, id) => {
  try {
    const response = await axios.get(`${baseURL}/specific-user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

