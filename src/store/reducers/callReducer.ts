import * as callActions from '../actions/callActions.ts';
const initState = {
  localStream: null
};
const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    default:
      return state;
  }
};
export default reducer;
