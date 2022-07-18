import mongoose from "mongoose";
import { destinationSchema } from "./destionation.schema.js";

const Destination = mongoose.model('destinations', destinationSchema);

export default Destination;