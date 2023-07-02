import React from 'react';
import GroupCallButton from '../GroupCallButton/GroupCallButton.tsx';
import { connect } from 'react-redux';
import { callStates } from '../../../store/actions/callActions.ts';

const GroupCall = (props: any) => {
  const { callState, localStream } = props;

  const createRoom = () => {
    // create room
  };

  return (
    <>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label="Create room" />
      )}
    </>
  );
};

const mapStoreStateToProps = ({ call }: any) => ({
  ...call
});

export default connect(mapStoreStateToProps)(GroupCall);
