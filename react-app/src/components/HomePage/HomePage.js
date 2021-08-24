import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const HomePage = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
      <p>HomePage</p>
  )
};

export default HomePage;
