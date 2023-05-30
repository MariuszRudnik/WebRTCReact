import LocalVideoView from '../LocalViedoView/LocalVideoView.tsx';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView.tsx';
import { useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';

const DirectCall = () => {
  const call: any = useSelector((state: DashboardStateTypes) => state.call);
  console.log('call');
  console.log(call);
  const { remoteStream, localStream } = call;
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/*<CallingDialog />*/}
      {/*<CallRejectedDialog />*/}
      {/*<IncomingCallDialog />*/}
    </>
  );
};

export default DirectCall;
