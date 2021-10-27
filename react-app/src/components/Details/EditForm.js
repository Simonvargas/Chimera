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


    const [url, setUrl] = useState('')
    const [disableState, setDisableState] = useState(false)

    
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
          let image_url = url;
          if (url) {
            const formData = new FormData()
            formData.append('image', image)
            const res = await fetch('/api/images/', {
              method: "POST",
              body: formData,
            });
            const x = await res.json()
            console.log('res', x)
            image_url = x['url']
            await dispatch(projectActions.editProject(hostId, categoryId, name, image_url, details, funding, id))
            setShowForm(false)
          } else {
        await dispatch(projectActions.editProject(hostId, categoryId, name, image, details, funding, id))
        setShowForm(false)
          }
      }
    }

    const updateImage = (e) => {
      const file = e.target.files[0];
  
      if (!file) {
          setUrl(url);
          setImage(image);
  
      } else {
          const ext = file.type.split('/')
          const extensions = "pdf, png, jpg, jpeg, gif"
          if (extensions.includes(ext[1])) {
              setUrl(URL.createObjectURL(file))
              setImage(file);
              setDisableState(true);
  
          } else {
              setErrors({filetype: 'Filetype not supported, please upload a pdf, png, jpg, jpeg, or gif file.'})
          }
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
      <div className='upload-container'>
        <form>
          <div style={{position: 'relative', left: '6px'}} >Upload your spot's image!</div>
          <input
            className='file'
            style={{position: 'relative', left: '6px'}}
            type='file'
            accept="image/png, image/gif, image/jpeg, image/pdf, image/jpg"
            id="imgInp"
            onChange={updateImage}
            placeholder={image}
            // disabled={disableState}
            
          />
        </form>
        </div>

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