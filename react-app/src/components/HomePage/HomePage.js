import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';

import styles from './HomePage.module.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div>
      
      <div className={styles.mainContent}>
        <div className={styles.categories}>hello</div>

      </div>
      <Footer />
      </div>
  )
};

export default HomePage;
