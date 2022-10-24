import React, { useContext, useState } from 'react'
import axios from 'axios'
import { context } from './ManagementPost'

export default function CreatePost(props) {

  const tokenPass = useContext(context).token;   // récupération du token de l'utilisateur courant
  const pseudo = useContext(context).pseudo;

  const [choixFichier, setChoixFichier] = useState();
  const [onSelectImg, setonSelectImg] = useState(false);

  function selectFile(event){
    setChoixFichier(event.target.files[0]);
    setonSelectImg(true);
    document.getElementById("reponse").textContent = "";
  }

  function retour() {
    props.fnNewpost(true);
  }

  // Fonction pour envoyer les informations du nouveau post au serveur backend

  function sendInfos(e) {
    e.preventDefault();

    if (onSelectImg) {

      let formD = new FormData();

      formD.append('image',choixFichier );
      formD.append('name','@' + pseudo +' - '+ e.target['titre'].value + ' -');

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
    else {
      document.getElementById("reponse").textContent = "Vous devez choisir une image !";
    }

  }

  // Génération du HTML

  return (
    <div>
      <h1>Créer un Post</h1>
      <form onSubmit={sendInfos} className='createPost'>
        <label>Entrer le titre du post</label>
        <input type="text" name="titre" defaultValue={''} required/>
        <label className='SelectFile'>
          <input type="file" name="imgUrl" onChange={selectFile} hidden/>
          <i>Votre image</i>
          <p id='reponse'></p>
        </label>
        {onSelectImg && <img src={URL.createObjectURL(choixFichier)} alt='selection du fichier'/>}
        <button type="submit">Créer</button>
      </form>
    </div>
  )
}