import React from 'react';
import './Messanger.css';
function MessangerDisplayer(props) {
  return <div className="message_displayer">{props.message}</div>;
}

export default MessangerDisplayer;
