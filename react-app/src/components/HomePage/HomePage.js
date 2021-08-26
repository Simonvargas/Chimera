import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';

import { getProjects } from '../../store/project';

import styles from './HomePage.module.css'

const HomePage = () => {
  const allProjects = Object.values(useSelector(state => state.project))
  let total = 0
  allProjects.forEach(project => total+=1)
  const id = Math.floor(Math.random() * 3) + 1
  console.log('niiim', id)
  const dispatch = useDispatch()
  const [numba, setNumba] = useState([])
  console.log('oh', numba)
  useEffect(() => {
    dispatch(getProjects())
    
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
        <div className={styles.categories}>categories</div>
        <div className={styles.left}>
          <div>
            {/* <img className= src={ramdon.image}></img> */}
            {/* <p>{allProjects[Math.floor(Math.random()*allProjects.length)].image}</p> */}
            <img className={styles.projectImg} src={numba.image}></img>
            <p>{numba.name}</p>
          </div>

        </div>
        
        <div className={styles.projects}>{allProjects?.map(projects => 
        
        <Link className={styles.link} to={`/projects/${projects.id}`}>
          <div className={styles.projectContainer}>
            <img className={styles.projectImg} src={projects.image}></img>
            <h3 className={styles.title}>{projects.name}</h3>
            <p className={styles.details}>{projects.details}</p>
            <p className={styles.raised}><span className={styles.span}>${projects.funding_raised} raised</span> of {projects.funding_goal}</p>
          </div>
          </Link>
          
          )}
          </div>

      </div>
      <Footer />
      </div>
  )
};

export default HomePage;
