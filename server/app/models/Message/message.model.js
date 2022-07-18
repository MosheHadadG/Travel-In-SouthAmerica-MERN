import mongoose from "mongoose";
import { messageSchema } from "./message.schema.js";

const Message = mongoose.model('messages', messageSchema);

export default Message;