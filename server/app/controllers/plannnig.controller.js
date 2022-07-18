import mongoose from "mongoose";
import User from "../models/User/user.model.js";

export const updatePlanning = async (req, res) => {
  const planningBody = req.body;
  try {
    req.user.planning = planningBody;
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.send(err);
  }
}

export const getPlanningById = async (req, res) => {
  const planningId = req.params.id;
  if(!mongoose.isValidObjectId(planningId)) return res.status(404).send({error: "Planning No Found"});
  try {
    const ownerPlanning = await User.findOne({ 'planning._id':  mongoose.Types.ObjectId(planningId)});
    if(!ownerPlanning) return res.status(404).send({error: "Planning No Found"});
    res.send({
      ownerName: `${ownerPlanning.firstName} ${ownerPlanning.lastName}`,
      ownerId: ownerPlanning._id,
      planning: ownerPlanning.planning});

  } catch (err) {
    res.send(err)
  }
}

export const deleteMyPlanning = async (req, res) => {
  if(!req.user.planning || !Object.keys(req.user.planning).length === 0) {
    return res.status(404).send({error: "Planning No Found"});
  }

  try {
    req.user.planning = undefined;
    await req.user.save();
    res.send({user: req.user});

  } catch (err) {
    res.status(500).send(err)
  }
}