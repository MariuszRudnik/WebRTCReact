import userAvatar from '../../../assets/userAvatar.png';
import { callToOrderUser } from '../../../utils/webRTC/webRTCHandler.ts';

const ActiveUserListItem = (props: any) => {
  const { activeUser } = props;
  const handleListItemPressed = () => {
    callToOrderUser(activeUser);
  };
  return (
    <div
      className="active_user_list_item"
      onClick={handleListItemPressed}
      key={activeUser.userName}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} alt="" />
      </div>
      <span className="active_user_list_text">{activeUser.userName}</span>
    </div>
  );
};

export default ActiveUserListItem;
