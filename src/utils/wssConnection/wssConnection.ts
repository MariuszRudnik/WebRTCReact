import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallHandler.ts';

const SERVER = import.meta.env.VITE_HTTP;
console.log(SERVER);

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

let socket: any;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
  });

  socket.on('broadcast', (data: any) => {
    handleBroadcastEvents(data);
  });

  // listeners related with direct call
  socket.on('pre-offer', (data: any) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on('pre-offer-answer', (data: any) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-offer', (data: any) => {
    webRTCHandler.handleOffer(data);
  });

  socket.on('webRTC-answer', (data: any) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on('webRTC-candidate', (data: any) => {
    webRTCHandler.handleCandidate(data);
  });
  socket.on('user-hanged-up', () => {
    webRTCHandler.handleUserHangUp();
  });
  // listening related with group calls
  socket.on('group-call-join-request', (data: any) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });
  socket.on('group-call-user-left', (data: any) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });
};

export const registerNewUser = (username: any) => {
  socket.emit('register-new-user', {
    username: username,
    socketId: socket.id
  });
};

// emitting events to server related with direct call

export const sendPreOffer = (data: any) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data: any) => {
  socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data: any) => {
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data: any) => {
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data: any) => {
  socket.emit('webRTC-candidate', data);
};

const handleBroadcastEvents = (data: any) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser: any) => activeUser.socketId !== socket.id
      );
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      const groupCallRooms = data.groupCallRooms.filter((room: any) => room.socketId !== socket.id);
      const activeGroupCallRoomId = webRTCGroupCallHandler.checkAtiveGroupCall();

      if (activeGroupCallRoomId) {
        const room = groupCallRooms.find((room: any) => room.roomId === activeGroupCallRoomId);
        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }
      store.dispatch(dashboardActions.setGroupCalls(data.groupCallRooms));
      break;
    default:
      break;
  }
};

export const sendUserHangedUp = (data: { connectedUserSocketId: any }) => {
  socket.emit('user-hanged-up', data);
};

export const registerGroupCall = (data: any) => {
  socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data: any) => {
  socket.emit('group-call-joni-request', data);
};
export const userLeftGroupCall = (data: any) => {
  socket.emit('group-call-user-left', data);
};
export const groupCallClosedByHost = (data: any) => {
  socket.emit('group-call-closed-by-host', data);
};
