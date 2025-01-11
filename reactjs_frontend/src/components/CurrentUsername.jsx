const CurrentUsername = ({ username }) => {
  return (
    <div>
      {username ? (
        <p className="text-lg">
          Current Username : <span className="font-semibold">{username}</span>
        </p>
      ) : null}
    </div>
  );
};

export default CurrentUsername;
