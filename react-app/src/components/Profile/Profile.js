import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';

import styles from './Profile.module.css'

const HomePage = () => {
    const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div>
      <NavBar />
      <div className={styles.mainContent}>
          <div className={styles.profileInfo}>
              <h1 className={styles.text}>Dreams can become reality</h1>
              <p className={styles.text}>Welcome to your profile page, {user.username} </p>
              <p className={styles.text}>Email: {user.email}</p>
          </div>
          <div className={styles.projects}>
        <div className={styles.createdProjects}>
        <h2>Created Dreams</h2>
        </div>

        <div className={styles.backedProjects}>
        <h2>Dreams backed</h2>
        </div>
        </div>

      </div>
      <Footer />
      </div>
  )
};

export default HomePage;
