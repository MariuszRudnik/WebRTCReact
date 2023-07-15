import React from 'react';
import GroupCallButton from '../GroupCallButton/GroupCallButton.tsx';
import { connect } from 'react-redux';
import { callStates } from '../../../store/actions/callActions.ts';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler.ts';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom.tsx';

const GroupCall = (props: any) => {
  const { callState, localStream, groupCallActive, groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };
  console.log(groupCallActive);
  console.log(groupCallStreams);
  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label="Create room" />
      )}
      {groupCallActive && <GroupCallRoom groupCallStreams={groupCallStreams} />}
    </>
  );
};

const mapStoreStateToProps = ({ call }: any) => ({
  ...call
});

export default connect(mapStoreStateToProps)(GroupCall);
