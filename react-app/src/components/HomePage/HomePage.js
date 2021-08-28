import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';

import { getUsers } from '../../store/session';
import { getProjects } from '../../store/project';

import styles from './HomePage.module.css'

const HomePage = () => {
  const allProjects = Object.values(useSelector(state => state.project))
  const allUsers = Object.values(useSelector(state => state.session))
  

  const dispatch = useDispatch()
  const [numba, setNumba] = useState([])
  useEffect(() => {
    dispatch(getProjects())
    dispatch(getUsers())
    
  }, [dispatch])
 
  useEffect(() => {
    (async function(){
      const res = await fetch(`/api/projects/${3}`)

      if (res.ok) {
        const oneProject = await res.json()
        setNumba(oneProject)
      }
    })()
  }, [])


  return (
    <div className={styles.overall1}>
      
      <div className={styles.mainContent}>
        <div className={styles.overall}>
        <div className={styles.left}>
            <p>SPOTLIGHT</p>
            <img alt='Project' className={styles.projectImg2} src={numba.image}></img>
            <p>{numba.name}</p>
            {allUsers.map(user => {
            if (user.id === numba.user_id) {
              return (
              <p>by {user.username}</p>
              )}})}
        </div>
        
        <div className={styles.right}>
          <p>ALL</p>
        <div className={styles.projects}>
          {allProjects?.map(projects => 
          
        <Link className={styles.link} to={`/projects/${projects.id}`}>
          <div className={styles.projectContainer}>
            <img alt='Project' className={styles.projectImg} src={projects.image}></img>
            <div>
            <p className={styles.title}>{projects.name}</p>
            <p className={styles.raised}><span className={styles.span}>{Math.round(projects.funding_raised / projects.funding_goal * 100)}% raised</span> </p>
            </div>
          </div>
          </Link>
          )}
          </div>
          </div>

      </div>
      </div>
      <Footer />
      </div>
  )
};

export default HomePage;
