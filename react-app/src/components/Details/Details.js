import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import styles from './Details.module.css'
import { useParams } from 'react-router-dom';
import { removeProject, editProject } from '../../store/project'
import EditForm from './EditForm'
import BackForm from './BackForm';
import { getbackings } from '../../store/backing';
import { getUsers } from '../../store/session';
import  { Redirect } from 'react-router-dom'
const Details = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  
  const [project, setProject] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showForm2, setShowForm2] = useState(false)
  const user = useSelector(state => state.session.user)
  const backings = Object.values(useSelector(state => state.backing))
  const allUsers = Object.values(useSelector(state => state.session))


  useEffect(() => {
    dispatch(getbackings())
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    (async function(){
      const res = await fetch(`/api/projects/${id}`)

      if (res.ok) {
        const oneProject = await res.json()
        setProject(oneProject)
      }
    })()
  }, [id, showForm])

  async function deleteProject(){
    await dispatch(removeProject(id))
    history.push('/')
    history.go(0)
  }

  function show() {
    setShowForm(true)
  }

  function show2() {
    setShowForm2(true)
  }

  return (
    <div className={styles.overall}>
      <NavBar />
      <div className={styles.mainContent}>
        <div className={styles.categories}>hello
        
        {user.id === project.user_id ? <>
        <button onClick={deleteProject} className={styles.btn}>Delete dream</button> 
        <button onClick={show} className={styles.btn}>Edit dream</button>
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
          <button onClick={show2}>Support a dream</button>
          </div>
          {showForm ? <EditForm setShowForm={setShowForm} /> : ''}
          {showForm2 ? <BackForm setShowForm2={setShowForm2} /> : ''}
        </div>
      </div>
      
      <div className={styles.commentsContainer}>
        <h2>Backers Donations & Comments</h2>
          <div>
            {backings?.map(backing => {
              for (let i = 0; i < allUsers.length; i++) {
                if (project.id === backing.project_id && allUsers[i].id === backing.user_id) {
                  return (
                    <div className={styles.commentDiv}>
                    <p>{allUsers[i].username} donated {backing.amount}</p>
                     <p>{backing.comment}</p>
                     {user.id === backing.user_id ? <button>Edit</button> : ''}
                    </div>
                  )
      }}
})}
                  
          </div>
         
        </div>
      <Footer />
      </div>
  )
};

export default Details;
