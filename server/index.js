import { app } from "./app/app.js";
import http from "http";
import { Server } from "socket.io";
import "./app/db/mongoose.js"
import { addUser, getUser, removeUser } from "./socket/utils.socket.js";


const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "https://travel-in-south-america.netlify.app"
  }
});


let usersConnected = [];

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  //  take userId and socketId from user
  socket.on("addUser", (userId) => {
    if(!usersConnected && !userId && !socket.id) return;
    usersConnected = addUser(usersConnected, userId, socket.id);
    io.emit("getUsers", usersConnected);
  })

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text}) => {
    // if(!usersConnected && !receiverId) return;
    const user = getUser(usersConnected, receiverId);
    if(!user) return;
    io.to(user.socketId).emit("getMessage", { senderId, text });

  })

  socket.on("disconnect", () => {
    // when disconnect
    console.log("a user disconnected");
    console.log(usersConnected);
    // if(!usersConnected && !socket.id) return;
    usersConnected = removeUser(usersConnected, socket.id);
    io.emit("getUsers", usersConnected);
  })
});


const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
    console.log('Server Alive On Port ' + PORT);
})