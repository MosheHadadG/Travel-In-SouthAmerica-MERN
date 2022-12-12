import axios from "axios";
const baseURL = "https://travel-in-southamerica-api.onrender.com/destinations";

export const getDestinations = async () => {
  try {
    const response = await axios.get(`${baseURL}/all-destinations`);
    const destinations = response.data;
    return destinations;
  } catch (err) {
    return err;
  }
};

export const getDestinationByName = async (destinationName) => {
  try {
    const response = await axios.get(
      `${baseURL}/specific-destination/${destinationName}`
    );
    const destination = response.data;
    return destination;
  } catch (err) {
    return err;
  }
};
