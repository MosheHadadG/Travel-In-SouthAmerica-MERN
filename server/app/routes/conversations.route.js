import express from "express";
import { auth } from "../middleware/auth.js"
import { createConversation, getMyConversations } from "../controllers/conversations.controller.js";



export const conversationsRouter = express.Router();



// new conversation
conversationsRouter.post('/new-conversation', auth , createConversation)

// get conv of a user
conversationsRouter.get('/my-conversation', auth, getMyConversations)