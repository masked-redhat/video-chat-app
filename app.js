import express from "express";
import { env } from "./constants/env.js";
import { createServer } from "http";
import { Server } from "socket.io";
import User from "./scripts/User.js";
import Username from "./scripts/Username.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = env.port;

const users = {};
const usernames = [];

io.on("connection", (socket) => {
  User.createUser(users, socket.id);

  socket.on("get-users", () => {
    socket.emit("users", User.getUsers(users, socket.id));
  });

  socket.on("set-username", (username) => {
    username = username.trim();
    if (Username.poolFull(usernames)) {
      socket.emit(
        "username-error",
        "User pool full, wait for sometime or try again"
      );
    } else if (usernames.includes(username))
      socket.emit("username-error", "Username taken, choose again");
    else if (username === "")
      socket.emit("username-error", "Choose a valid username");
    else {
      Username.setUsername(username, usernames, users, socket.id);
      socket.emit("username-success", username);

      io.sockets.emit("emit-get-users");
    }
  });

  socket.on("disconnect", () => {
    User.deleteUser(users, socket.id, usernames);

    io.sockets.emit("emit-get-users");
  });
});

server.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
