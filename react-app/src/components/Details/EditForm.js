import { useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as projectActions from '../../store/project'

import styles from './EditForm.module.css'

function EditForm({ setShowForm, project }) {
    const [name, setName] = useState(project.name)
    const [image, setImage] = useState(project.image)
    const [details, setDetails] = useState(project.details)
    const [categoryId, setCategory] = useState(1)
    const [funding, setFunding] = useState(project.funding_goal)

    const [errors, setErrors] = useState([])

    
    const dispatch = useDispatch();
    const { id } = useParams() 
    const sessionUser = useSelector(state => state.session.user);

   
    const hostId = sessionUser?.id
  
    

    async function update(e){
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
        await dispatch(projectActions.editProject(hostId, categoryId, name, image, details, funding, id))
        setShowForm(false)
      }
    }
  return  (
  <div className={styles.container}>
     
      <div className={styles.container2}>
      <div className={styles.errors1}>
      {errors.map(err =>( <ul><li>{err}</li></ul>))}
      </div>
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
      type='hidden'
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
      <button onClick={() => setShowForm(false)} className={styles.btn}>Cancel</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default EditForm;