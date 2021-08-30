
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar2.module.css'
import { Modal } from '../../ModalContext/ModalContext';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';


const NavBar2 = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false)

  return (
    <nav>
      <div className={styles.container}>
      <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      <img alt='Project' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
      </Link>
      </div>

          <div>
          <button className={styles.btn} onClick={() => setShowModal1(true)}>Log In</button>
          {showModal1 && (<Modal onClose={() => setShowModal1(false)}> <LoginForm setShowModal1={setShowModal1} setShowModal2={setShowModal2} />  </Modal>)}

          <button className={styles.btn} onClick={() => setShowModal2(true)}>Sign Up</button>
          {showModal2 && (<Modal onClose={() => setShowModal2(false)}> <SignUpForm setShowModal1={setShowModal1} setShowModal2={setShowModal2}/>  </Modal>)}
          </div>

      </div>
    </nav>
  );
}

export default NavBar2;