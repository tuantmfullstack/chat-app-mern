import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Home from '../components/Home/Home';
import Chat from '../components/Chat/Chat';
import UpdateInfo from '../components/Auth/UpdateInfo';
import UpdatePassword from '../components/Auth/UpdatePassword';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';
export const publicRoutes = [
  { path: '/login', element: Login },
  { path: '/signup', element: Signup },
  { path: '/forgotPassword', element: ForgotPassword },
  { path: '/resetPassword/:token', element: ResetPassword },
  { path: '/home', element: Home },
];

export const privateRoutes = [
  { path: '/', element: Chat },
  { path: '/me', element: UpdateInfo },
  { path: '/updatePassword', element: UpdatePassword },
];
