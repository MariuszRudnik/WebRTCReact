import { useEffect, useRef } from 'react';

interface LocalVideoViewProps {
  remoteStream: MediaStream;
}
const styles = {
  videoContainer: {
    width: '100%',
    height: '100%'
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const RemoteVideoView = (props: LocalVideoViewProps) => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo: HTMLVideoElement | any = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;
      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);
  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default RemoteVideoView;
