import React from 'react';

import styles from './Footer.module.css'

const Footer = () => {
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
