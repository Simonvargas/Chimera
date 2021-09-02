
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux'
import styles from './NavBar1.module.css'
import { Modal } from '../../ModalContext/ModalContext';
import CreateProject from '../CreateProject/CreateProject'

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const NavBar1 = () => {
  const user = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  function show(){
    setShowModal(true)
  }
  function hide() {
    setShowModal(false)
  }


  return (
    <nav>
      <div className={styles.container}>
        {/* <div className={styles.startContainer}>


          <input
            placeholder='Search..'
            type='text'
            className={styles.searchBar}
          // onChange={(e) => setSearchInput((e.target.value).toLowerCase())}
          />
          <Link className={styles.link} to='/categories'>
            <p className={styles.start}>Explore Projects</p>
          </Link>

        </div> */}

        <div className={styles.photoContainer}>
          <Link className={styles.link} to='/'>
            <img alt='Project' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
          </Link>
        </div>
        <div className={styles.endContainer}>
          
        <button className={styles.btn} onClick={show}>Start Project</button>
        
        <Rodal closeOnEsc={true} clasName={styles.ro} showCloseButton={false} className={styles.rodal} animation='door' visible={showModal} onClose={hide}>
            <div className={styles.rodal}>
              <CreateProject showModal={showModal} setShowModal={setShowModal}/>
            </div>
          </Rodal>
          
          <Link className={styles.link} to='/profile'>
            <p className={styles.start}>Welcome, {user.username}! </p>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar1;
