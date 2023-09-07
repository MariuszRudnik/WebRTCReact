import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem.tsx';
import { connect } from 'react-redux';

function GroupCallRoomsList({ groupCallRooms }: any) {
  console.log(groupCallRooms);
  return (
    <>
      {groupCallRooms.map((room: any) => (
        <GroupCallRoomsListItem room={room} key={room.roomId} />
      ))}
    </>
  );
}

const mapStoreStatesToProps = ({ dashboard }: any) => ({
  ...dashboard
});

export default connect(mapStoreStatesToProps)(GroupCallRoomsList);
