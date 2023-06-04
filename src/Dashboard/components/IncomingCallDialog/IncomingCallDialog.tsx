import './IncomingCallDialog.css';

interface Props {
  callerUserName: string;
}

const IncomingCallDialog = ({ callerUserName }: Props) => {
  const handleAcceptButtonPressed = () => {
    console.log('ww');
  };
  const handleRejectButtonPressed = () => {
    console.log('ss');
  };
  return (
    <div className="direct_calling_dialog background_secondary_color">
      <span className="direct_call_dialog_caller_name">Caller : {callerUserName}</span>
      <div className="direct_call_dialog_button_container">
        <button className="direct_call_dialog_accept_button" onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className="direct_call_dialog_reject_button" onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
