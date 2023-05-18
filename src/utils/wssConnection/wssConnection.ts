import socketClient from 'socket.io-client'

const SERVER = 'http://localhost:4000';

let socket: any;

export const connectWithWebSocket = ()=>{
    socket = socketClient(SERVER);
    socket.on('connection', ()=>{

        console.log('succesfully connection with wss server');
        console.log(socket.id);
    })
}
