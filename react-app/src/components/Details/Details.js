import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Footer from '../Navigation/Footer';
import NavBar from '../Navigation/NavBar';
import styles from './Details.module.css'
import { useParams } from 'react-router-dom';
import { removeProject } from '../../store/project'
import EditForm from './EditForm'
import BackForm from './BackForm';
import { getUsers } from '../../store/session';
import { removeBacking, editBacking } from '../../store/backing';
import * as projectActions from '../../store/project'
import { getbackings } from '../../store/backing';
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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
  const [backs, setBacks] = useState('')
  const [preFilled, setPrefilled] = useState('')

  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
  

  const user = useSelector(state => state.session.user)
  const backings = Object.values(useSelector(state => state.backing))
  const allUsers = Object.values(useSelector(state => state.session))
  const [toggle, setToggle] = useState(false)

  const percentage = project.funding_raised / project.funding_goal * 100

  useEffect(() => {
    dispatch(getbackings())
    dispatch(getUsers())
  }, [dispatch])

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

  function show3(e) {
    setShowForm(false)
    setShowForm2(false)
    setShowForm3(true)
  }

  async function deleteBacking(e){
    e.preventDefault()
    let answer = window.confirm('Are you sure you want to take your backing back?')
    if (answer) {
    const updateAmount = Number(project.funding_raised) - Number(e.target.getAttribute('hello'))
    const minus =  Number(project.backers) - 1
    await dispatch(removeBacking(Number(e.target.id)))
    await dispatch(projectActions.editProjectFunding(updateAmount, minus, id))
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
    <br></br>
    <div className={styles.overall}>
      <div className={styles.mainContent}>
        <div className={styles.categories}>
        <div className={styles.h2}>
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
        <br></br>
        <div className={styles.left}>
        <div className={styles.commentsContainer}>
        <img alt='Project' className={styles.photo} src={project.image}></img>
        <br></br>
        <br></br>
        <br></br>
        <p className={styles.text}>About dream</p>
        <div className={styles.text}>{project.details}</div>
       <br></br>
        <h2>Backers Donations & Comments</h2>
          <div>
            {backings?.map(backing => {
              for (let i = 0; i < allUsers.length; i++) {
                if (project.id === backing.project_id && allUsers[i].id === backing.user_id) {
                  return (
                    <div className={styles.commentDiv}>
                      <div className={styles.test3}>
                      <img alt='Project' className={styles.avatar} src='https://i.imgur.com/gUNurve.png'></img>
                    <div className={styles.commentText}>
                    <p>{allUsers[i].username} donated <span className={styles.funded1}>${format(backing.amount)}</span></p>
                    <p >{backing.comment}</p>
                    </div>
                    <div  value={backing.id} className='hi'>
                     
                     {user.id === backing.user_id ? <span className={styles.items}><i  onClick={(e) => (show3(e), setIdOf(backing.id), setComment(backing.comment))}  id={backing.id} className="icon fas fa-edit fa-lg"></i></span> : ''}

                     {user.id === backing.user_id ? <span className={styles.items}><i  hello={backing.amount} onClick={deleteBacking} id={backing.id} className="icon fas fa-trash fa-lg"></i> </span>: ''}

                    </div>
                    </div>
                    </div>
                  )
      }}
})}
                    {/* {showForm3 ? <EditComment preFilled={preFilled} setComment={setComment} comment={comment}  setShowForm3={setShowForm3} /> : ''} */}

                   {showForm3 ? <div className={styles.inputBox}>
                    <input value={comment} className={styles.input} onChange={(e) => setComment(e.target.value)}  ></input>
                    <button className={styles.btn3} onClick={update}><i className="fas fa-paper-plane"></i></button>
                    <button className={styles.btn3} onClick={() => setShowForm3(false)}><i className="fas fa-trash"></i></button>
                    </div> : ''}
          </div>
         
        </div>
        </div>
        

        <div className={styles.right}>
          <div className={styles.supportContainer}>
          <div className={styles.progressBar}>
       <ProgressBar style={ { height: '3rem', backgroundColor: '#08e1ae', backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)'}} now={percentage} label={Math.round(percentage) + '%'} animated />
    </div>
   
            <br></br>
            <br></br>
            <div className={styles.words}>
          <div className={styles.funded}>${format(project.funding_raised)}</div>
          <p className={styles.goal}>pledge of ${format(project.funding_goal)}</p>
          <br></br>
          <div>{project.backers}</div>
          <p className={styles.goal}>Donations</p>
          <br></br>
          </div>
          <button className={styles.btn1} onClick={show2}>Support a dream</button>
          </div>
          {showForm ? <EditForm project={project} setShowForm={setShowForm} /> : ''}
          {showForm2 ? <BackForm toggle={toggle} setToggle={setToggle} project={project} setShowForm2={setShowForm2} /> : ''}
        </div>
      </div>  
      </div>
      <div className={styles.footer}>
      <Footer />
      </div>
      </>
  )
};

export default Details;
