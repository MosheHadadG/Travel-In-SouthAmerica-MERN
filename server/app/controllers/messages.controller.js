import Message from "../models/Message/message.model.js";

export const createMessage = async (req, res) => {
  const { conversationId, text} = req.body;
  const userId = req.user._id;
  const newMessage = new Message({
    conversationId,
    senderId: userId,
    text
  });

  try {
    const savedMessage = await newMessage.save();
    res.send(savedMessage);

  } catch (err) {
    res.status(500).send(err);
  }
}

export const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({ 
      conversationId: req.params.conversationId
    })
    res.send(messages);
 
  } catch (err) {
    res.status(500).send(err);
  }

}