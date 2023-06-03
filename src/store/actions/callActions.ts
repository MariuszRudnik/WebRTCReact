export const CALL_SET_LOCAL_STREAM = 'CALL_SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL_SET_CALL_STATE';

export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};
export const setLocalStream = (localStream: MediaStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream
  };
};

export const setCallState = (callStates: string) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    callStates
  };
};
