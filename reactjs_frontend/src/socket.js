import { io } from "socket.io-client";

export const socket = io("https://video-chat-app-fqc5.onrender.com/");

socket.on("connect", () => {
  console.log("Connected with the server, ready for polling");
});

socket.on("connect_error", (err) => {
  console.log("Connection error :", err);
});
