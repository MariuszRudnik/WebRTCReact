import {
  callStates,
  setCallerUserName,
  setCallingDialogVisible,
  setCallState,
  setLocalStream
} from '../../store/actions/callActions.ts';
import store from '../../store/store.ts';
import * as wss from '../wssConnection/wssConnection.ts';

const defaultContains = {
  video: true,
  audio: true
};

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultContains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((err) => {
      console.log('error occure when trying to get an access to local stream');
      console.log(err);
    });
};
let connectedUserSocketId: string | null;
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
  connectedUserSocketId = data.callerSocketId;
  console.log('handlePreOffer');
  console.log(data.callerUserName);
  console.log(data.callerSocketId);
  store.dispatch(setCallerUserName(data.callerUserName));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
