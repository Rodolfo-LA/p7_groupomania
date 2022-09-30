import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import CreatePost from './CreatePost'
import DisplayPost from './DisplayPost'

export default function Envoi() {

  let { token, userId } = useParams();
  let [ buttonCreate, setButtonCreate ] = useState(false);
  let [onPost, setOnpost] = useState(false);
  let [onGetpost, setOngetpost] = useState(true);
  
  const navigate = useNavigate();

  function retour() {
    navigate(`/`);
  }

  function maj(){
    setButtonCreate(false);
    setOnpost(false);
    setOngetpost(true);
  }

  useEffect(() => {maj()},[onPost]);
  
  return (
    <div>
      <h1>Affichage des Posts</h1>
      <p>buttonCreate : {buttonCreate ? 'VRAI':'FALSE'}</p>
      <p>onGetpost : {buttonCreate ? 'VRAI':'FALSE'}</p>
      <div className="options">
        <button onClick={() => setButtonCreate(!buttonCreate)}>Créer</button>
        <button>Modifier</button>
        <button>Supprimer</button>
        <button onClick={retour}>Se déconnecter</button>
      </div>
      {buttonCreate && <CreatePost tokenPass={token} majOnpost={setOnpost}/>} 
      <DisplayPost tokenPass={token} userIdPass={userId} getPost={onGetpost} fnGetpost={setOngetpost}/>
    </div>
  )
}
