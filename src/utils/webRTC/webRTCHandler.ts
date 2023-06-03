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

const defaultContains: MediaStreamConstraints = {
  video: true,
  audio: true
};
const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

export const getLocalStream = (): void => {
  navigator.mediaDevices
    .getUserMedia(defaultContains)
    .then((stream: MediaStream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((err: Error) => {
      console.log('error occurred when trying to get an access to local stream');
      console.log(err);
    });
};

let connectedUserSocketId: string | null;

export const callToOrderUser = (calleeDetails: { socketId: string }): void => {
  console.log('connectedUserSocketId');
  console.log(calleeDetails.socketId);
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      userName: store.getState().dashboard.username
    }
  });
};
export const resetCallData = () => {
  console.log('callStates.CALL_AVAILABLE');
  console.log(callStates.CALL_AVAILABLE);
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};

export const handlePreOffer = (data: { callerSocketId: string; callerUserName: string }): void => {
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

export const handlePreOfferAnswer = (data: any) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // sendWebOffer
  } else {
    let rejectionReason: string;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
      console.log(rejectionReason);
    } else {
      rejectionReason = 'Call rejected by the callee';
      console.log(rejectionReason);
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason
      })
    );
  }
};
