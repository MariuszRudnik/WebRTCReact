import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem.tsx';

const dummyList = [
  {
    roomId: '2333',
    hostName: 'Mark'
  },
  {
    roomId: '233ddd3',
    hostName: 'Locla'
  }
];

function GroupCallRoomsList() {
  return (
    <>
      {dummyList.map((room) => (
        <GroupCallRoomsListItem room={room} key={room.roomId} />
      ))}
    </>
  );
}

export default GroupCallRoomsList;
