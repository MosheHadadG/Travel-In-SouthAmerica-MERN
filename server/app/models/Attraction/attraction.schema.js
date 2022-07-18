import mongoose from "mongoose";

export const attractionSchema  = mongoose.Schema({

  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  images: {
    type: [String],
    minItems: 1,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  whenToVisit: {
    type: String,
    required: true
  },

  thingsToDo: {
    type: [String],
    minItems: 1
  },

},
{ timestamps: true }
)