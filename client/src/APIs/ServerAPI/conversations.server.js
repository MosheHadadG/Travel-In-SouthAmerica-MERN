import axios from "axios";

const baseURL = "https://travel-in-southamerica-api.onrender.com/conversation";

export const getMyConversations = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/my-conversation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const conversations = response.data;
    return conversations;
  } catch (err) {
    return err;
  }
};

export const createConversation = async (token, receiverId) => {
  try {
    const response = await axios.post(
      `${baseURL}/new-conversation`,
      receiverId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const conversation = response.data;
    return conversation;
  } catch (err) {
    return err;
  }
};
