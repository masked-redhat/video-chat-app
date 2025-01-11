import { useState } from "react";

const Username = ({ setUsername, message, username }) => {
  const [inputUsername, setInputUsername] = useState("");
  return (
    <>
      <form
        className="w-full my-1 flex gap-3 *:rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          setUsername(inputUsername);
        }}
      >
        <input
          type="text"
          name="username"
          value={inputUsername}
          placeholder="Join using a username"
          className="w-full px-5 py-2 bg-amber-200 placeholder:text-gray-700 font-semibold outline-none"
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <input
          type="submit"
          value={`${username ? "Change" : "Set"} username`}
          className="bg-amber-700 text-white font-semibold px-3 py-1 cursor-pointer"
        />
      </form>
      {message ? <p>{message}</p> : null}
    </>
  );
};

export default Username;
