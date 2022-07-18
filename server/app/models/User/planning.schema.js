import mongoose from "mongoose";

export const planningSchema = mongoose.Schema({
  countriesPlan: {
    type: [{}],
    minItems: 1,
    required: true
  },

  budget: {
    type: Number,
    required: true
  },

  departureDate: {
    type: Date,
    required: true
  },

  returnDate: {
    type: Date,
    required: true
  }
})