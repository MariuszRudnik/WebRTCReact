import userAvatar from '../../../assets/userAvatar.png';

const ActiveUserListItem = (props: any) => {
  const { activeUser } = props;
  // const handleListItemPresssed = () => {
  //   console.log('ss');
  // };
  return (
    <div className="active_user_list_item">
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} alt="" />
      </div>
      <span className="active_user_list_text">{activeUser}</span>
    </div>
  );
};

export default ActiveUserListItem;
