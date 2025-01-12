import { socket } from "../socket";

const User = ({ conn, username, setMessage, id }) => {
  const handleCall = () => {
    if (!conn.current || conn.current.closed()) {
      socket.emit("start-call", id);
      setMessage("");
    } else setMessage("Error: You are on a call right now!");
  };

  return (
    <div className="flex gap-3 *:px-5 *:py-2 *:rounded-md">
      <p className="w-full text-lg font-semibold bg-amber-100">{username}</p>
      <button
        className="bg-green-300 font-extrabold hover:bg-green-400"
        onClick={handleCall}
      >
        Call
      </button>
    </div>
  );
};

export default User;
