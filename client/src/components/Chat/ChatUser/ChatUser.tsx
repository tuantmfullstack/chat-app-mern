import { Lock, Edit, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import './chatUser.scss';
import { useAppDispatch } from '../../../store/store';
import authSlice from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors';
import { useState, useEffect } from 'react';
import { UserI } from '../../../store/type';

interface Props {}

const ChatUser = ({}: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(userSelector);
  const [user, setUser] = useState<UserI>();

  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser]);

  const logOutHandler = () => {
    dispatch(authSlice.actions.logout(''));
  };

  return (
    <div className='chatUser'>
      <img src={user?.avatar} className='chat__user__img' />

      <Link to={'/updatePassword'}>
        <div className='updateInfo'>
          <Lock />
        </div>
      </Link>

      <Link to={'/me'}>
        <div className='updateInfo'>
          <Edit />
        </div>
      </Link>

      <div className='updateInfo' onClick={logOutHandler}>
        <LogOut />
      </div>
    </div>
  );
};

export default ChatUser;
