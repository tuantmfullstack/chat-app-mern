import { useState, ChangeEvent, FormEvent } from 'react';
import { updatePasswordThunk } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
interface Props {}

const UpdatePassword = ({}: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordConfirmChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const updatePasswordHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      updatePasswordThunk({
        currentPassword,
        password,
        passwordConfirm,
        navigate,
      })
    );
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper updatePassword '>
        <div className='auth__group'>
          <div className='auth__title'>Update Password</div>
          <div className='auth__desc'>
            Change your password to save this account
          </div>
        </div>
        <div className='auth__form'>
          <form onSubmit={updatePasswordHandler}>
            <div className='form__wrapper'>
              <label htmlFor='email'>Your current password:</label>
              <input
                id='email'
                placeholder='your current password...'
                type={'password'}
                onChange={currentPasswordChangeHandler}
                value={currentPassword}
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='email'>New password</label>
              <input
                id='email'
                placeholder='new password...'
                type={'password'}
                onChange={passwordChangeHandler}
                value={password}
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='email'>Password confirm</label>
              <input
                id='email'
                placeholder='password confirm...'
                type={'password'}
                onChange={passwordConfirmChangeHandler}
                value={passwordConfirm}
              />
            </div>
            <button className='btn auth__btn '>Update</button>
          </form>
          <Link to={'/'}>
            <div className='back__to__home'>Back to home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
