import { useEffect, useRef, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Username from "./components/Username";
import Users from "./components/Users";
import Video from "./components/Video";
import { connect } from "./socket/connect";
import initializeSetup from "./scripts/streamLocal";
import peerConnect from "./socket/peerConnection";
import PeerConnection from "./scripts/peer2peer";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const peerConnection = useRef();
  const [conn, setConn] = useState();

  const localStreamElement = useRef(),
    remoteStreamElement = useRef();

  const refresh = () => {
    initializeSetup(setLocalStream, setRemoteStream);
    localStreamElement.current.srcObject = localStream;
    remoteStreamElement.current.srcObject = remoteStream;
  };

  useEffect(() => {
    connect(setMessage, setUsername, setUsers);
    initializeSetup(setLocalStream, setRemoteStream);
  }, []);

  // set the source object for video elements
  // when streams have been set
  useEffect(() => {
    if (localStream && remoteStream) {
      localStreamElement.current.srcObject = localStream;
      remoteStreamElement.current.srcObject = remoteStream;

      peerConnect(peerConnection, localStream, remoteStream, setConn, refresh);
    }
  }, [localStream, remoteStream]);

  return (
    <div className="flex flex-col gap-4 h-[95vh]">
      <Header />
      <main className="flex flex-col gap-3">
        <Username message={message} username={username} />
        <div className="flex gap-2">
          <Video streamRef={localStreamElement} />
          <Video streamRef={remoteStreamElement} />
        </div>
        <CurrentUsername username={username} connection={conn} />
        <Users users={users} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
