const initializePeerSetup = async (setLocalStream, setRemoteStream) => {
  let ls = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  let rs = new MediaStream();

  await setLocalStream(ls);
  await setRemoteStream(rs);
};

export default initializePeerSetup;
