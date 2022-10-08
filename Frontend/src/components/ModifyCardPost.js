import React, { useState } from 'react'

export default function ModifyCardPost(props) {

  const [choixFichier, setChoixFichier] = useState();

  function sendInfos() {

  }

  function selectFile(event){
    setChoixFichier(event.target.files[0]);
  }

  // integration de l'appel & FormData

  return (
    <div >
      <form onSubmit={sendInfos} className='modifyPost'>
        <label>Modifiez le titre du post</label>
        <input type="text" name="titre" defaultValue={props.titre}/>
        <label>Remplacer votre image</label>
        <input type="file" name="imgUrl" onChange={selectFile}/>
        <p>Attention cette action va supprimer<br></br>les commentaires et <br></br>les like/dislike de ce post !</p>
        <button type="submit" id='postReponse'>Modifier</button>
      </form> 
    </div>
  )
}