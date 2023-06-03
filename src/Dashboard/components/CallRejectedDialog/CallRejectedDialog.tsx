import './CallRejectedDialog.css';
import { useDispatch } from 'react-redux';
import { setCallRejected } from '../../../store/actions/callActions.ts';
import { useEffect } from 'react';

const CallRejectedDialog = ({ reason }: any) => {
  const dispatch = useDispatch();
  const hideCallRejectedDialog = (callRejectedDetails: any) => {
    dispatch(setCallRejected(callRejectedDetails));
  };
  console.log(hideCallRejectedDialog);
  useEffect(() => {
    setTimeout(() => {
      console.log('close');
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      });
    }, 4000);
  }, []);
  return (
    <div className="call_rejected_dialog background_secondary_color">
      <span>{reason}</span>
    </div>
  );
};

export default CallRejectedDialog;
