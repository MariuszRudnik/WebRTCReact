import React from 'react';
import './GroupCallRoomsList.css';

interface Props {
  hostName: string;
  roomId: string;
}

function GroupCallRoomsListItem(props: any) {
  const { room } = props;
  const handleListItemPressed = () => {
    console.log('Hellow ');
  };

  return (
    <div onClick={handleListItemPressed} className="group_calls_list_item background_main_color">
      <span>{room.hostName}</span>
    </div>
  );
}

export default GroupCallRoomsListItem;
