import {
  callStates,
  setCallerUserName,
  setCallingDialogVisible,
  setCallRejected,
  setCallState,
  setLocalStream
} from '../../store/actions/callActions.ts';
import store from '../../store/store.ts';
import * as wss from '../wssConnection/wssConnection.ts';
import { sendPreOfferAnswer } from '../wssConnection/wssConnection.ts';
import { WebRTCType } from '../types/reduxType.ts';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

const defaultContains = {
  video: true,
  audio: true
};
const configuration = {
  iceServers: [
    {
      urls: 'stun.stun.l.google.com:19302'
    }
  ]
};
let connectedUserSocketId: string | null;
let peerConnection: RTCPeerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultContains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));

      createPeerConnection();
    })
    .catch((err) => {
      console.log('error occure when trying to get an access to local stream');
      console.log(err);
    });
};
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }
  peerConnection.ontrack = ({ streams: [stream] }) => {
    // store remoteStream in out store
  };
  peerConnection.onicecandidate = (event) => {
    //send connection user our ice candidates
  };
};

export const callToOtherUser = (calleeDetails: { sockedId: string }) => {
  console.log('calling the other user');
  connectedUserSocketId = calleeDetails.sockedId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      userName: store.getState().dashboard.username
    }
  });
};

export const handlePreOffer = (data: { callerSocketId: string; callerUserName: string }) => {
  console.log('handlePreOffer');
  console.log(data.callerUserName);
  console.log(data.callerSocketId);
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUserName(data.callerUserName));
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
};
export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });
  resetCallData();
};
export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
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

export const handlePreOfferAnswer = (data: { answer: string }) => {
  store.dispatch(setCallingDialogVisible(false));
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason: string;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
    console.log('setCallRejected');
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
  if (peerConnection != null) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendWebRTCOffer({
      calleeSocketId: connectedUserSocketId,
      offer: offer
    });
  }
};

export const handleOffer = async (data: WebRTCType) => {
  if (peerConnection != null) {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    wss.sendWebRTCAnswer({
      callerSocketId: connectedUserSocketId,
      answer: answer
    });
  }
};
export const handleAnswer = async (data: { answer: any }) => {
  await peerConnection.setRemoteDescription(data.answer);
};
