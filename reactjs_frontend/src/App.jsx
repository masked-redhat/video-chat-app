import { useEffect, useRef, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Username from "./components/Username";
import Users from "./components/Users";
import Video from "./components/Video";
import { connect } from "./socket/connect";
import { socket } from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const localStream = useRef(),
    remoteStream = useRef();

  useEffect(() => {
    connect(setMessage, setUsername, setUsers);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-[95vh]">
      <Header />
      <main className="flex flex-col gap-3">
        <Username message={message} username={username} />
        <div className="flex gap-2">
          <Video streamRef={localStream} />
          <Video streamRef={remoteStream} />
        </div>
        <CurrentUsername username={username} />
        <Users users={users} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
