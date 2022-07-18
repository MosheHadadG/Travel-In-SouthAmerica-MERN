import express from "express";
import {
  createUser,
  userLogin,
  userLogout,
  getUsers,
  getUserById,
  getMyUser,
  updateMyUser,
  uploadMyAvatar
} from "../controllers/users.controller.js";
import { updatePlanning, getPlanningById, deleteMyPlanning } from "../controllers/plannnig.controller.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";
import { auth } from "../middleware/auth.js"

export const usersRouter = express.Router();



usersRouter.post('/create-user', createUser);
usersRouter.post('/login', userLogin);

//! Need Auth

usersRouter.post('/logout',auth, userLogout);

usersRouter.get('/my-user', auth, getMyUser );

usersRouter.put('/update-my-user', auth, updateMyUser)

usersRouter.get('/all-users', auth, getUsers);

usersRouter.get('/specific-user/:id', auth, getUserById);


usersRouter.post('/upload-avatar',auth, uploadAvatar.single('avatar'), uploadMyAvatar, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
});

// Planning
usersRouter.get('/specific-planning/:id', auth, getPlanningById);

usersRouter.patch('/update-planning', auth, updatePlanning);

usersRouter.delete('/delete-planning', auth, deleteMyPlanning);




