const Video = ({ streamRef }) => {
  return (
    <div className="w-full h-[250px]">
      <video
        ref={streamRef}
        autoPlay
        playsInline
        className="w-full h-full bg-black rounded-md select-none pointer-events-none"
      ></video>
    </div>
  );
};

export default Video;
