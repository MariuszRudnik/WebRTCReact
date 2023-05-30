import { setLocalStream } from '../../store/actions/callActions.ts';
import store from '../../store/store.ts';

const defaultContains = {
  video: true,
  audio: true
};

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultContains)
    .then((stram) => store.dispatch(setLocalStream(stram)))
    .catch((err) => {
      console.log('error occure when trying to get an access to local stream');
      console.log(err);
    });
};
