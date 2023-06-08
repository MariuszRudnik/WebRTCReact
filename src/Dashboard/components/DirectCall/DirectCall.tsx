import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView.tsx';
import { useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';
import CallingDialog from '../CllingDialog/CallingDialog.tsx';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog.tsx';
import { callStates, setCallRejected } from '../../../store/actions/callActions.ts';
import callReducer from '../../../store/reducers/callReducer.ts';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog.tsx';

interface DirectCallType {
  remoteStream?: any;
  localStream?: any;
  callState?: string;
  callingDialogVisible?: boolean;
  callerUserName?: string;
  callRejected?: { rejected: boolean; reason: string } | any;
}

const DirectCall = () => {
  const call: DirectCallType = useSelector((state: DashboardStateTypes) => state.call);
  const {
    remoteStream,
    localStream,
    callState,
    callingDialogVisible,
    callerUserName,
    callRejected
  } = call;

  console.log('call');
  console.log(callRejected);
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callingDialogVisible && <CallingDialog />}
      {callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} />}
      {callState == callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUserName={callerUserName} />
      )}
    </>
  );
};

export default DirectCall;
