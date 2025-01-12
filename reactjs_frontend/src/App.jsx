import { useEffect, useRef, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Username from "./components/Username";
import Users from "./components/Users";
import Video from "./components/Video";
import { connect } from "./socket/connect";
import initializeSetup from "./scripts/streamLocal";
import { peerConnect } from "./socket/peerConnection";
import { socket } from "./socket";

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
  const handleStartOffer = async (id) => {
    await peerConnect.startOffer(
      peerConnection,
      localStream,
      remoteStream,
      setConn,
      id
    );
  };

  const handleSendAnswer = async (offer, id) => {
    await peerConnect.sendAnswer(
      peerConnection,
      localStream,
      remoteStream,
      setConn,
      offer,
      id
    );
  };

  const handleGetAnswer = async (answer) => {
    await peerConnect.getAnswer(peerConnection, answer);
  };

  const handleCandidate = async (candidate) => {
    await peerConnect.onCandidate(peerConnection, candidate);
  };

  const handleEndCall = async () => {
    await peerConnect.endCall(peerConnection, setConn);
    refresh()
  };

  useEffect(() => {
    if (localStream && remoteStream) {
      localStreamElement.current.srcObject = localStream;
      remoteStreamElement.current.srcObject = remoteStream;

      socket.on("start-offer", handleStartOffer);
      socket.on("offer", handleSendAnswer);
      socket.on("answer", handleGetAnswer);
      socket.on("candidate", handleCandidate);
      socket.on("end-call", handleEndCall);
    }

    return () => {
      socket.off("start-offer", handleStartOffer);
      socket.off("offer", handleSendAnswer);
      socket.off("answer", handleGetAnswer);
      socket.off("candidate", handleCandidate);
      socket.off("end-call", handleEndCall);
    };
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
