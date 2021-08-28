import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

import styles from './SignUp.module.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords do no match!"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  console.log(errors)
  return (
    <div className={styles.container}>
      <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      <img alt='Project' src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
      </Link>
      </div>
      <div className={styles.container2}>
    <form onSubmit={onSignUp}>
      <div className={styles.container3}>
      <div className={styles.errors}>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <h2 className={styles.h2}>Sign up!</h2>
      <div>
        <input
          className={styles.input}
          placeholder='Username'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <input
        className={styles.input}
          placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <input
        className={styles.input}
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className={styles.btn} type='submit'>Sign Up</button>
      <p className={styles.text}>You are closer to realizing all your dreams</p>
      </div>
      
      <div className={styles.new}>
          Already have an account? <Link to='/login'>Log in!</Link>
        </div>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
