import './Dashboard.css';
import logo from '../assets/logo.png';
import ActiveUserList from './components/ActiveUserList/ActiveUserList.tsx';

const Dashboard = () => {
  return (
    <div className="dashboard_container background_main_color ">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container">contaniner</div>
        <div className="dashboard_rooms_container background_secondary_color">rooms</div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <div className="dashboard_active_users_list">
          <ActiveUserList />
        </div>
        <div className="dashboard_logo_container">
          <img className="dashboard_logo_image" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
