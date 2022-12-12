import axios from "axios";
const baseURL = "https://travel-in-southamerica-api.onrender.com/attractions";

export const getAttractions = async () => {
  try {
    const response = await axios.get(`${baseURL}/all-attractions`);
    const attractions = response.data;
    return attractions;
  } catch (err) {
    return err;
  }
};

export const getAttractionById = async (attractionId) => {
  try {
    const response = await axios.get(
      `${baseURL}/specific-attraction/${attractionId}`
    );
    const attraction = response.data;
    return attraction;
  } catch (err) {
    return err;
  }
};
