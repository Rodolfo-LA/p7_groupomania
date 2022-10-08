import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import CreatePost from './CreatePost'
import DisplayAllPost from './DisplayAllPost'

// Fonction gestion des posts

export default function ManagementPost() {

  let { token, userId } = useParams();
  let [ onCreate, setCreate ] = useState(false);    // appui
  let [ onModify, setModify ] = useState(false);    //appui
  let [ onSupp, setSupp ] = useState(false);    //appui

  let [ onButtonSupp, setOnbuttonSupp ] = useState(true);    // visible
  let [ onButtonModify, setOnbuttonModify ] = useState(true);    // visible
  
  
  let [onPost, setOnpost] = useState(false);
  let [onGetpost, setOngetpost] = useState(true);
  
  const navigate = useNavigate();

  function retour() {
    navigate(`/`);
  }

  function Modify() {
    if (onModify) {
      setModify(false);
      setOnbuttonSupp(true);
    }
    else {
      setModify(true);
      setOnbuttonSupp(false);
    }
  }

  function Supp() {
    if (onSupp) {
      setSupp(false)
      setOnbuttonModify(true);
    }
    else {
      setSupp(true)
      setOnbuttonModify(false);
    }
  }

  function maj(){
    setCreate(false);
    setOnpost(false);
    setOngetpost(true);
  }

  useEffect(() => {maj()},[onPost]);
  
  return (
    <div>
      <h1>Connecté</h1>
      <div className="options">
        <button onClick={() => setCreate(!onCreate)}>Créer</button>
        {onButtonModify ? <button onClick={() => Modify()}>Modifier</button>:<button className='button--off'>Modifier</button>}
        {onButtonSupp ? <button onClick={() => Supp()}>Supprimer</button>:<button className='button--off'>Supprimer</button>}
        <button onClick={retour}>Se déconnecter</button>
      </div>
      {onSupp && <p className='infosupp'>Cliquez sur la croix (X) pour supprimer un post</p>}
      {onCreate && <CreatePost tokenPass={token} majOnpost={setOnpost}/>} 
      <DisplayAllPost tokenPass={token}
                      userIdPass={userId}
                      getPost={onGetpost}
                      fnGetpost={setOngetpost}
                      delPost={onSupp}
                      modPost={onModify}/>
    </div>
  )
}
