import express from "express";
import { createDestination, getDestinationByName, getDestinations } from "../controllers/destinations.controller.js";
import { auth } from "../middleware/auth.js";


export const destinationsRouter = express.Router();

// new destination
destinationsRouter.post('/new-destination', auth , createDestination);

// get all destinations
destinationsRouter.get('/all-destinations', getDestinations);

// get destination by name
destinationsRouter.get('/specific-destination/:destName', getDestinationByName)
