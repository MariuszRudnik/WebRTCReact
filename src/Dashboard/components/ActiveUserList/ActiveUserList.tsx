import './ActiveUserList.css';
import ActiveUserListItem from './ActiveUserListItem.tsx';
import { useSelector } from 'react-redux';
import { DashboardStateTypes } from '../../../utils/types/reduxType.ts';

const ActiveUserList = () => {
  const activeUsers = useSelector((state: DashboardStateTypes) => state.dashboard.activeUsers);

  // console.log(stage);
  return (
    <div className="active_user_list_container">
      {activeUsers.map((active: any) => (
        <ActiveUserListItem key={active.sockedId} activeUser={active.userName} />
      ))}
    </div>
  );
};

export default ActiveUserList;
