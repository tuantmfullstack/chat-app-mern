import { Link } from 'react-router-dom';
import './home.scss';

interface Props {}

const Home = ({}: Props) => {
  return (
    <div className='home'>
      <div className='home__wrapper'>
        <div className='home__title'>Welcome to</div>
        <div className='home__emphasize'>Chat App with Mern</div>
        <div className='home__desc'>
          Sign up or login to have conversations with friends
        </div>
        <Link to={'/login'} style={{ display: 'inline-block' }}>
          <button className='btn home__btn'>Login</button>
        </Link>
        <Link to={'/signup'} style={{ display: 'inline-block' }}>
          <button className='btn home__btn '>Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
