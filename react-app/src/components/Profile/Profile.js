import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import { getProjects } from '../../store/project';
import { getbackings } from '../../store/backing';
import styles from './Profile.module.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const backings = Object.values(useSelector(state => state.backing))
    const allProjects = Object.values(useSelector(state => state.project))

    console.log('hi',backings)
  console.log('prp', backings)
    useEffect(() => {
      dispatch(getProjects())
      dispatch(getbackings())
    }, [])
  
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  async function deleteBacking(e){
    // await dispatch(removeBacking(Number(e.target.id)))
    // history.go(0)
  }
  return (
    <div>
      <NavBar />
      <div className={styles.mainContent}>
          <div className={styles.profileInfo}>
              <h1 className={styles.text}>Dreams can become reality</h1>
              <p className={styles.text}>Welcome to your profile page, {user.username} </p>
              <p className={styles.text}>Email: {user.email}</p>
          </div>
          <div className={styles.projects}>
        <h2>Created Dreams</h2>
        <div className={styles.createdProjects}>
          
        <div className={styles.test1}>
        {allProjects?.map(project => {
          if (user.id === project.user_id)
          return (
            <Link  className={styles.link} to={`/projects/${project.id}`} >
          <div className={styles.createdProjectsContainer}>
            <img className={styles.image} src={project.image}></img>
            <p>{project.name}</p>
            <p>Funding Goal: ${project.funding_goal}</p>
            <p>Funding Raised: ${project.funding_raised}</p>
          </div>
          </Link>
        )})}
        </div>
        </div>
        <h2>Dreams Backed</h2>
        <div className={styles.createdProjects}>
        {allProjects.map(project => {
          for (let i = 0; i < backings.length; i++) {
            if (backings[i].user_id === user.id) {
            }
            if (project.id === backings[i].project_id && user.id === backings[i].user_id) {
              return (
                <Link  className={styles.link} to={`/projects/${project.id}`} >
                <div className={styles.createdProjectsContainer}>
            <img className={styles.image} src={project.image}></img>
            <p>{project.name}</p>
            <p>Backing amount: ${backings[i].amount}</p>
            <p>Funding Raised: ${project.funding_raised}</p>
          
                </div>
                </Link>
              )
            }
          }
        })}
        </div>
        </div>
        
      </div>
      <Footer />
      </div>
      

  )
};

export default HomePage;
