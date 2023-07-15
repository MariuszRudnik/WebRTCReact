import React from 'react';
import './GroupCallRoom.css';
import ConversationButtons from '../ConversationButtons/ConversationButtons.tsx';
// import * as stream from 'stream';
import GroupCallVideo from './GroupCallVideo.tsx';

function GroupCallRoom({ groupCallStreams }: any) {
  return (
    <div className="group_call_room_container">
      <span className="group_call_title">Group Call</span>
      <div className="group_call_videos_container">
        {groupCallStreams.map((stream: any) => {
          return <GroupCallVideo key={stream.id} stream={stream} />;
        })}
      </div>
      <ConversationButtons />
    </div>
  );
}

export default GroupCallRoom;
