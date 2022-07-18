import mongoose from "mongoose";

export const conversationSchema = mongoose.Schema({
  members: {
    type: Array
  }
},
{ timestamps: true }
)

