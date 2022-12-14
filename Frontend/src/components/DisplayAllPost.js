import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import CardPost from './CardPost';
import {context} from './ManagementPost'

// Fonction pour afficher la liste des Posts

export default function DisplayAllPost(props) {

  const Context = useContext(context);   // récupération du jeton de l'utilisateur courant
  const tokenPass = Context.token;

  let [tabPosts, updateTabPosts] = useState([]);        // Array qui contient les posts
  let [closePost, updateClosepost] = useState(false);   // Indique si un post à été supprimer
  let [modPost, updateModpost] = useState(false);       // Indique si un post à été modifier
  
  let [refreshPost, updateRefreshPost] = useState(true); // Indique si la liste des post doit-être rafraîchie

  // Fonction pour indiquer la fin de la modification d'un post

  function EndModPost() {
    updateRefreshPost(true);
    updateModpost(false);
  }

  // Fonction pour indiquer la suppression d'un post)

  function EndClosePost() {
    updateRefreshPost(true);
    updateClosepost(false);
  }

  useEffect(EndClosePost,[closePost]);    // Si un post est éffacé la liste est mise a jour
  useEffect(EndModPost,[modPost]);        // Si un post est modifié la liste est mise a jour

  if (refreshPost || props.newPost) {
    const config = {     
      headers: { 'Authorization': `Bearer ${tokenPass}`,    // transmission du jeton au serveur
                'content-type': 'multipart/form-data' }
    }
    axios.get("http://localhost:4000/api/posts", config)    // appel au serveur pour récupérer la liste des posts
    .then(function(value) {
      value.data.reverse();                             // Inversion de la présentation des posts
      updateTabPosts(x => Object.values(value.data));   // Copie du tableau provenant du serveur
      updateRefreshPost(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Génération du code HTML

  return (
    <div className='dispo'>
      {tabPosts.map(pt =>(<CardPost key={pt._id} post={{pt}} userId={props.userIdPass}
                                    delPost={props.delPost} modPost={props.modPost}
                                    fnclosePost={updateClosepost} fnModPost={updateModpost}                       
      />))}
  </div>
  )
} 
