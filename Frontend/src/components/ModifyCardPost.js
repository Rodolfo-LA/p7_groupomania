import React, { useState, useContext } from 'react'
import axios from 'axios'
import {context} from './ManagementPost'


export default function ModifyCardPost(props) {

  const tokenPass = useContext(context).token;   // récupération du token de l'utilisateur courant
  const admin = useContext(context).admin;

  const [choixFichier, setChoixFichier] = useState();
  const [onSelectImg, setonSelectImg] = useState(false);

  let requete = {};
  let config = {};

  function sendInfos(e) {
    e.preventDefault()
    if (onSelectImg) {
      setonSelectImg(false);
      requete = new FormData();
      requete.append('isAdmin',admin);
      requete.append('image',choixFichier );
      requete.append('name',e.target['titre'].value);
      config = {     
        headers: { 'Authorization': `Bearer ${tokenPass}`,
                  'content-type': 'multipart/form-data' }
      }
    }
    else {
      requete = {
        "isAdmin":admin,
        "name": e.target['titre'].value // envoi du nouveau titre
      }
      config = {     
        headers: { 'Authorization': `Bearer ${tokenPass}`}  // envoi du jeton de l'utilisateur actuel
      }
    }

    axios.put(`http://localhost:4000/api/posts/${props._id}`, requete, config)    // envoi au serveur Backend
      .then(function(value) {
        props.fnModify(false);    //  fermeture du formulaire de modification
        props.fnModPost(true);    //  Un post à été modifié
        console.log(value.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

  function selectFile(event){
    setChoixFichier(event.target.files[0]);
    setonSelectImg(true);
  }

  return (
    <div >
      <form onSubmit={sendInfos} className='modifyPost'>
        <label>Modifiez le titre du post</label>
        <input type="text" name="titre" defaultValue={props.titre}/>
        <label className='SelectFile'>
          <input type="file" name="imgUrl" onChange={selectFile} hidden/>
          <i>Votre nouvelle image</i>
        </label>
        {onSelectImg && <img src={URL.createObjectURL(choixFichier)} alt='selection'/>}
        <button type="submit" id='postReponse'>Modifier</button>
      </form> 
    </div>
  )
}