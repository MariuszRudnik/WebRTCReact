import Peer from 'peerjs';
import store from '../../store/store.ts';
import * as wss from '../wssConnection/wssConnection.ts';
import { registerGroupCall, userWantsToJoinGroupCall } from '../wssConnection/wssConnection.ts';
import { callStates, setCallState, setGroupCallActive } from '../../store/actions/callActions.ts';
import { setGroupCalls } from '../../store/actions/dashboardActions.ts';

let myPeer;
let myPeerId: any;
export const connectWithMyPeer = () => {
  myPeer = new Peer(undefined, { path: '/peerjs', host: '/', port: 4000 });
  myPeer.on('open', (id) => {
    console.log('my peer is id' + id);
    myPeerId = id;
  });
  myPeer.on('call', (call) => {
    call.answer(store.getState().call.localStream);
    call.on('stream', (incomingStream) => {
      console.log('stram came');
    });
  });
};
export const createNewGroupCall = () => {
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};
export const joinGroupCall = (hostSocketId: any, roomId: any) => {
  const localStream = store.getState().call.localStream;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    streamId: localStream.id
  });
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};
export const connectToNewUser = (data: any) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);
  call.on('stream', (incomingStream: any) => {
    console.log('stream came');
  });
};
