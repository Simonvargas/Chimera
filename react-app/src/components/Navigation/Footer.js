import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import styles from './Footer.module.css'

const Footer = () => {
  const user = useSelector(state => state.session.user)
  return (
    <div>
       <div className={styles.container}>
         <div className={styles.startContainer}>
         <p className={styles.start}>Github</p>
         <p className={styles.start}>LinkedIn</p>
         <p className={styles.start}>Angel's List</p>
         </div>
        </div>
    </div>
  );
}

export default Footer;
