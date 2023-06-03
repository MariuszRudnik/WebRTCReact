import './ActiveUserList.css';
import ActiveUserListItem from './ActiveUserListItem.tsx';
import { useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';

const ActiveUserList = () => {
  const activeUsers = useSelector((state: DashboardStateTypes) => state.dashboard.activeUsers);

  console.log(activeUsers);
  return (
    <div className="active_user_list_container">
      {activeUsers.map((activeUser: any) => (
        <ActiveUserListItem key={activeUser.sockedId} activeUser={activeUser} />
      ))}
    </div>
  );
};

export default ActiveUserList;
