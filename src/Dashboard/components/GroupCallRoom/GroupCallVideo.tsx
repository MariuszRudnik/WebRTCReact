import React, { useEffect, useRef } from 'react';

const styles = {
  videoContainer: {
    width: '300px',
    height: '300px'
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const GroupCallVideo = ({ stream }: any) => {
  const videoRef: any = useRef();
  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);
  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement}></video>
    </div>
  );
};

export default GroupCallVideo;
