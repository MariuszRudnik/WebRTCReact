import socketClient from 'socket.io-client';
import store from '../../store/store.ts';
import * as dashboardActions from '../../store/actions/dashboardActions.ts';

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
  console.log(socket);
  socket.on('connection', () => {
    console.log('succesfully connection with wss server');
    console.log(socket.id);
  });
  socket.on('broadcast', (data: any) => {
    console.log('broadcast');
    console.log('broadcast2');
    handleBroadcastEvent(data);
  });
};

export const registerNewUser = (userName: any) => {
  socket.emit('register-new-user', { userName: userName, socketId: socket.id });
};
