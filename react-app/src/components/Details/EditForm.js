import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import * as projectActions from '../../store/project'

import styles from './EditForm.module.css'

function EditForm({ setShowForm }) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [details, setDetails] = useState('')
    const [categoryId, setCategory] = useState(1)
    const [funding, setFunding] = useState(0)

    const dispatch = useDispatch();
    const { id } = useParams() 
    const sessionUser = useSelector(state => state.session.user);

    // function number1() {
    //   set
    // }
    const hostId = sessionUser?.id
  
    // const projectCreate = async (e) => {
    //     e.preventDefault()
      
    //    let createdProject = await dispatch(projectActions.createProject(hostId, categoryId, name, image, details, funding))
    //    if (createdProject) {
    //      history.push('/')
    //    }
    // }

    async function update(e){
        e.preventDefault()
        await dispatch(projectActions.editProject(hostId, categoryId, name, image, details, funding, id))
        setShowForm(false)
      }
  return  (
  <div className={styles.container}>
     
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
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
      <button onClick={update} className={styles.btn} type='submit'>edit</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default EditForm;