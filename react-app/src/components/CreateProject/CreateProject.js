import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import * as projectActions from '../../store/project'

import styles from './CreateProject.module.css'
function AddEvent() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [details, setDetails] = useState('')
    const [categoryId, setCategory] = useState(1)
    const [funding, setFunding] = useState(0)
    const [raised, setRaised] = useState(0)
    const [backers, setBackers] = useState(0)

    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const hostId = sessionUser?.id
    
    const projectCreate = async (e) => {
         e.preventDefault()
         const data = []
         if (name === '') {
           data.push('Name Field is empty')
         } 
         if (image === '') {
           data.push('Image field is empty')
         } 
         if (details === '')  {
          data.push('Description field is empty')
         }
         if (funding === '' || funding < 1) {
           data.push('Amount funding has to be greater than 0') 
         } 
         setErrors(data)
         if (data.length === 0) {
         await dispatch(projectActions.createProject(hostId, categoryId, name, image, details, funding, raised, backers))
         history.push('/')
         }
    }
  
  return  (
  <div className={styles.container}>
      <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      <img src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
      </Link>
      </div>
      <div className={styles.container2}>
    <form  onclassName={styles.inputForm}>
    <div className={styles.errors1}>
      {errors.map(err =>( <ul><li>{err}</li></ul>))}
      </div>
        <h2 className={styles.h2}>Create an Event!</h2>
      <div className={styles.container3}>
        
      <input
      placeholder={sessionUser.username}
      className={styles.input}
      type='hidden'
      value={hostId}
      />

      <input
      placeholder='Project Name'
      className={styles.input}
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}/>

      <input 
      placeholder='Image Url'
      className={styles.input}
      type='text'
      value={image}
      onChange={(e) => setImage(e.target.value)}/>
   
     <textarea
      placeholder='details'
      className={styles.input}
      type='text'
      value={details}
      onChange={(e) => setDetails(e.target.value)}/>
     
      <input 
      placeholder='Funding Goal'
      className={styles.input}
      type='number'
      value={funding}
      onChange={(e) => setFunding(e.target.value)}/>
      
        <select className={`${styles.input} ${styles.select}`} onChange={(e) => setCategory(+e.target.value)} defaultValue={categoryId}>
          <option value='1'>Games</option>
          <option value='2'>Health</option>
          <option value='3'>Tech</option>
          <option value='4'>Art</option>
        </select>
      <button onClick={projectCreate} className={styles.btn} type='submit'>Create your Dream!</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default AddEvent;