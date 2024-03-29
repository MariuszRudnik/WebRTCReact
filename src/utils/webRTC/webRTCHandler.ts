import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  callStates,
  setCallingDialogVisible,
  setCallerUsername,
  setCallRejected,
  setRemoteStream,
  setScreenSharingActive,
  resetCallDateState,
  setMessage
} from '../../store/actions/callActions';
import * as wss from '../wssConnection/wssConnection';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

const defaultConstrains = {
  video: { width: 480, height: 360 },
  audio: true
};

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:13902'
    }
  ]
};

let connectedUserSocketId: string | null;
let peerConnection: any;
let dataChannel: any;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
      createPeerConnection();
    })
    .catch((err) => {
      console.log('error occured when trying to get an access to get local stream');
      console.log(err);
    });
};

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);

  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }: any) => {
    store.dispatch(setRemoteStream(stream));
  };
  // incoming data channel messages
  peerConnection.ondatachannel = (event: any) => {
    const dataChannel = event.channel;
    dataChannel.onopen = () => {
      console.log('peer connection is open to receive data channel messages');
    };
    dataChannel.onmessage = (event: any) => {
      console.log('onsage');
      store.dispatch(setMessage(true, event.data));
    };
  };
  dataChannel = peerConnection.createDataChannel('chat');
  dataChannel.onopen = () => {
    console.log('data chanle');
  };
  peerConnection.onicecandidate = (event: any) => {
    console.log('geeting candidates from stun server');
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId
      });
    }
  };

  peerConnection.onconnectionstatechange = (event: any) => {
    if (peerConnection.connectionState === 'connected') {
      console.log('succesfully connected with other peer');
    }
  };
};

export const callToOtherUser = (calleeDetails: any) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username
    }
  });
};

export const handlePreOffer = (data: any) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE
    });
  }
};

export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });
  resetCallData();
};

export const handlePreOfferAnswer = (data: any) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason
      })
    );

    resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer
  });
};

export const handleOffer = async (data: any) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer
  });
};

export const handleAnswer = async (data: any) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data: any) => {
  try {
    console.log('adding ice candidates');
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error('error occured when trying to add received ice candidate', err);
  }
};

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
let screenSharingStream: any;
export const switchForScreenSharingStream = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      store.dispatch(setScreenSharingActive(true));
      const senders = peerConnection.getSenders();
      const sender = senders.find(
        (sender: any) => sender.track.kind == screenSharingStream.getVideoTracks()[0].kind
      );
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (err) {
      console.log('Error occured when trying to get screensharing sream', err);
    }
  } else {
    const localStream = store.getState().call.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(
      (sender: any) => sender.track.kind == localStream.getVideoTracks()[0].kind
    );
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    sender.dispatch(setScreenSharingActive(false));
    screenSharingStream.getTracks().forEach((track: any) => {
      track.stop();
    });
  }
};

export const handleUserHangUp = () => {
  resetCallDataAfterHandUp();
};

export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId
  });
  resetCallDataAfterHandUp();
};

const resetCallDataAfterHandUp = () => {
  store.dispatch(resetCallDateState());
  peerConnection.close();
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;

  if (store.getState().call.screenSharingActive) {
    screenSharingStream.getTracks().forEach((track: any) => {
      track.stop();
    });
  }
};

export const sendMessageUsingDataChannel = (message: any) => {
  dataChannel.send(message);
};
