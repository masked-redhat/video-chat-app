import User from "./User";

const Users = ({ users }) => {
  return (
    <div className="space-y-3">
      <hr />
      <h2 className="text-2xl">Users currently active</h2>
      <div className="flex flex-col gap-2 h-[32vh] overflow-auto">
        {users &&
          users.map((user) => (
            <User username={user.username} key={user.username} />
          ))}
      </div>
    </div>
  );
};

export default Users;
