import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';
import { getUsers } from '../../store/session';
import { getProjects } from '../../store/project';
import CreateProject from '../CreateProject/CreateProject'
import styles from './HomePage.module.css'
// import { Modal } from '../../ModalContext/ModalContext';
import { ProgressBar } from 'react-bootstrap'

import Rodal from 'rodal';

const HomePage = () => {
  const allProjects = Object.values(useSelector(state => state.project))
  const allUsers = Object.values(useSelector(state => state.session))
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [numba, setNumba] = useState([])
  useEffect(() => {
    dispatch(getProjects())
    dispatch(getUsers())

  }, [dispatch])

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/projects/${11}`)

      if (res.ok) {
        const oneProject = await res.json()
        setNumba(oneProject)
      }
    })()
  }, [])

  function show(){
    setShowModal(true)
  }
  function hide() {
    setShowModal(false)
  }
  // {showForm3 ?
  //   <Rodal showCloseButton={false} className={styles.rodal} animation='door' visible={showForm3} onClose={setShowForm3(false)}>
  //     <div className={styles.rodal}>
  //       {/* <div className={styles.inputBox}> */}
  //         <input value={comment} className={styles.input} onChange={(e) => setComment(e.target.value)}  ></input>
  //         <button className={styles.btn3} onClick={update}><i className="fas fa-paper-plane"></i></button>
  //         <button className={styles.btn3} onClick={() => setShowForm3(false)}><i className="fas fa-trash"></i></button>
  //       {/* </div> */}
  //     </div>
  //   </Rodal> : ''}

  return (
    <>
      
      <div className={styles.spotlight1}>
      <h2 className={styles.h2}>Spotlight</h2>
        <Link className={styles.link} to={`/projects/${numba.id}`}>
        <div className={styles.spotlight}><div className={styles.left}><img alt='Project' className={styles.projectImg2} src={numba.image}></img></div>
          <div className={styles.right}><p className={styles.title}>{numba.name}</p>
            {allUsers.map(user => {
              if (user.id === numba.user_id) {
                return (
                  <p key={user.id} className={styles.spotlightWords}>by {user.username[0].toUpperCase() + user.username.slice(1)}</p>
                )
              }
            })}
            <div className={styles.progressBar}><ProgressBar style={{ height: '2rem', backgroundColor: '#08e1ae', backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)' }} now={Math.round(numba.funding_raised / numba.funding_goal * 100)} label={Math.round(numba.funding_raised / numba.funding_goal * 100) + '%'} animated /></div>
          </div>
        </div>
</Link>
</div>

      <div className={styles.photoDiv}><img className={styles.img1} src='https://i.imgur.com/0YABWBD.jpg'></img></div>
      
      
      <button className={styles.buildDreamBtn} onClick={show}>Start Project</button>

          <Rodal showCloseButton={false} className={styles.rodal} animation='door' visible={showModal} onClose={hide}>
            <div className={styles.rodal}>
              <CreateProject showModal={showModal} setShowModal={setShowModal} />
            </div>
          </Rodal>


      

        <div className={styles.cont}>
        <h2 className={styles.h2} >Start fundraising today</h2><div className={styles.projects}>
          {allProjects?.map(projects =>

            <Link key={projects.id} className={styles.link} to={`/projects/${projects.id}`}>
              <div className={styles.projectContainer}>
                <img alt='Project' className={styles.projectImg} src={projects.image}></img>
                <p className={styles.title}>{projects.name}</p>
                <p className={styles.details}>{projects.details}</p>
                <p className={styles.raised}><span className={styles.span}>{Math.round(projects.funding_raised / projects.funding_goal * 100)}% raised</span> </p>
                <ProgressBar style={{ height: '1rem', backgroundColor: '#08e1ae', backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)' }} now={Math.round(projects.funding_raised / projects.funding_goal * 100)} label={Math.round(projects.funding_raised / projects.funding_goal * 100) + '%'} animated />
              </div>
              
            </Link>

          )}

        </div>
      </div>
      <Footer />
    </>
  )
};

export default HomePage;
