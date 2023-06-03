import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';
import CallingDialog from '../CllingDialog/CallingDialog.tsx';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog.tsx';
import { callStates, setCallRejected } from '../../../store/actions/callActions.ts';
import React from 'react';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog.tsx';
import callReducer from '../../../store/reducers/callReducer.ts';

const DirectCall = () => {
  const call: any = useSelector((state: DashboardStateTypes) => state.call);

  console.log('call');
  console.log(call);
  const {
    remoteStream,
    localStream,
    callState,
    callingDialogVisible,
    callerUserName,
    callRejected
  } = call;
  console.log('callRejected');
  console.log(callRejected);
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} />}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUserName={callerUserName} />
      )}
      {callingDialogVisible && <CallingDialog />}
    </>
  );
};

export default DirectCall;
