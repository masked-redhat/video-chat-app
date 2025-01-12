import PeerConnection from "../scripts/peer2peer";
import { socket } from "../socket";

const peerConnect = (peerConnection, localStream, remoteStream) => {
  socket.on("start-offer", async (id) => {
    initPeerConnection(id);

    const offer = await peerConnection.current.createOffer();
    socket.emit("make-offer", offer, id);
  });

  socket.on("offer", async (offer, id) => {
    initPeerConnection(id);

    await peerConnection.current.setOffer(offer);
    const answer = await peerConnection.current.createAnswer();

    socket.emit("send-answer", answer, id);
  });

  socket.on("answer", async (answer, id) => {
    await peerConnection.current.setAnswer(answer);
  });

  socket.on("candidate", async (candidate) => {
    await peerConnection.current.addIceCandidate(candidate);
  });

  const initPeerConnection = (id) => {
    peerConnection.current = new PeerConnection(localStream, remoteStream, id);
  };
};

export default peerConnect;
