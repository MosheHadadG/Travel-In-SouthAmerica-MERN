import mongoose from "mongoose";

export const destinationSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
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
  
  capital: {
    type: String,
    required: true
  },

  population: {
    type: String,
    require: true
  },

  language: {
    type: String,
    required: true
  },

  famousPlaceToVisit: {
    type: [String],
    minItems: 1
  },

},
{ timestamps: true }
)