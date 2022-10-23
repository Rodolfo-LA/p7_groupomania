import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import CreatePost from './CreatePost'
import DisplayAllPost from './DisplayAllPost'

export const context = createContext();

// Fonction pour la gestion des posts

export default function ManagementPost() {

  const location = useLocation();
  const token = location.state.token;     // récupération du token fourni par le backend
  const userId = location.state.userId;   // récupération de l'Id de l'utilisateur courant
  const admin = location.state.admin;     // récupération du status administrateur
  const pseudo = location.state.pseudo;   // récupération du pseudo
  
  let [ onCreate, setCreate ] = useState(false);    // état du bouton CREER
  let [ onModify, setModify ] = useState(false);    // état du bouton MODIFIER
  let [ onSupp, setSupp ] = useState(false);        // état du bouton SUPPRIMER 

  let [ onButtonSupp, setOnbuttonSupp ] = useState(true);    // bouton SUPPRIMER actif
  let [ onButtonModify, setOnbuttonModify ] = useState(true);    // bouton MODIFIER actif
  
  let [newPost, setNewpost] = useState(false);    // Un nouveau post est créé
  
  const navigate = useNavigate();

  // Fonction pour la déconnexion

  function retour() {
    navigate(`/`);
  }

  // Fonction pour la gestion du bouton MODIFIER

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

  // Fonction pour la gestion du bouton SUPPRIMER

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

  // Fonction pour la gestion d'un nouveau post créé

  function maj(){
    setCreate(false);
    setNewpost(false);
  }

  useEffect(() => {maj()},[newPost]);

  // Génération du HTML
  
  return (
    <React.StrictMode>
      <div className='ground'>
        <h1>Connecté -- {admin ? 'ADMINISTRATEUR':pseudo} --</h1>
            <div className="options">
              <button onClick={() => setCreate(!onCreate)}>Créer</button>
              {onButtonModify ? <button onClick={() => Modify()}>Modifier</button>:<button className='button--off'>Modifier</button>}
              {onButtonSupp ? <button onClick={() => Supp()}>Supprimer</button>:<button className='button--off'>Supprimer</button>}
              <button onClick={retour}>Se déconnecter</button>
            </div>
            {onSupp && <p className='infosupp'>Cliquez sur la croix (X) pour supprimer un post !! ATTENTION SUPPRESSION DÉFINITIVE !!</p>}
            {onModify && <p className='infosupp'>Cliquez sur le bouton (M) pour modifier un post</p>}
          <context.Provider value={{token:token, admin:admin,pseudo:pseudo}}>  
            {onCreate && <CreatePost fnNewpost={setNewpost}/>} 
            <DisplayAllPost userIdPass={userId} newPost={newPost} delPost={onSupp} modPost={onModify}/>
           </context.Provider>                   
      </div>
    </React.StrictMode>
  )
}
