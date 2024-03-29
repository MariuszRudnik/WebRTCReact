import React from 'react';
import './GroupCallRoomsList.css';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler.ts';

interface Props {
  hostName: string;
  roomId: string;
}

function GroupCallRoomsListItem(props: any) {
  const { room } = props;
  const handleListItemPressed = () => {
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
  };

  return (
    <div onClick={handleListItemPressed} className="group_calls_list_item background_main_color">
      <span>{room.hostName}</span>
    </div>
  );
}

export default GroupCallRoomsListItem;
