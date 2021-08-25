import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import styles from './Details.module.css'
import { useParams } from 'react-router-dom';
import { removeProject } from '../../store/project'

const Details = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [project, setProject] = useState([])
  const { id } = useParams()
  const user = useSelector(state => state.session.user)
  
  useEffect(() => {
    (async function(){
      const res = await fetch(`/api/projects/${id}`)

      if (res.ok) {
        const oneProject = await res.json()
        setProject(oneProject)
      }
    })()
  }, [id])

  async function deleteProject(){
    console.log('hello')
    await dispatch(removeProject(id))
    history.push('/')
  }

  return (
    <div className={styles.overall}>
      <NavBar />
      <div className={styles.mainContent}>
        <div className={styles.categories}>hello
        {user.id === project.user_id ? <>
        <button onClick={deleteProject} className={styles.btn}>Delete dream</button> 
        <button className={styles.btn}>Edit dream</button>
        </>
        : ''}
        </div>
        <div className={styles.left}>
        <h1>{project.name}</h1>
        <img className={styles.photo} src={project.image}></img>
        <p className={styles.text}>About dream</p>
        <p>{project.details}</p>
        </div>

        <div className={styles.right}>
          <div className={styles.supportContainer}>
          <div className={styles.funded}>${project.funding_raised}</div>
          <p className={styles.goal}>pledge of {project.funding_goal}</p>
          <div>{project.backers}</div>
          <p className={styles.goal}>Backers</p>
          <button>Support a dream</button>
          </div>
        </div>
      </div>
      <Footer />
      </div>
  )
};

export default Details;
