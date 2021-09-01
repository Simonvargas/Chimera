import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';

import styles from './LoginForm.module.css'
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <Link to='/' className={styles.btn3} onClick={onLogout}>Logout</Link>;
};

export default LogoutButton;
