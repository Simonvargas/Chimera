import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import { getProjects } from '../../store/project';
import { getbackings } from '../../store/backing';
import styles from './Profile.module.css'
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'

const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const backings = Object.values(useSelector(state => state.backing))
    const allProjects = Object.values(useSelector(state => state.project))

    useEffect(() => {
      dispatch(getProjects())
      dispatch(getbackings())
    }, [dispatch])
  

  
  return (
    <div>
      <NavBar />
      <div className={styles.mainContent}>
          {/* <div className={styles.profileInfo}>
              <h1 className={styles.text}>Dreams can become reality</h1>
              <p className={styles.text}>Welcome to your profile page, {user.username} </p>
              <p className={styles.text}>Email: {user.email}</p>
          </div> */}
          <div className={styles.projects}>
        <h2 className={styles.h2}>Created Dreams</h2>
        <div className={styles.createdProjects}>
          
        {allProjects?.map(project => {
          if (user.id === project.user_id)
          return (
            <Link  className={styles.link} to={`/projects/${project.id}`} >
          <div className={styles.createdProjectsContainer}>
            <img alt='Project' className={styles.image} src={project.image}></img>
            <p>{project.name}</p>
            <p>Funding Goal: ${project.funding_goal}</p>
            <p>Funding Raised: ${project.funding_raised}</p>
            <ProgressBar style={{ height: '1rem', backgroundColor: '#08e1ae', backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)' }} now={Math.round(project.funding_raised / project.funding_goal * 100)} label={Math.round(project.funding_raised / project.funding_goal * 100) + '%'} animated />
          </div>
          </Link>
        )})}
        </div>
        <h2 className={styles.h2}>Dreams Backed</h2>
        <div className={styles.createdProjects}>
        {allProjects.map(project => {
          for (let i = 0; i < backings.length; i++) {
            let total = 0
          
            console.log('total', total)
            if (project.id === backings[i].project_id && user.id === backings[i].user_id) {
              return (
                <Link  className={styles.link} to={`/projects/${project.id}`} >
                <div className={styles.createdProjectsContainer}>
            <img alt='Project' className={styles.image} src={project.image}></img>
            <p>{project.name}</p>
            <p>Backing amount: ${backings[i].amount}</p>
            <p>Funding Raised: ${project.funding_raised}</p>
            <ProgressBar style={{ height: '1rem', backgroundColor: '#08e1ae', backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)' }} now={Math.round(project.funding_raised / project.funding_goal * 100)} label={Math.round(project.funding_raised / project.funding_goal * 100) + '%'} animated />
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
