
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import styles from './NavBar2.module.css'

const NavBar2 = () => {
  return (
    <nav>
      <div className={styles.container}>
      <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      <img alt='Project' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
      </Link>
      </div>

          <div>
          <NavLink to='/login'>
          <button className={styles.btn}>Log in</button>
          </NavLink>
          <NavLink to='/sign-up'>
          <button className={styles.btn}>Sign up</button>
          </NavLink>
          </div>

      </div>
    </nav>
  );
}

export default NavBar2;