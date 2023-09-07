import React from 'react';
import GroupCallButton from '../GroupCallButton/GroupCallButton.tsx';
import { connect } from 'react-redux';
import {
  callStates,
  setLocalCameraEnable,
  setLocalMicrophoneEnable
} from '../../../store/actions/callActions.ts';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler.ts';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom.tsx';

const GroupCall = (props: any) => {
  const { callState, localStream, groupCallActive, groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };
  const leaveRoom = () => {
    console.log(webRTCGroupCallHandler.leaveGroupCall());
    console.log('test');
    webRTCGroupCallHandler.leaveGroupCall();
  };
  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label="Create room" />
      )}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && (
        <>
          <p>sss</p>
          <GroupCallButton onClickHandler={leaveRoom} label="Leave room" />
        </>
      )}
    </>
  );
};

const mapStoreStateToProps = ({ call }: any) => ({
  ...call
});
const mapActionToProps = (dispatch: any) => {
  return {
    setCameraEnabled: (enable: any) => dispatch(setLocalCameraEnable(enable)),
    setMicrophoneEnabled: (enable: any) => dispatch(setLocalMicrophoneEnable(enable))
  };
};

export default connect(mapStoreStateToProps, mapActionToProps)(GroupCall);
