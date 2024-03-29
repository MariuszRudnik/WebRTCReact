import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CllingDialog/CallingDialog.tsx';
import {
  callStates,
  setCallRejected,
  setLocalCameraEnable,
  setLocalMicrophoneEnable,
  setMessage
} from '../../../store/actions/callActions';
import ConversationButtons from '../ConversationButtons/ConversationButtons.tsx';
import Messanger from '../Messanger/Messanger.tsx';

const DirectCall = (props: any) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    message,
    setDirectCallMessage
  } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationButtons {...props} />
      )}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <Messanger message={message} setDirectCallMessage={setDirectCallMessage} />
      )}
    </>
  );
};

function mapStoreStateToProps({ call }: any) {
  return {
    ...call
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    hideCallRejectedDialog: (callRejectedDetails: any) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled: boolean) => dispatch(setLocalCameraEnable(enabled)),
    setMicrophoneEnabled: (enabled: boolean) => dispatch(setLocalMicrophoneEnable(enabled)),
    setDirectCallMessage: (received: any, content: any) => dispatch(setMessage(received, content))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
