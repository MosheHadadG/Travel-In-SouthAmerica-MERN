import mongoose from "mongoose";
import Conversation from "../models/Conversation/conversation.model.js";


export const createConversation = async (req, res) => {
  const existConversation = await Conversation.find({ members: {"$all": [req.user._id, mongoose.Types.ObjectId(req.body.receiverId)]} })
  if (existConversation.length > 0) return res.send({error: 'Conversation Already Exist!'});
  const newConversation = new Conversation({
    members: [req.user._id, mongoose.Types.ObjectId(req.body.receiverId)]
  })

  try {
    const savedConversation = await newConversation.save();
    res.send(savedConversation);

  } catch (err) {
    res.status(500).send(err);
  }
}

export const getMyConversations = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { "$in": [req.user._id] }
    });
    res.send(conversation)

  } catch (err) {
    res.status(500).send(err);
  }

}