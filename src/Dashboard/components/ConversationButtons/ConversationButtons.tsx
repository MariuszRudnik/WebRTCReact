import React from 'react';
import { MdMic } from '@react-icons/all-files/md/MdMic';
import { MdCallEnd } from '@react-icons/all-files/md/MdCallEnd';
import ConversationButton from './ConversationButton.tsx';
import { MdVideocam } from '@react-icons/all-files/md/MdVideocam';
import { MdVideoLabel } from '@react-icons/all-files/md/MdVideoLabel';
import { MdMicOff } from '@react-icons/all-files/md/MdMicOff';
import { MdVideocamOff } from '@react-icons/all-files/md/MdVideocamOff';
import { hangUp, switchForScreenSharingStream } from '../../../utils/webRTC/webRTCHandler.ts';
import { MdCamera } from '@react-icons/all-files/md/MdCamera';

const style: any = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%'
  },
  icon: { width: '25px', height: '25px', fill: '#e6e5e8' }
};

const ConversationButtons = (props: any) => {
  const {
    localStream,
    setCameraEnabled,
    localCameraEnabled,
    localMicrophoneEnable,
    setMicrophoneEnabled,
    screenSharingActive
  } = props;

  const handleConversationButtonPressed = () => {
    console.log('ss');
    switchForScreenSharingStream();
  };

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnable;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };
  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };
  const handleHangedUpButtonPressed = () => {
    hangUp();
  };
  console.log(screenSharingActive);
  return (
    <div style={style.buttonContainer}>
      <ConversationButton coClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnable ? <MdMic style={style.icon} /> : <MdMicOff style={style.icon} />}
      </ConversationButton>
      <ConversationButton coClickHandler={handleHangedUpButtonPressed}>
        <MdCallEnd style={style.icon} />
      </ConversationButton>
      <ConversationButton coClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={style.icon} />
        ) : (
          <MdVideocamOff style={style.icon} />
        )}
      </ConversationButton>
      <ConversationButton coClickHandler={handleConversationButtonPressed}>
        {screenSharingActive ? (
          <MdCamera style={style.icon} />
        ) : (
          <MdVideoLabel style={style.icon} />
        )}
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;
