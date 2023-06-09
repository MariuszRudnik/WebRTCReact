import socketClient from 'socket.io-client';
import store from '../../store/store.ts';
import * as dashboardActions from '../../store/actions/dashboardActions.ts';
import { sendPreOfferType } from '../../type/type.ts';
import * as webRTCHandler from '../webRTC/webRTCHandler.ts';
import { SockedTypes, WebRTCType } from '../types/reduxType.ts';

const SERVER = 'http://localhost:4000';

let socket: any;

const broadcastEventTypes = {
  ACTIVE_USER: 'ACTIVE_USER',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

// events relation with direct calls
export const sendPreOffer = (data: sendPreOfferType) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data: any) => {
  socket.emit('pre-offer-answer', data);
};

const handleBroadcastEvent = (data: { event: string; activeUsers: string[] }) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USER:
      const activeUsers = data.activeUsers.filter(
        (activeUser: any) => activeUser.socketId !== socket.id
      );
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
};

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);
  console.log(socket);
  socket.on('connection', () => {
    console.log('succesfully connection with wss server');
    console.log(socket);
  });
  socket.on('broadcast', (data: any) => {
    console.log('broadcast');
    console.log(data);
    handleBroadcastEvent(data);
  });
  //listener related with direct calls
  socket.on('pre-offer', (data: { callerSocketId: string; callerUserName: string }) => {
    webRTCHandler.handlePreOffer(data);
  });
  socket.on('pre-offer-answer', (data: any) => {
    console.log('pre-offer-answer by wss');
    webRTCHandler.handlePreOfferAnswer(data);
  });
  socket.on('webRTC-offer', (data: any) => {
    webRTCHandler.handleOffer(data);
  });
  socket.on('webRTC-answer', (data: { answer: any }) => {
    webRTCHandler.handleAnswer(data);
  });
  socket.on('webRTC-candidate', (data: any) => {
    console.log('ssss');
    console.log(data);
    webRTCHandler.handleCandidate(data);
  });
};

export const registerNewUser = (userName: string) => {
  socket.emit('register-new-user', { userName: userName, socketId: socket.id });
};

export const sendWebRTCOffer = (data: any) => {
  console.log('webRTC-offer');
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data: WebRTCType) => {
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data: any) => {
  console.log('webRTC-candidate emint');
  socket.emit('webRTC-candidate', data);
};
