import Destination from "../models/Destination/destionation.model.js";

export const createDestination = async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).send(savedDestination);

  } catch (err) {
    res.status(500).send(err);
  }
}

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.send(destinations);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const getDestinationByName = async (req, res) => {
  try {
    const destination = await Destination.findOne({name: req.params.destName})
    if(!destination) return res.status(404).send({error: "Destination No Found"})
    res.send(destination);

  } catch (err) {
    res.status(500).send(err);
  }
}