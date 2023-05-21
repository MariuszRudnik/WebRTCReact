import './LoginPages.css';
import logo from '../assets/logo.png';
import { useState } from 'react';
import UserNameButton from './components/UserNameButton.tsx';
import SubmitButton from './components/SubmitButton.tsx';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../store/actions/dashboardActions.ts';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitButtonPressed = () => {
    dispatch(setUserName(userName));
    navigate('/dashboard');
  };
  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div>
          <img className="login-page_logo_image" src={logo} alt="vide toker" />
        </div>
        <div className="login-page_title_container">
          <h2>Get on Board</h2>
        </div>
        <UserNameButton username={userName} setUserName={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

export default LoginPage;
