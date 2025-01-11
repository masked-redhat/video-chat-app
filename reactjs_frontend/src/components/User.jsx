const User = (props) => {
  return (
    <div className="flex gap-3 *:px-5 *:py-2 *:rounded-md">
      <p className="w-full text-lg font-semibold bg-amber-100">{props.username}</p>
      <button className="bg-amber-200">Call</button>
    </div>
  );
};

export default User;
