import React, { useRef, useEffect } from 'react';

interface Styler {
  videoContainer: {
    width: string;
    height: string;
    borderRadius: string;
    position: 'absolute' | undefined;
    top: string;
    right: string;
  };
  videoElement: {
    width: string;
    height: string;
  };
}

const styles: Styler = {
  videoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    position: 'absolute',
    top: '5%',
    right: '23%'
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const LocalVideoView = (props: any) => {
  const { localStream } = props;
  const localVideoRef: any = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;
      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer} className="background_secondary_color">
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
