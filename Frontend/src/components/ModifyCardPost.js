import React, { useState } from 'react'

export default function ModifyCardPost(props) {

  const [choixFichier, setChoixFichier] = useState();
  const [onSelectImg, setonSelectImg] = useState(false);

  function sendInfos() {

  }

  function selectFile(event){
    setChoixFichier(event.target.files[0]);
    setonSelectImg(true);
  }

  // integration de l'appel & FormData

  return (
    <div >
      <form onSubmit={sendInfos} className='modifyPost'>
        <label>Modifiez le titre du post</label>
        <input type="text" name="titre" defaultValue={props.titre}/>
        <label className='SelectFile'>
          <input type="file" name="imgUrl" onChange={selectFile} hidden/>
          <i>Sélectionez votre fichier</i>
        </label>
        {onSelectImg && <img src={URL.createObjectURL(choixFichier)} alt='selection'/>}
        <p>Attention cette action va supprimer<br></br>les commentaires et les like/dislike de ce post !</p>
        <button type="submit" id='postReponse'>Modifier</button>
      </form> 
    </div>
  )
}