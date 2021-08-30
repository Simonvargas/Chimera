import React from 'react';

import styles from './NotFound.module.css'

const NotFound = () => {

    return (
    <div className={styles.body}>
        <div className={styles.container}>
            <div className={styles.photo1}> 
                <img className={styles.pic1} src='https://i.imgur.com/gDiZ9qX.png'></img>
            </div>
            <div className={styles.photo2}>
                <img className={styles.pic2} src='https://i.imgur.com/HYeZLqI.png'></img>
            </div>
            {/* <div className={styles.photo3}>
                <img  className={styles.pic3}></img>
            </div> */}
            <h2 className={styles.h2}>404 page not found</h2>
            <div className={styles.photo3}>
                <img  className={styles.pic3} src='https://i.imgur.com/rReaUUE.png'></img>
            </div>
        </div>
        </div>
    )
};

export default NotFound;
