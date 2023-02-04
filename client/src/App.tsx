import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { privateRoutes, publicRoutes } from './route/index';
import { isLoginSelector } from './store/selectors';
import { useAppSelector } from './store/store';

function App() {
  const isLogin = useAppSelector(isLoginSelector);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route) => {
          const Page = route.element;
          return (
            <Route
              key={Math.random()}
              path={route.path}
              element={isLogin ? <Navigate to={'/'} /> : <Page />}
            />
          );
        })}
        {privateRoutes.map((route) => {
          const Page = route.element;
          return (
            <Route
              key={Math.random()}
              path={route.path}
              element={isLogin ? <Page /> : <Navigate to={'/home'} />}
            />
          );
        })}
        <Route path='*' element={<Navigate to={'/home'} />} />
      </Routes>
    </Router>
  );
}
export default App;
