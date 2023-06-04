import socketClient from 'socket.io-client';
import store from '../../store/store.ts';
import * as dashboardActions from '../../store/actions/dashboardActions.ts';
import { sendPreOfferType } from '../../type/type.ts';
import * as webRTCHandler from '../webRTC/webRTCHandler.ts';

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

const handleBroadcastEvent = (data: any) => {
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
    handleBroadcastEvent(data);
  });
  //listener related with direct calls
  socket.on('pre-offer', (data: { callerSocketId: string; callerUserName: string }) => {
    webRTCHandler.handlePreOffer(data);
  });
};

export const registerNewUser = (userName: any) => {
  socket.emit('register-new-user', { userName: userName, socketId: socket.id });
};
