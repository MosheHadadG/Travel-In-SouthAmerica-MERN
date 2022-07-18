import express from "express";
import Message from "../models/Message/message.model.js";
import { auth } from "../middleware/auth.js"
import { createMessage, getMessagesByConversationId } from "../controllers/messages.controller.js";

export const messagesRouter = express.Router();


// add message

messagesRouter.post('/new-message', auth, createMessage)

// get messages by Conversation Id

messagesRouter.get('/:conversationId', auth,  getMessagesByConversationId)