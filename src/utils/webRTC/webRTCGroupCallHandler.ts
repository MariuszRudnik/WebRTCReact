import Peer from 'peerjs';

let myPeer;

export const connectWithMyPeer = () => {
  myPeer = new Peer(undefined, { path: '/peerjs', host: '/', port: 4000 });
  myPeer.on('open', (id) => {
    console.log('my peer is id' + id);
  });
};
