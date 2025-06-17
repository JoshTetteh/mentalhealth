'use client';
import dynamic from "next/dynamic";

const Videochat = dynamic<{ slug: string; JWT: string }>(() => import("./videochat"), { ssr: false });

export default function VideochatClientWrapper({ slug, JWT }: { slug: string; JWT: string }) {
    return (
        <Videochat slug={slug} JWT={JWT} />
    );
}

const Videocall = (props: { slug: string; JWT: string }) => {
  
const joinSession = async () => {
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on("peer-video-state-change", renderVideo);
    const userName = `User-${new Date().getTime().toString().slice(8)}`;
    await client.current.join(session, jwt, userName)
    setinSession(true);
    

    
const mediaStream = client.current.getMediaStream();
    await mediaStream.startAudio();
    await mediaStream.startVideo();
    setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
    setIsVideoMuted(!client.current.getCurrentUserInfo().bVideoOn);
    await renderVideo({ action: "Start", userId: client.current.getCurrentUserInfo().userId });
  };

const Videocall = (props: { slug: string; JWT: string }) => {
  
  const renderVideo = async (event: {action: "Start" | "Stop"; userId: number;}) => {
    const mediaStream = client.current.getMediaStream();
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      Array.isArray(element) ? element.forEach((el) => el.remove()) : element.remove();
    } else {
      const userVideo = await mediaStream.attachVideo(event.userId, VideoQuality.Video_360P);
      videoContainerRef.current!.appendChild(userVideo as VideoPlayer);
    }
  };

const Videocall = (props: { slug: string; JWT: string }) => {
  
  const leaveSession = async () => {
    client.current.off("peer-video-state-change", renderVideo);
    await client.current.leave();
    window.location.href = "/";
  };

const Videocall = (props: { slug: string; JWT: string }) => {
  
  return (
    <div>
      <h1>
        Session: {session}
      </h1>
      <div style={inSession ? {} : { display: "none" }}>
        <video-player-container ref={videoContainerRef} style={videoPlayerStyle} />
      </div>
      {!inSession ? (
        <div>
          <Button onClick={startCall}>
            Join
          </Button>
        </div>
      ) : (
       <div>
          <div>
            <CameraButton
              client={client}
              isVideoMuted={isVideoMuted}
              setIsVideoMuted={setIsVideoMuted}
              renderVideo={renderVideo}
            />
            <MicButton
              isAudioMuted={isAudioMuted}
              client={client}
              setIsAudioMuted={setIsAudioMuted}
            />
            <Button onClick={leaveSession}>
              <PhoneOff />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videocall;