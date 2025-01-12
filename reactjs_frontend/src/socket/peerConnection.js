import PeerConnection from "../scripts/peer2peer";
import { socket } from "../socket";

const startOffer = async (
  peerConnection,
  localStream,
  remoteStream,
  setConn,
  id
) => {
  peerConnection.current = new PeerConnection(localStream, remoteStream, id);
  setConn(peerConnection.current);

  const offer = await peerConnection.current.createOffer();

  socket.emit("make-offer", offer, id);
};

const sendAnswer = async (
  peerConnection,
  localStream,
  remoteStream,
  setConn,
  offer,
  id
) => {
  peerConnection.current = new PeerConnection(localStream, remoteStream, id);
  setConn(peerConnection.current);

  await peerConnection.current.setOffer(offer);
  const answer = await peerConnection.current.createAnswer();

  socket.emit("send-answer", answer, id);
};

const getAnswer = async (peerConnection, answer) => {
  await peerConnection.current.setAnswer(answer);
};

const onCandidate = async (peerConnection, candidate) => {
  await peerConnection.current.addIceCandidate(candidate);
};

const endCall = async (peerConnection, setConn) => {
  if (peerConnection.current) {
    peerConnection.current.close();
    setConn(undefined);
  }
};

export const peerConnect = {
  startOffer,
  getAnswer,
  sendAnswer,
  onCandidate,
  endCall,
};
