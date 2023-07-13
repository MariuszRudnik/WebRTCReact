import React from 'react';
import './GroupCallRoom.css';
import ConversationButtons from '../ConversationButtons/ConversationButtons.tsx';

function GroupCallRoom() {
  return (
    <div className="group_call_room_container">
      <span className="group_call_title">Group Call</span>
      <div className="group_call_videos_container">Display the streams from the other users</div>
      <ConversationButtons />
    </div>
  );
}

export default GroupCallRoom;
