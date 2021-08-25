import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import styles from './Details.module.css'

const Details = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className={styles.overall}>
      <NavBar />
      <div className={styles.mainContent}>
        <div className={styles.categories}>hello</div>

      </div>
      <Footer />
      </div>
  )
};

export default Details;
