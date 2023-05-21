const UserNameButton = (props: any) => {
  const { userName, setUserName } = props;
  return (
    <div className="login-page_input_container">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
        className={'login-page_input background_main_color text_main_color'}
      />
    </div>
  );
};

export default UserNameButton;
