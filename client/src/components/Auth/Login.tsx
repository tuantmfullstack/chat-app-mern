import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { AuthUserI } from '../../store/type';
import './Auth.scss';

interface Props {}

const Login = ({}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    const user: AuthUserI = { email, password };

    dispatch(loginThunk({ user, navigate }));

    setEmail('');
    setPassword('');
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper login'>
        <div className='auth__group'>
          <div className='auth__title'>Login</div>
          <div className='auth__desc'>Have a good time with friends!</div>
        </div>
        <div className='auth__form'>
          <form onSubmit={loginHandler}>
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
            <div className='form__wrapper '>
              <label htmlFor='password'>Your password</label>
              <input
                id='password'
                placeholder='Your password'
                type='password'
                onChange={passwordChangeHandler}
                value={password}
              />
            </div>
            <button className='btn auth__btn '>Login</button>
          </form>
          <Link to={'/forgotPassword'}>
            <div className='forgot__password'>Forgot password?</div>
          </Link>
          <Link to={'/signup'}>
            <div className='auth__fail'>
              Don't have an account yet?{' '}
              <span className='auth__emphasize'>Create one</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
