import React from 'react';
import Footer from '../Navigation/Footer';

import styles from './SplashPage.module.css'

const SplashPage = () => {

  return (
       <div>
           <div className={styles.container1}>
               <div className={styles.left}> 
               <div className={styles.containerIn}>
               <h2 >Fufill your Dreams</h2>
               <p>Chimera is the place where dreams happens. From games, to tech, to health, and education, Chimera is the place where everyday individuals invest in other people's dreams. Join now and begin creating tomorrow's new world of amazing projects. </p>
               </div>
               </div>
            <div className={styles.right}>
            <img alt='Project' className={styles.dreamCatcher} src='https://i.imgur.com/EAxJl23.png'></img>
           </div>
           </div>
           <div className={styles.container2}>
           <div className={styles.left}> 
           <div className={styles.containerIn}>
           <img alt='Project' className={styles.pic2} src='https://i.imgur.com/Nk20Q4P.png'></img>
            </div>
               </div>
            <div className={styles.right}>
                <div className={styles.containerIn2}>
                <h2>Reap the rewards</h2>
                <p>Pledge on an project and have the ability to receive rewards depending on how much you play! Helping fufill someone's dream and getting rewarded for it! Sweet!</p>
                </div>
           </div>
           </div>
           <div className={styles.container3}>
           <div className={styles.left}> 
               <div className={styles.containerIn}>
               <h2 >Building a better community</h2>
               <p>Support local dreams. Build a better world with broader ideas, diversity, and many more options</p>
               </div>
               </div>
            <div className={styles.right}>
            <img alt='Project' className={styles.pic3} src='https://i.imgur.com/x8EVmpz.jpg'></img>
           </div>
                       
           </div>
           <div className={styles.container4}>
               <div className={styles.left}>
               <img alt='Project' className={styles.pic4} src='https://i.imgur.com/GpIKZJ8.png'></img>
               </div>
               <div className={styles.right}>
                   <div className={styles.containerIn3}>
                   <h1>Soon coming on your smartphone!</h1>
                   </div>
               </div>
           </div>
           <Footer />
       </div>
  )
};

export default SplashPage;
