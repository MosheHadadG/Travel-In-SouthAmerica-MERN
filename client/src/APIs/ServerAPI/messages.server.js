import axios from "axios";

const baseURL = "https://travel-in-southamerica-api.onrender.com/messages";

export const getMessagesByConversationId = async (token, conversationId) => {
  try {
    const response = await axios.get(`${baseURL}/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const messages = response.data;
    return messages;
  } catch (err) {
    return err;
  }
};

export const sendMessage = async (token, message) => {
  try {
    const response = await axios.post(`${baseURL}/new-message`, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resMessage = response.data;
    return resMessage;
  } catch (err) {
    return err;
  }
};
