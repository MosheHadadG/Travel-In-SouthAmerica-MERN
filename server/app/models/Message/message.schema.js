import mongoose from "mongoose";

export const messageSchema = mongoose.Schema({

  conversationId: {
    type: mongoose.Types.ObjectId
  },

  senderId: {
    type: mongoose.Types.ObjectId
  },
  
  text: {
    type: String
  }
},
{ timestamps: true }
)

