import mongoose from "mongoose";
import Attraction from "../models/Attraction/attraction.model.js";
export const createAttraction = async (req, res) => {
  try {
    const newAttraction = new Attraction(req.body);
    const savedAttraction = await newAttraction.save();
    res.status(201).send(savedAttraction);

  } catch (err) {
    res.status(500).send(err);
  }
}

export const getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.send(attractions);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const getAttractionById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.attrId)) return res.status(404).send({ error: "Attraction No Found" });
  try {
    const attraction = await Attraction.findById(req.params.attrId);
    if (!attraction) return res.status(404).send({ error: "Attraction No Found" });
    res.send(attraction);

  } catch (err) {
    res.status(500).send(err);
  }
}