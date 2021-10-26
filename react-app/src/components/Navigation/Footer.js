import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Footer.module.css'

const Footer = () => {
  const user = useSelector(state => state.session.user)
  return (
    <div>
      {!user ?
       <div className={styles.container}>
         <div className={styles.startContainer}>
            <a target="_blank" className={styles.items} href="https://www.linkedin.com/in/simon-vargas-aa0b6a14b/"> Linkedin 
            <span className={styles.items2} ><i className="fab fa-linkedin"></i></span>
            </a>
            <a target="_blank" className={styles.items} href="https://github.com/Simonvargas">Github 
            <span className={styles.items2}><i className="fab fa-github-alt"></i></span>
            </a>
          
            <a target="_blank" className={styles.items} href="https://angel.co/u/simon-vargas">Angellist 
           <span className={styles.items2}><i  className="fab fa-angellist"></i></span> 
            </a>
         </div>
        </div> :  <div className={styles.container1}>
         <div className={styles.startContainer}>
            <a target="_blank" className={styles.items1} href="https://www.linkedin.com/in/simon-vargas-aa0b6a14b/"> Linkedin 
            <span className={styles.items2} ><i className="fab fa-linkedin"></i></span>
            </a>
            <a target="_blank" className={styles.items1} href="https://github.com/Simonvargas">Github 
            <span className={styles.items2}><i className="fab fa-github-alt"></i></span>
            </a>
          
            <a target="_blank" className={styles.items1} href="https://angel.co/u/simon-vargas">Angellist 
           <span className={styles.items2}><i  className="fab fa-angellist"></i></span> 
            </a>
         </div>
        </div>}
    </div>
  );
}

export default Footer;
