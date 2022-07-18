import axios from 'axios'

const baseURL = 'https://629509fe63b5d108c198f911.mockapi.io';

export const getDestinations = async () => {
  const response = await axios.get(`${baseURL}/destinations`);
  const destinations = response.data;
  return destinations;
}

export const getAttractions = async () => {
  const response = await axios.get(`${baseURL}/attractions`);
  const attractions = response.data;
  return attractions;
}
