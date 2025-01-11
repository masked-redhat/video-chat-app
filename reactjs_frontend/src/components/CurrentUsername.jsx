const CurrentUsername = ({ username }) => {
  return username ? (
    <p className="text-lg">
      Current Username : <span className="font-semibold">{username}</span>
    </p>
  ) : null;
};

export default CurrentUsername;
