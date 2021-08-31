import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

import styles from './LoginForm.module.css'


const LoginForm = ({setShowModal2, setShowModal1}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const loginDemoUser = async(e) =>  {
    e.preventDefault()
    const email = "demo@aa.io"
    const password = "password"
    await dispatch(login(email, password))
  }
  function OpenClose() {
    setShowModal1(false)
    setShowModal2(true)

  }
  
  return (
    <div className={styles.container}>
     <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      {/* <img alt='Project' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img> */}
      </Link>
      </div>
      <div className={styles.container2}>
    <form  onSubmit={onLogin}>
      <div className={styles.container3}>
      <div className={styles.errors}>
     {errors.map(err =>( <ul><li>{err}</li></ul>))}
      </div>
      
        <h2 className={styles.h2}>Log In</h2>
        <input
        className={styles.input}
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <input
        className={styles.input}
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button className={styles.btn} type='submit'>Login</button>
        
        <p className={styles.p}><span className={styles.span}>Or</span></p>
        <button onClick={loginDemoUser} className={styles.btn2}>Log in as Demo User</button>
        <p>Log in and being creating wonderful projects</p>
        <p className={styles.new}>New to Chimera? <span className={styles.span} onClick={OpenClose}>Sign up!</span></p>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
