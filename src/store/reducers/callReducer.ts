import * as callActions from '../actions/callActions.ts';
import { callStates } from '../actions/callActions.ts';
const initState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUserName: '',
  callRejected: {
    rejected: false,
    reason: ''
  }
};
const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callStates
      };
    case callActions.CALL_SET_CALLER_USERNAME:
      return {
        ...state,
        callerUserName: action.callerUserName
      };
    case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
      return {
        ...state,
        callingDialogVisible: action.visible
      };
    case callActions.CALL_SET_CALL_REJECTED:
      return {
        ...state,
        callRejected: action.callRejected
      };

    default:
      return state;
  }
};
export default reducer;
