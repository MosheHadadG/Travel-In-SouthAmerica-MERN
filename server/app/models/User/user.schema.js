import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken"

import User from "./user.model.js";
import { planningSchema } from "./planning.schema.js";

export const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },
  
  age: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Invalid Email')
      }
    }
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  about: {
    type: String,
  },

  interests: {
    type: Array
  },
  
  avatar: {
    type: String
  },

  planning: planningSchema,

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]

},

{ timestamps: true }

);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  
  delete userObject.password;
  delete userObject.tokens;
  return userObject;

}

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jsonwebtoken.sign({_id: user._id.toString()}, "SecretCodeTravel!")
  user.tokens = user.tokens.concat({ token })

  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if(!user) return false;

  const match = await bcryptjs.compare(password, user.password);
  if(!match) return false;

  return user;
}


async function hashPasswordBeforeSaving(next) {
  const user = this;
  
  if(user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
}

userSchema.pre("save", hashPasswordBeforeSaving)