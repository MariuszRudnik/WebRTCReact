import React, { useEffect, useState } from 'react';
import './Messanger.css';

import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler.ts';
import MessangerDisplayer from './MessangerDisplayer.tsx';

const Messanger = ({ message, setDirectCallMessage }: any) => {
  const [inputValue, setInputValue] = useState('');
  const handleOnKeyDownEvent = (e: any) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
    }
  };
  useEffect(() => {
    if (message.received) {
      setTimeout(() => {
        setDirectCallMessage(false, '');
      }, 3000);
    }
  }, [message.received]);
  return (
    <>
      <input
        className="messages_input"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleOnKeyDownEvent}
        placeholder="Wpisz swoją wiadomość"
      />
      {message.received && <MessangerDisplayer message={message.content} />}
    </>
  );
};

export default Messanger;
