import { socket } from "../socket";

export const connect = async (setMessage, setUsername, setUsers) => {
  socket.connect();

  socket.on("username-error", (message) => {
    setMessage(`Error: ${message}`);
  });

  socket.on("username-success", (username) => {
    setMessage("");
    setUsername(username);
  });

  socket.on("users", (users) => {
    setUsers(users);
  });

  socket.on("emit-get-users", () => {
    socket.emit("get-users");
  });

  socket.emit("get-users");
};
