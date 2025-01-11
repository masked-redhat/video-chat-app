import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected with the server, ready for polling");
});

socket.on("connect_error", (err) => {
  console.log("Connection error :", err);
});
