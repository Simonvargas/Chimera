import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';

import { getProjects } from '../../store/project';
import { getUsers } from '../../store/session';

import styles from './HomePage.module.css'

const HomePage = () => {
  const allProjects = Object.values(useSelector(state => state.project))
  const allUsers = Object.values(useSelector(state => state.session))
  
  const id = Math.floor(Math.random() * 4) + 1
  console.log('niiim', id)

  const dispatch = useDispatch()
  const [numba, setNumba] = useState([])
  useEffect(() => {
    dispatch(getProjects())
    dispatch(getUsers())
    
  }, [])
 
  useEffect(() => {
    (async function(){
      const res = await fetch(`/api/projects/${id}`)

      if (res.ok) {
        const oneProject = await res.json()
        setNumba(oneProject)
      }
    })()
  }, [])


  return (
    <div>
      
      <div className={styles.mainContent}>
        {/* <div className={styles.categories}>categories</div> */}
        <div className={styles.overall}>
        <div className={styles.left}>
            <p>SPOTLIGHT</p>
            <img className={styles.projectImg2} src={numba.image}></img>
            <p>{numba.name}</p>
            <p className={styles.details}>{numba.details}</p>
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
            <img className={styles.projectImg} src={projects.image}></img>
            <div>
            <p className={styles.title}>{projects.name}</p>
            {/* <p className={styles.details}>{projects.details}</p> */}
            <p className={styles.raised}><span className={styles.span}>${projects.funding_raised} raised</span> of {projects.funding_goal}</p>
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
