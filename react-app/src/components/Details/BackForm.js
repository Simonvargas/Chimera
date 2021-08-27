import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import * as projectActions from '../../store/project'
import * as backingActions from '../../store/backing'
import { removeProject, editProject, getOneProject } from '../../store/project'

import styles from './EditForm.module.css'

function BackForm({ setShowForm2, project, setToggle, toggle }) {
    const [comment, setComment] = useState('')
    const [amount, setAmount] = useState(1)

    const dispatch = useDispatch();
    const { id } = useParams() 
    const sessionUser = useSelector(state => state.session.user);

    // function number1() {
    //   set
    // }
    const hostId = sessionUser?.id
  


    async function post(e){
        e.preventDefault()
        const updateAmount = Number(project.funding_raised) + Number(amount)
        await dispatch(backingActions.createBacking(hostId, id, amount, comment))
        await dispatch(projectActions.editProjectFunding(updateAmount, id))
        if (toggle) {
          setToggle(false)
        } else {
          setToggle(true)
        }
        setShowForm2(false)
      }
  return  (
  <div className={styles.container}>
     
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
      <div className={styles.container3}>
     <div className={styles.currencyinput}><span className={styles.monay}>$</span>
      <input 
      placeholder='Amount'
      className={styles.input}
      type='number'
      min='1'
      value={amount}
      onChange={(e) => setAmount(e.target.value)}/>
      </div>
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