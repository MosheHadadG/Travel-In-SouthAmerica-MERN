import express, { urlencoded } from "express";
import { usersRouter } from "./routes/users.route.js";
import cors from "cors";
import path from "path";
import { conversationsRouter } from "./routes/conversations.route.js";
import { messagesRouter } from "./routes/messages.route.js";
import { destinationsRouter } from "./routes/destinations.route.js";
import { attractionsRouter } from "./routes/attractions.route.js";

export const app = express();


app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use('/uploads/avatars', express.static(path.join('uploads', 'avatars')))

app.use('/users', usersRouter);
app.use('/conversation', conversationsRouter);
app.use('/messages', messagesRouter);
app.use('/destinations', destinationsRouter);
app.use('/attractions', attractionsRouter);
