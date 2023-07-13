import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import ActiveUsersList from './components/ActiveUserList/ActiveUserList.tsx';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import DirectCall from './components/DirectCall/DirectCall';

import './Dashboard.css';
import DashboardReducer from '../store/reducers/dashboardReducer.ts';
import DashboardInformation from './components/DashboardInformation/DashboardInformation.tsx';
import { connect } from 'react-redux';
import { connectWithMyPeer } from '../utils/webRTC/webRTCGroupCallHandler.ts';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList.tsx';
import GroupCall from './components/GroupCall/GroupCall.tsx';
import { callStates } from '../store/actions/callActions.ts';

const Dashboard = ({ username, callState }: any) => {
  useEffect(() => {
    webRTCHandler.getLocalStream();
    connectWithMyPeer();
  }, []);

  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container">
          <DirectCall />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && (
            <DashboardInformation username={username} />
          )}
        </div>
        <div className="dashboard_rooms_container background_secondary_color">
          <GroupCallRoomsList />
        </div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <div className="dashboard_active_users_list">
          <ActiveUsersList />
        </div>
        <div className="dashboard_logo_container">
          <img className="dashboard_logo_image" src={logo} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }: any) => ({ ...dashboard, ...call });

export default connect(mapStateToProps)(Dashboard);
