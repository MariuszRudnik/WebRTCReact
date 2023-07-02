import React from 'react';
import './GroupCallButton.css';

const GroupCallButton = ({ onClickHandler, label }: any) => {
  return (
    <button onClick={onClickHandler} className="group_call_button">
      {label}
    </button>
  );
};

export default GroupCallButton;
