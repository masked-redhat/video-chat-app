import { socket } from "../socket";

const CurrentUsername = ({ username, connection }) => {
  return (
    <div>
      {username ? (
        <p className="text-lg w-full flex items-center">
          Current Username :{" "}
          <span className="font-semibold ml-2">{username}</span>
          {connection ? (
            <span
              className="font-semibold px-3 py-1 rounded-md bg-amber-200 ml-auto cursor-pointer"
              onClick={() => {
                socket.emit("end-call", connection.remoteId);
              }}
            >
              End Call
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
};

export default CurrentUsername;
