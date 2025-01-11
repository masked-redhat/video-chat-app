import { useRef, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Username from "./components/Username";
import Users from "./components/Users";
import Video from "./components/Video";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const localStream = useRef(),
    remoteStream = useRef();

  return (
    <div className="flex flex-col gap-4 h-[95vh]">
      <Header />
      <main className="flex flex-col gap-3">
        <Username
          message={message}
          setUsername={setUsername}
          username={username}
        />
        <div className="flex gap-2">
          <Video streamRef={localStream} />
          <Video streamRef={remoteStream} />
        </div>
        <CurrentUsername username={username} />
        <Users users={users} />
      </main>
      <Footer />
      <button
        onClick={(e) => {
          console.log(localStream.current);
        }}
      >
        click
      </button>
    </div>
  );
}

export default App;
