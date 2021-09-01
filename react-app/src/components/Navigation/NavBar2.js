
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar2.module.css'
import { Modal } from '../../ModalContext/ModalContext';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


const NavBar2 = () => {


  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false)
  const [shows, setShow] = useState(false)


  function show() {
    setShowModal1(true)
  }

  function hide() {
    setShowModal1(false)
  }

  function show1() {
    setShowModal2(true)
  }

  function hide1() {
    setShowModal2(false)
  }
  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.photoContainer}>
          <Link className={styles.link} to='/'>
            <img alt='rotate' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
          </Link>

        </div>

        <div>
          <button className={styles.btn} onClick={show}>Log In</button>

          <Rodal closeOnEsc={true} clasName={styles.ro} showCloseButton={false} className={styles.rodal} animation='rotate' visible={showModal1} onClose={hide}>
            <div className={styles.rodal}>
              <LoginForm setShowModal2={setShowModal2} setShowModal1={setShowModal1}/>
            </div>
          </Rodal>

          <button className={styles.btn} onClick={show1}>Sign up</button>

          <Rodal showCloseButton={false}  animation='rotate' visible={showModal2} onClose={hide1}>
            <div className={styles.rodal}>
              <SignUpForm setShowModal2={setShowModal2} setShowModal1={setShowModal1}/>
            </div>
          </Rodal>
        </div>
      </div>
    </nav>
  );
}

export default NavBar2;