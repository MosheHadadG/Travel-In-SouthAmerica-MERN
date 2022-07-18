import axios from "axios";
const baseURL = 'https://travel-in-southamerica-api.herokuapp.com/users';

export const updatePlanning = async (token, planningBody) => {
  try {
    const response = await axios.patch(`${baseURL}/update-planning/`, planningBody, {
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

export const getPlanningById = async (token, planningId) => {
  try {
    const response = await axios.get(`${baseURL}/specific-planning/${planningId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const planning = response.data;
    return planning;

  } catch (err) {
    return err;
  }
}

export const deleteMyPlanning = async (token) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-planning`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userAfterRemovePlanning = response.data;
    return userAfterRemovePlanning;

  } catch (err) {
    return err;
  }
}