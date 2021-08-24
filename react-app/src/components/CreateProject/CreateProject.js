import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session'

import styles from './CreateProject.module.css'
function AddEvent() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [details, setDetails] = useState('')
    const [categoryId, setCategory] = useState(1)

    const dispatch = useDispatch();
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams() 
    const sessionUser = useSelector(state => state.session.user);

    // function number1() {
    //   set
    // }
    const hostId = sessionUser?.id
  
    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const payload = {
    //         hostId,
    //         name,
    //         image,
    //         details,
    //         date,
    //         location,
    //         categoryId
    //     };
    //     console.log(payload)
    //     let createdEvent = await dispatch(addEvent(payload))
    //     if (createdEvent) {
    //       history.push(`/details/${createdEvent.id}`)
    //     }
    // }
  return  (
  <div className={styles.container}>
      <div className={styles.photoContainer}>
      <Link  className={styles.link} to='/'>
      <img src='https://i.imgur.com/giDqQ9u.png' className={styles.h1}></img>
      </Link>
      </div>
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
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
      value={location}
      onChange={(e) => setLocation(e.target.value)}/>
      
        <select className={`${styles.input} ${styles.select}`} onChange={(e) => setCategory(+e.target.value)} defaultValue={categoryId}>
          <option value='1'>Games</option>
          <option value='2'>Health</option>
          <option value='3'>Tech</option>
          <option value='4'>Art</option>
        </select>
      <button className={styles.btn} type='submit'>Create your Dream!</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default AddEvent;