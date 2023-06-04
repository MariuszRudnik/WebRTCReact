import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView.tsx';
import { useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';
import CallingDialog from '../CllingDialog/CallingDialog.tsx';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog.tsx';
import { callStates } from '../../../store/actions/callActions.ts';

interface DirectCallType {
  remoteStream?: any;
  localStream?: any;
  callState?: string;
  callingDialogVisible?: boolean;
  callerUserName?: string;
  callRejected?: any;
}

const DirectCall = () => {
  const call: DirectCallType = useSelector((state: DashboardStateTypes) => state.call);
  const { remoteStream, localStream, callState, callingDialogVisible, callerUserName } = call;

  console.log('call');
  console.log(callerUserName);
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callingDialogVisible && <CallingDialog />}
      {/*<CallRejectedDialog />*/}
      {callState == callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUserName={callerUserName} />
      )}
    </>
  );
};

export default DirectCall;
