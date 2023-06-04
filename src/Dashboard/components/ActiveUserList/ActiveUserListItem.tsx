import userAvatar from '../../../assets/userAvatar.png';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler.ts';

const ActiveUserListItem = (props: any) => {
  const { activeUser } = props;
  console.log('active UsR');
  console.log(props);
  const handleListItemPressed = () => {
    callToOtherUser(activeUser);
  };
  return (
    <div
      className="active_user_list_item"
      onClick={handleListItemPressed}
      key={activeUser.socketId}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} alt="" />
      </div>
      <span className="active_user_list_text">{activeUser.userName}</span>
    </div>
  );
};

export default ActiveUserListItem;
