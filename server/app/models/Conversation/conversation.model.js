import mongoose from "mongoose";
import { conversationSchema } from "./conversation.schema.js";
const Conversation = mongoose.model('conversations', conversationSchema);

export default Conversation;