import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { context } from './ManagementPost'

export default function CreatePost(props) {

  const tokenPass = useContext(context).token;   // récupération du token de l'utilisateur courant

  const navigate = useNavigate();  
  const [choixFichier, setChoixFichier] = useState();
  const [onSelectImg, setonSelectImg] = useState(false);

  function selectFile(event){
    setChoixFichier(event.target.files[0]);
    setonSelectImg(true);
  }

  function retour() {
    props.majOnpost(true);
  }

  function sendInfos(e) {
    e.preventDefault();

    let formD = new FormData();
    formD.append('image',choixFichier );
    formD.append('name',e.target['titre'].value);

    const config = {     
      headers: { 'Authorization': `Bearer ${tokenPass}`,
                'content-type': 'multipart/form-data' }
    }

    axios.post("http://localhost:4000/api/posts", formD, config)
      .then(function(value) {
        retour();
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("postReponse").textContent = err;
    });
  }

  return (
    <div>
      <h1>Créer un Post</h1>
      <form onSubmit={sendInfos} className='createPost'>
        <label>Entrer le titre du post</label>
        <input type="text" name="titre" defaultValue={''} />
        <label className='SelectFile'>
          <input type="file" name="imgUrl" onChange={selectFile} hidden/>
          <i>Sélectionnez votre fichier</i>
        </label>
        {onSelectImg && <img src={URL.createObjectURL(choixFichier)} alt='selection'/>}
        <button type="submit" id='postReponse'>Créer</button>
      </form>
    </div>
  )
}