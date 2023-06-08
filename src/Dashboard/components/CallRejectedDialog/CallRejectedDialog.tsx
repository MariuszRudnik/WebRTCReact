import './CallRejectedDialog.css';
import { useDispatch } from 'react-redux';
import { callStates, setCallRejected, setCallState } from '../../../store/actions/callActions.ts';
import { useEffect } from 'react';

interface Props {
  reason: string;
}

const CallRejectedDialog = ({ reason }: Props) => {
  const dispatch = useDispatch();
  const hideCallRejectedDialog = (callRejectedDetails: any) => {
    dispatch(setCallRejected(callRejectedDetails));
  };

  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      });
    }, 4000);
  }, []);
  return (
    <div className="call_rejected_dialog background_secondary_color">
      <span>{reason} - Reason</span>
    </div>
  );
};

export default CallRejectedDialog;
