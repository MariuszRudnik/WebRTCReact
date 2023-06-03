export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};
export const CALL_SET_LOCAL_STREAM = 'CALL_SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL_SET_CALL_STATE';
export const CALL_SET_CALLER_USERNAME = 'CALL_SET_CALLER_USERNAME';
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL_SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALL_REJECTED = 'CALL_SET_CALL_REJECTED';

interface callRejectedDetailsInterface {
  rejected: boolean;
  reason: string;
}

export const setLocalStream = (localStream: any) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream
  };
};
export const setCallState = (callState: string) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState
  };
};

export const setCallingDialogVisible = (visible: boolean) => {
  return {
    type: CALL_SET_CALLING_DIALOG_VISIBLE,
    visible
  };
};
export const setCallerUserName = (callerUserName: any) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUserName
  };
};

export const setCallRejected = (callRejectedDetails: callRejectedDetailsInterface) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason
    }
  };
};
