import express from "express";
import { createAttraction, getAttractionById, getAttractions } from "../controllers/attractions.controller.js";
import { auth } from "../middleware/auth.js";


export const attractionsRouter = express.Router();

// new attractions
attractionsRouter.post('/new-attraction', auth , createAttraction);

// get all attractions
attractionsRouter.get('/all-attractions', getAttractions);

// get attractions by name
attractionsRouter.get('/specific-attraction/:attrId', getAttractionById)
