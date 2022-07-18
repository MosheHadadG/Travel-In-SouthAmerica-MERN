import User from "../models/User/user.model.js";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = new User(userBody);
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }

}


export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    if (!user) return res.send({ error: "Email or Password is incorrect" });
    const token = await user.generateAuthToken();
    res.send({ user, token })

  } catch (err) {
    res.send(err);
  }
}

export const userLogout = async (req, res) => {
  const updatedTokens = req.user.tokens.filter((objToken) => objToken.token !== req.token);
  req.user.tokens = updatedTokens;
  try {
    await req.user.save();
    res.send();

  } catch (err) {
    res.status(400).send(err);
  }
}


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithoutUserLoggedIn = users.filter((user) => user._id.toString() !== req.user._id.toString());
    res.send(usersWithoutUserLoggedIn);

  } catch (err) {
    res.send(err);
  }
}

export const getMyUser = async (req, res) => {
  try {
    res.send({ user: req.user });

  } catch (err) {
    res.send(err);
  }
}

export const updateMyUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'age', 'city', 'interests', 'about'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: "Invalid Update!" });
  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user)

  } catch (err) {
    res.send(err)
  }
}

export const uploadMyAvatar = async (req, res) => {
  try {
    req.user.avatar = req.file.path
    await req.user.save();
    res.send(req.user);

  } catch (err) {
    res.send(err)
  }

}

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.isValidObjectId(userId)) return res.status(404).send({ error: "User No Found" });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "User No Found" });
    res.send(user)
  } catch (err) {
    res.send(err);
  }
}

