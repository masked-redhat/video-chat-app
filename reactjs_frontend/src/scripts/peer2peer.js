import { servers } from "../constants/peerServers";
import { socket } from "../socket";

class PeerConnection {
  constructor(localStream, remoteStream, socketId = null) {
    this.pc = new RTCPeerConnection(servers);
    this.remoteId = socketId;
    this.createConnection(localStream, remoteStream);
  }

  createConnection = (localStream, remoteStream) => {
    localStream.getTracks().forEach((track) => {
      const senders = this.pc.getSenders().map((sender) => sender.track);
      if (!senders.includes(track)) {
        this.pc.addTrack(track, localStream);
      }
    });

    this.pc.ontrack = async (event) => {
      event.streams[0].getTracks().forEach((track) => {
        if (!remoteStream.getTracks().includes(track)) {
          remoteStream.addTrack(track);
        }
      });
    };

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendCandidate(event.candidate);
      }
    };
  };

  createOffer = async () => {
    this.offer = await this.pc.createOffer();
    if (!this.pc.currentLocalDescription)
      this.pc.setLocalDescription(this.offer);
    return this.offer;
  };

  setOffer = async (offer) => {
    this.offer = new RTCSessionDescription(offer);
    if (!this.pc.currentRemoteDescription)
      await this.pc.setRemoteDescription(this.offer);
  };

  createAnswer = async () => {
    this.answer = await this.pc.createAnswer();
    if (!this.pc.currentLocalDescription)
      this.pc.setLocalDescription(this.answer);
    return this.answer;
  };

  setAnswer = async (answer) => {
    this.answer = new RTCSessionDescription(answer);
    if (!this.pc.currentRemoteDescription)
      await this.pc.setRemoteDescription(this.answer);
  };

  close = () => {
    this.pc.close();
  };

  setRemoteId = (id) => {
    this.remoteId = id;
  };

  sendCandidate = (candidate) => {
    socket.emit("candidate", candidate, this.remoteId);
  };

  addIceCandidate = async (candidate) => {
    if (this.pc && this.pc.remoteDescription) {
      candidate = new RTCIceCandidate(candidate);
      await this.pc.addIceCandidate(candidate);
    }
  };
}

export default PeerConnection;
