export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};

export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE';
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME';
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED';
export const CALL_SET_REMOTE_STREAM = 'CALL.SET_REMOTE_STREAM';
export const CALL_SET_LOCAL_MICROPHONE_ENABLE = 'CALL.SET_LOCAL_MICROPHONE_ENABLE';
export const CALL_SET_LOCAL_CAMERA_ENABLE = 'CALL.SET_LOCAL_CAMERA_ENABLE';
export const CALL_SET_SCREEN_SHARING_ACTIVE = 'CALL.SET_SCREEN_SHARING_ACTIVE';
export const CALL_RESET_CALL_STATE = 'CALL.RESET_CALL_STATE';
export const CALL_SET_GROUP_CALL_ACTIVE = 'CALL.SET_GROUP_CALL_ACTIVE';
export const CALL_SET_GROUP_CALL_STREAM = 'CALL.SET_GROUP_CALL_STREAM';
export const CALL_CLEAR_GROUP_CALL_DATA = 'CALL.CLEAR_GROUP_CALL_DATA';

export const setLocalStream = (localStream: any) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream
  };
};

export const setCallState = (callState: any) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState
  };
};

export const setCallingDialogVisible = (visible: any) => {
  return {
    type: CALL_SET_CALLING_DIALOG_VISIBLE,
    visible
  };
};

export const setCallerUsername = (callerUsername: any) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUsername
  };
};

export const setCallRejected = (callRejectedDetails: any) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason
    }
  };
};

export const setRemoteStream = (remoteStream: any) => {
  return {
    type: CALL_SET_REMOTE_STREAM,
    remoteStream
  };
};
export const setLocalCameraEnable = (enabled: boolean) => {
  return {
    type: CALL_SET_LOCAL_CAMERA_ENABLE,
    enabled
  };
};

export const setLocalMicrophoneEnable = (enabled: boolean) => {
  return {
    type: CALL_SET_LOCAL_MICROPHONE_ENABLE,
    enabled
  };
};
export const setScreenSharingActive = (active: boolean) => {
  return {
    type: CALL_SET_SCREEN_SHARING_ACTIVE,
    active
  };
};
export const resetCallDateState = () => {
  return {
    type: CALL_RESET_CALL_STATE
  };
};

export const setGroupCallActive = (active) => {
  return {
    type: CALL_SET_GROUP_CALL_ACTIVE,
    active
  };
};

export const setGroupCallInComingStreams = (groupCallStreams: any) => {
  return {
    type: CALL_SET_GROUP_CALL_STREAM,
    groupCallStreams
  };
};
export const clearGroupCallData = () => {
  return {
    type: CALL_CLEAR_GROUP_CALL_DATA
  };
};
