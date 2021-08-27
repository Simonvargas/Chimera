import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/session';
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import styles from './Details.module.css'
import { useParams } from 'react-router-dom';
import { removeProject, editProject, getOneProject } from '../../store/project'
import EditForm from './EditForm'
import BackForm from './BackForm';
import { getbackings } from '../../store/backing';
import { getUsers } from '../../store/session';
import  { Redirect } from 'react-router-dom'
import { removeBacking, editBacking } from '../../store/backing';
import * as projectActions from '../../store/project'


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
  const [amount, setAmount] = useState(0)

  

  const user = useSelector(state => state.session.user)
  const backings = Object.values(useSelector(state => state.backing))
  const allUsers = Object.values(useSelector(state => state.session))
  const project1 = useSelector(state => state.project)
  const [toggle, setToggle] = useState(false)
  const [test, setTest] = useState(backings)


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
  }, [id, toggle, showForm])

  
  async function deleteProject(){
    await dispatch(removeProject(Number(id)))
    history.push('/')
    // await dispatch(projectActions.getProjects())
    
  }

  function show() {
    setShowForm2(false)
    setShowForm3(false)
    setShowForm(true)
  }

  function show2() {
    setShowForm(false)
    setShowForm3(false)
    setShowForm2(true)
  }

  function show3() {
    setShowForm(false)
    setShowForm2(false)
    setShowForm3(true)
  }

  async function deleteBacking(e){
    // console.log('amount', amount)
    e.preventDefault()
    let answer = window.confirm('Are you sure you want to take your backing back?')
    if (answer) {
    const updateAmount = Number(project.funding_raised) - Number(e.target.getAttribute('hello'))
    await dispatch(removeBacking(Number(e.target.id)))
    await dispatch(projectActions.editProjectFunding(updateAmount, id))
    if (toggle) {
    setToggle(false)
    } else {
      setToggle(true)
    }
  }
  }

  async function update(e) {
    e.preventDefault()
    
    await dispatch(editBacking(comment, idOf))
    setShowForm3(false)
    setComment('')
  }

  return (
    <>
    <NavBar />
    <div className={styles.overall}>
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
                     {user.id === backing.user_id ? <i  onClick={(e) => (show3(), setIdOf(backing.id))}  id={backing.id} className="icon fas fa-edit"></i> : ''}
                     {user.id === backing.user_id ? <i  hello={backing.amount} onClick={deleteBacking} id={backing.id} className="icon fas fa-trash"></i> : ''}
                    </div>
                    </div>
                  )
      }}
})}
                   {showForm3 ? <div className={styles.inputBox}>
                    <input className={styles.input} onChange={(e) => setComment(e.target.value)} value={comment} placeholder="comment"></input>
                    <button className={styles.btn3} onClick={update}><i class="fas fa-paper-plane"></i></button>
                    <button className={styles.btn3} onClick={() => setShowForm3(false)}><i class="fas fa-trash"></i></button>
                    </div> : ''}
          </div>
         
        </div>
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
          {showForm ? <EditForm project={project} setShowForm={setShowForm} /> : ''}
          {showForm2 ? <BackForm toggle={toggle} setToggle={setToggle} project={project} setShowForm2={setShowForm2} /> : ''}
        </div>
      </div>  
      </div>
      <Footer />
      </>
  )
};

export default Details;
