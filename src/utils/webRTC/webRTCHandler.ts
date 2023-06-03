import { callStates, setCallState, setLocalStream } from '../../store/actions/callActions.ts';
import store from '../../store/store.ts';

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
