import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupThunk } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { AuthUserI } from '../../store/type';
import './Auth.scss';

interface Props {}

const Signup = ({}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const passwordConfirmChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signupHandler = async (e: FormEvent) => {
    e.preventDefault();
    const user: AuthUserI = { name, email, password, passwordConfirm };

    dispatch(signupThunk({ user: user, navigate }));

    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper signup'>
        <div className='auth__group'>
          <div className='auth__title'>Sign up</div>
          <div className='auth__desc'>
            Start a conversation to your friend today!
          </div>
        </div>
        <div className='auth__form'>
          <form onSubmit={signupHandler}>
            <div className='form__wrapper '>
              <label htmlFor='name'>Name</label>
              <input
                value={name}
                onChange={nameChangeHandler}
                id='name'
                placeholder='John Doe'
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='email'>Email Address</label>
              <input
                value={email}
                onChange={emailChangeHandler}
                id='email'
                placeholder='abc@gmail.com'
                type={'email'}
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='password'>Your password</label>
              <input
                value={password}
                onChange={passwordChangeHandler}
                id='password'
                placeholder='Your password'
                type='password'
              />
            </div>
            <div className='form__wrapper '>
              <label htmlFor='passwordConfirm'>Your passwordConfirm</label>
              <input
                value={passwordConfirm}
                onChange={passwordConfirmChangeHandler}
                id='passwordConfirm'
                placeholder='Your password confirm'
                type='password'
              />
            </div>
            <button className='btn auth__btn '>Sign up</button>
          </form>
          <Link to={'/login'}>
            <div className='auth__fail'>
              Have an account?{' '}
              <span className='auth__emphasize'>Login here</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
