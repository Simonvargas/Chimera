import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  useParams} from 'react-router-dom';
import * as projectActions from '../../store/project'
import * as backingActions from '../../store/backing'

import styles from './EditForm.module.css'

function BackForm({ setShowForm2, project, setToggle, toggle }) {
    const [comment, setComment] = useState('')
    const [amount, setAmount] = useState(1)
    const [errors, setErrors] = useState([])

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
        const updateBackers = Number(project.backers + 1)
        const data = []
        if (amount < 1 || amount.toString()[0] == 0) {
          data.push('Your donation must be at least 1 one dollar')
        } 
        if (hostId === project.user_id) {
          data.push('You cannot donate to your own cause')
        }
        setErrors(data)
        
        if (data.length === 0) {
        await dispatch(backingActions.createBacking(hostId, id, amount, comment))
        await dispatch(projectActions.editProjectFunding(updateAmount, updateBackers, id))
        if (toggle) {
          setToggle(false)
        } else {
          setToggle(true)
        }
        setShowForm2(false)
      }
    }
  return  (
  <div className={styles.container}>
     
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
      <div className={styles.container3}>
      <div className={styles.errors1}>
      {errors.map(err =>( <ul><li>{err}</li></ul>))}
      </div>
     <span className={styles.currencyinput}>$
      <input 
      placeholder='Amount'
      className={styles.input1}
      type='number'
      min='0'
      value={amount}
      onChange={(e) => setAmount(e.target.value)}/>
      </span>
      <input 
      placeholder='Comment Optional'
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