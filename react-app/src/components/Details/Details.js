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
import { removeBacking, editBacking } from '../../store/backing';


const Details = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  
  const [project, setProject] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showForm2, setShowForm2] = useState(false)
  const [showForm3, setShowForm3] = useState(false)
  const [idOf, setIdOf] = useState(0)
  const [comment, setComment] = useState('')

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

  function show3() {
    setShowForm3(true)
  }

  async function deleteBacking(e){
    let answer = window.confirm('Are you sure you want to take your backing back?')
    if (answer) {
    await dispatch(removeBacking(Number(e.target.id)))
    history.go(0)
    }
  }

  async function update(e) {
    e.preventDefault()
    await dispatch(editBacking(comment, idOf))
    setShowForm3(false)
    setComment('')
  }

  return (
    <div className={styles.overall}>
      <NavBar />
      <div className={styles.mainContent}>
        <div className={styles.categories}>
        <div>
        <h2>{project.name}</h2>
        </div>
        <div>
        {user.id === project.user_id ? <>
          <button onClick={show} className={styles.btn}>Edit dream</button>
        <button onClick={deleteProject} className={styles.btn}>Delete dream</button> 
        </>
        : ''}
        </div>
        </div>
        
        <div className={styles.left}>
        <img className={styles.photo} src={project.image}></img>
        <p className={styles.text}>About dream</p>
        <div className={styles.text}>{project.details}</div>
        </div>

        <div className={styles.right}>
          <div className={styles.supportContainer}>
            <br></br>
            <br></br>
          <div className={styles.funded}>${project.funding_raised}</div>
          <p className={styles.goal}>pledge of {project.funding_goal}</p>
          <br></br>
          <br></br>
          <div>{project.backers}</div>
          <p className={styles.goal}>Backers</p>
          <button className={styles.btn1} onClick={show2}>Support a dream</button>
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
                      <img className={styles.avatar} src='https://i.imgur.com/gUNurve.png'></img>
                    <div className={styles.commentText}>
                    <p>{allUsers[i].username} donated <span className={styles.funded1}>${backing.amount}</span></p>
                    <p >{backing.comment}</p>
                    </div>
                    <div>
                     {user.id === backing.user_id ? <button className={styles.btn3} onClick={(e) => (show3(), setIdOf(backing.id))}  id={backing.id}><i class="fas fa-edit"></i></button> : ''}
                     {user.id === backing.user_id ? <button className={styles.btn3} onClick={deleteBacking} id={backing.id}><i class="fas fa-trash"></i></button> : ''}
                    </div>
                    </div>
                  )
      }}
})}
                   {showForm3 ? <form>
                    <input className={styles.input} onChange={(e) => setComment(e.target.value)} value={comment} placeholder="comment"></input>
                    <button className={styles.btn3} onClick={update}><i class="fas fa-paper-plane"></i></button>
                    <button className={styles.btn3} onClick={() => setShowForm3(false)}><i class="fas fa-trash"></i></button>
                    </form> : ''}
          </div>
         
        </div>
      <Footer />
      </div>
  )
};

export default Details;
