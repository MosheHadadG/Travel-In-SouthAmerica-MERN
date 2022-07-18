import mongoose from "mongoose";
import { mongoURI } from "../../config.js"

mongoose.connect(mongoURI, (error, mongoDBConnection) => {
  if(error) throw new Error('Mongoose Connection!!, Error: ' + err);
  if(!process.env.NODE_ENV) {
    const { port, host, name } = mongoDBConnection;
    console.log({port, host, name});
  }
})