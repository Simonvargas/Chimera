import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import * as projectActions from '../../store/project'
import * as backingActions from '../../store/backing'

import styles from './EditForm.module.css'

function BackForm({ setShowForm2 }) {
    const [comment, setComment] = useState('')
    const [amount, setAmount] = useState(1)

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

    async function post(e){
        e.preventDefault()
        console.log(hostId, id, amount, comment)
        await dispatch(backingActions.createBacking(hostId, id, amount, comment))
        setShowForm2(false)
      }
  return  (
  <div className={styles.container}>
     
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
      <div className={styles.container3}>
     
      <input 
      placeholder='Amount'
      className={styles.input}
      type='number'
      value={amount}
      onChange={(e) => setAmount(e.target.value)}/>

      <input 
      placeholder='Comment'
      className={styles.input}
      type='text'
      value={comment}
      onChange={(e) => setComment(e.target.value)}/>
   

      <button onClick={post} className={styles.btn} type='submit'>Pledge!</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default BackForm;