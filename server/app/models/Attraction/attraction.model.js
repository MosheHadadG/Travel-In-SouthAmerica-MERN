import moongose from "mongoose";
import { attractionSchema } from "./attraction.schema.js";
const Attraction = moongose.model('attractions', attractionSchema);

export default Attraction;