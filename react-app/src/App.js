import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/HomePage/Home';
import CreateProject from './components/CreateProject/CreateProject'
import Profile from './components/Profile/Profile'
import Details from './components/Details/Details'
import NotFound from './components/NotFound/NotFound';

import { ModalProvider } from './ModalContext/ModalContext'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>

    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <Home />
        </Route>
      <ProtectedRoute path='/profile'>
        <Profile />
      </ProtectedRoute>

      <ProtectedRoute path='/projects/:id' exact={true}>
        <Details />
      </ProtectedRoute>

      <Route to='/'>
    <NotFound />
      </Route>

      </Switch>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
