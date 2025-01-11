const Username = (props) => {
  return (
    <form
      className="w-full my-1 flex gap-3 *:rounded-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Join using a username"
        className="w-full px-5 py-2 bg-amber-200 placeholder:text-gray-700 font-semibold outline-none "
      />
      <input
        type="submit"
        value={`${props.username ? "Change" : "Set"} username`}
        className="bg-amber-700 text-white font-semibold px-3 py-1 cursor-pointer"
      />
      {props.message ? <p>{props.message}</p> : null}
    </form>
  );
};

export default Username;
