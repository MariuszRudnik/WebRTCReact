import socketClient from 'socket.io-client';
import store from '../../store/store.ts';
import * as dashboardActions from '../../store/actions/dashboardActions.ts';
import * as webRTCHandler from '../webRTC/webRTCHandler.ts';

const SERVER = 'http://localhost:4000';

let socket: any;

const broadcastEventTypes = {
  ACTIVE_USER: 'ACTIVE_USER',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};
const handleBroadcastEvent = (data: any) => {
  console.log('SSSSSS');
  console.log(data);
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
  // console.log(socket);
  socket.on('connection', () => {
    console.log('succesfully connection with wss server');
    // console.log(socket.id);
  });
  socket.on('broadcast', (data: any) => {
    // console.log('broadcast');
    // console.log('broadcast2');
    handleBroadcastEvent(data);
  });
  //listeners related with direct call
  socket.on('pre-offer', (data: any) => {
    webRTCHandler.handlePreOffer(data);
  });
  socket.on('pre-offer-answer');
};
// events related with direct calls

export const sendPreOffer = (data: any) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data: any) => {
  socket.emit('pre-offer-answer', (data: any) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });
};

export const registerNewUser = (userName: any) => {
  socket.emit('register-new-user', { userName: userName, socketId: socket.id });
};
