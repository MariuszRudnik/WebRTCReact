import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CllingDialog/CallingDialog.tsx';
import { callStates, setCallRejected } from '../../../store/actions/callActions';

const DirectCall = (props: any) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog
  } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
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
      dispatch(setCallRejected(callRejectedDetails))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
