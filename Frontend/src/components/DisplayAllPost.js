import {useEffect, useState} from 'react'
import axios from 'axios'
import Affiche from './CardPost'
import CardPost from './CardPost';

// Fonction pour afficher la liste des Posts

export default function DisplayAllPost(props) {

  let [tabPosts, updateTabPosts] = useState([]);        // Array qui contient les posts
  let [closePost, updateClosepost] = useState(false);   // Indique si un post à été supprimer

  useEffect(() => {props.fnGetpost(true);},[closePost]);    // Si un post est éffacé la liste est mise a jour

  if (props.getPost) {
    const config = {     
      headers: { 'Authorization': `Bearer ${props.tokenPass}`,    // transmission du jeton au serveur
                'content-type': 'multipart/form-data' }
    }
    axios.get("http://localhost:4000/api/posts", config)    // appel au serveur pour récupérer la liste des posts
    .then(function(value) {
      value.data.reverse();                             // Inversion de la présentation des posts
      updateTabPosts(x => Object.values(value.data));   // Copie du tableau provenant du serveur
      props.fnGetpost(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  console.log(tabPosts);

  // Génération du code HTML

  return (
    <div className='dispo'>
      {tabPosts.map(pt =>(<CardPost key={pt._id}
                                   _id={pt._id}
                                   titre={pt.name}
                                   source={pt.imageUrl}
                                   likes={pt.likes}
                                   dislikes={pt.dislikes}
                                   usersLiked={pt.usersLiked}
                                   usersDisliked={pt.usersDisliked}
                                   comments={pt.comments}
                                   userPost={pt.userId}
                                   userId={props.userIdPass}
                                   token={props.tokenPass}
                                   delPost={props.delPost}
                                   fnclosePost={updateClosepost}                        
      />))}
  </div>
  )
}
