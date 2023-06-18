import React from 'react';
import './ActiveUserList.css';
import ActiveUsersListItem from './ActiveUserListItem.tsx';
import { connect } from 'react-redux';

const ActiveUsersList = ({ activeUsers }: any) => {
  return (
    <div className="active_user_list_container">
      {activeUsers.map((activeUser: any) => (
        <ActiveUsersListItem key={activeUser.socketId} activeUser={activeUser} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ dashboard }: any) => ({
  ...dashboard
});

export default connect(mapStateToProps, null)(ActiveUsersList);
