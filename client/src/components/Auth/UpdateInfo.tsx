import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfoThunk, updateInfoThunk } from '../../store/authSlice';
import {
  isLoginSelector,
  userIdSelector,
  userSelector,
} from '../../store/selectors';
import { useAppDispatch } from '../../store/store';
import { UserI } from '../../store/type';
import './Auth.scss';
import Avatar from './Avatar';

interface Props {}

const UpdateInfo = ({}: Props) => {
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useAppDispatch();
  const currentUserId = useSelector(userIdSelector)!;
  const [user, setUser] = useState<UserI>();
  const currentUser = useSelector(userSelector)!;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUser({ ...currentUser });
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updateInfoHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateInfoThunk({ id: currentUserId, name, email }));
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper info'>
        <div className='auth__group'>
          <div className='auth__title'>Update Info</div>
          <div className='auth__desc'>Update info to connect more friends</div>
        </div>
        <div className='auth__form'>
          <div className='form__info'>
            <Avatar />
            <form onSubmit={updateInfoHandler}>
              <div className='info__wrapper'>
                <div className='form__wrapper'>
                  <label htmlFor='email'>Name</label>
                  <input
                    id='email'
                    placeholder='your current password...'
                    value={name}
                    onChange={nameChangeHandler}
                  />
                </div>
                <div className='form__wrapper '>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    placeholder='new password...'
                    value={email}
                    onChange={emailChangeHandler}
                  />
                </div>
                <button className='btn auth__btn '>Update</button>
              </div>
            </form>
          </div>
          <Link to={'/'}>
            <div className='back__to__home'>Back to home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfo;
