import { FormEvent, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import { forgotPasswordThunk } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
interface Props {}

const ForgotPassword = ({}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const resetPasswordHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email });
    dispatch(forgotPasswordThunk({ email, navigate }));
    setEmail('');
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper login'>
        <div className='auth__group'>
          <div className='auth__title'>Forgot password</div>
          <div className='auth__desc'>
            We will sent resetToken to you through your email
          </div>
        </div>
        <div className='auth__form'>
          <form onSubmit={resetPasswordHandler}>
            <div className='form__wrapper '>
              <label htmlFor='email'>Email Address</label>
              <input
                id='email'
                placeholder='abc@gmail.com'
                type={'email'}
                onChange={emailChangeHandler}
                value={email}
              />
            </div>
            <button className='btn auth__btn '>Reset password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
