import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { contextToken } from './ManagementPost'

export default function CreatePost(props) {

  const tokenPass = useContext(contextToken);   // récupération du token de l'utilisateur courant

  const navigate = useNavigate();  
  const [choixFichier, setChoixFichier] = useState();

  function selectFile(event){
      setChoixFichier(event.target.files[0]);
      console.log(choixFichier);
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
    <h1>Créer un Post - {tokenPass} -</h1>
    <form onSubmit={sendInfos}>
      <label>Entrer le titre du post</label>
      <input type="text" name="titre" defaultValue={''} />
      <label>Ajouter votre image</label>
      <input type="file" name="imgUrl" onChange={selectFile}/>
      <label>Votre commentaire</label>
      <input type="textarea" name="comment" defaultValue={''}/>
      <button type="submit" id='postReponse'>Créer</button>
    </form>
  </div>
  )
}