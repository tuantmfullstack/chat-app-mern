import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import { resetPasswordThunk } from '../../store/authSlice';
import { useParams, useNavigate } from 'react-router-dom';
interface Props {}

const ResetPassword = ({}: Props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useAppDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordConfirmHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const resetPasswordHandler = (e: FormEvent) => {
    e.preventDefault();
    const { token } = param;
    dispatch(
      resetPasswordThunk({ password, passwordConfirm, token, navigate })
    );
    setPassword('');
    setPasswordConfirm('');
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper updatePassword '>
        <div className='auth__group'>
          <div className='auth__title'>Reset Password</div>
          <div className='auth__desc'>
            Change your password to save this account
          </div>
        </div>
        <div className='auth__form'>
          <form onSubmit={resetPasswordHandler}>
            <div className='form__wrapper '>
              <label htmlFor='email'>New password</label>
              <input
                id='email'
                placeholder='new password...'
                type={'password'}
                onChange={passwordHandler}
                value={password}
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='email'>Password confirm</label>
              <input
                id='email'
                placeholder='password confirm...'
                type={'password'}
                onChange={passwordConfirmHandler}
                value={passwordConfirm}
              />
            </div>
            <button className='btn auth__btn'>Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
