import PeerConnection from "../scripts/peer2peer";
import initializePeerSetup from "../scripts/streamLocal";
import { socket } from "../socket";

const peerConnect = (
  peerConnection,
  localStream,
  remoteStream,
  setConn,
  refresh
) => {
  socket.on("start-offer", async (id) => {
    initPeerConnection(id);

    const offer = await peerConnection.current.createOffer();

    console.log("Offer send: ", offer);
    socket.emit("make-offer", offer, id);
  });

  socket.on("offer", async (offer, id) => {
    initPeerConnection(id);

    await peerConnection.current.setOffer(offer);
    const answer = await peerConnection.current.createAnswer();

    console.log("Offer recieved: ", offer);
    console.log("answer sent: ", answer);

    socket.emit("send-answer", answer, id);
  });

  socket.on("answer", async (answer, id) => {
    await peerConnection.current.setAnswer(answer);

    console.log("answer recieved: ", answer);
  });

  socket.on("candidate", async (candidate) => {
    await peerConnection.current.addIceCandidate(candidate);
  });

  socket.on("end-call", () => {
    if (peerConnection.current) {
      peerConnection.current.close(localStream, remoteStream);
      delete peerConnection.current;
      setConn(undefined);
      refresh();
    }
  });

  const initPeerConnection = (id) => {
    peerConnection.current = new PeerConnection(localStream, remoteStream, id);
    setConn(peerConnection.current);
  };
};

export default peerConnect;
