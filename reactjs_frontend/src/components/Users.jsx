import { socket } from "../socket";
import User from "./User";

const Users = ({ users, connection, setMessage }) => {
  return (
    <div className="space-y-3">
      <hr />
      <div className="flex gap-3">
        <h2 className="text-2xl">Users currently active</h2>
        <button
          className="px-3 py-1 rounded-md bg-amber-200"
          onClick={() => {
            socket.emit("get-users");
          }}
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-col gap-2 h-[32vh] overflow-auto">
        {users &&
          users.map((user) => (
            <User username={user.username} key={user.username} id={user.id} connection={connection} setMessage={setMessage} />
          ))}
        {users && users.length === 0 && <p>No active users</p>}
      </div>
    </div>
  );
};

export default Users;
