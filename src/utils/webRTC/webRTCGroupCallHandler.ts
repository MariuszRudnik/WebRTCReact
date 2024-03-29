import Peer from 'peerjs';
import store from '../../store/store.ts';
import * as wss from '../wssConnection/wssConnection.ts';
import { registerGroupCall, userWantsToJoinGroupCall } from '../wssConnection/wssConnection.ts';
import {
  callStates,
  clearGroupCallData,
  setCallState,
  setGroupCallActive,
  setGroupCallInComingStreams
} from '../../store/actions/callActions.ts';
import { setGroupCalls } from '../../store/actions/dashboardActions.ts';

let myPeer: any;
let myPeerId: any;
let groupCallRoomId: any;
let groupCallHost: any;

export const connectWithMyPeer = () => {
  // @ts-ignore
  myPeer = new Peer(undefined, { path: '/peerjs', host: '/', port: 4000 });
  myPeer.on('open', (id: any) => {
    console.log('my peer is id' + id);
    myPeerId = id;
  });
  myPeer.on('call', (call: any) => {
    call.answer(store.getState().call.localStream);
    call.on('stream', (incomingStream: any) => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find((stream: any) => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
      console.log('stram came');
    });
  });
};
export const createNewGroupCall = () => {
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};
export const joinGroupCall = (hostSocketId: any, roomId: any) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;

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
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find((stream: any) => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
    console.log('stream came');
  });
};
export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallClosedByHost({
      peerId: myPeerId
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId
    });
  }
  clearGroupData();
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();
  const localStream = store.getState().call.localStream;
  localStream.getVideoTraks()[0].enabled = true;
  localStream.getAudioTraks()[0].enabled = true;
};

export const removeInactiveStream = (data: any) => {
  const groupCallStreams = store
    .getState()
    .call.groupCallStreams.filter((stream: any) => stream.id !== data.streamId);
  store.dispatch(setGroupCallInComingStreams(groupCallStreams));
};

const addVideoStream = (incomingStream: any) => {
  const groupCallStreams = [...store.getState().call.groupCallStreams, incomingStream];
  store.dispatch(setGroupCallInComingStreams(groupCallStreams));
};
export const checkAtiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
