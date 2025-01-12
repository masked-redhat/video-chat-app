import { socket } from "../socket";

const User = (props) => {
  const handleCall = () => {
      socket.emit("start-call", props.id);
  };

  return (
    <div className="flex gap-3 *:px-5 *:py-2 *:rounded-md">
      <p className="w-full text-lg font-semibold bg-amber-100">
        {props.username}
      </p>
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
