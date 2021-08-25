import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';

import { getProjects } from '../../store/project';

import styles from './HomePage.module.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const allProjects = Object.values(useSelector(state => state.project))
  console.log('project', allProjects)

  useEffect(() => {
    dispatch(getProjects())
  }, [])
  return (
    <div>
      
      <div className={styles.mainContent}>
        <div className={styles.categories}>categories</div>
        <div className={styles.projects}>{allProjects?.map(projects => 
        <Link className={styles.link} to={`/projects/${projects.id}`}>
          <div className={styles.projectContainer}>
            <img className={styles.projectImg} src={projects.image}></img>
            <h3 className={styles.title}>{projects.name}</h3>
            <p className={styles.details}>{projects.details}</p>
            <p className={styles.raised}><span className={styles.span}>${projects.funding_raised} raised</span> of {projects.funding_goal}</p>
          </div>
          </Link>
          )}</div>

      </div>
      <Footer />
      </div>
  )
};

export default HomePage;
