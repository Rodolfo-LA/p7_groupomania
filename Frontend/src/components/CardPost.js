import {useState} from 'react'
import axios from 'axios'

import logoLike from '../assets/logo_like.svg'
import logoDislike from '../assets/logo_dislike.svg'

import ModifyCardPost from './ModifyCardPost'

export default function CardPost(props) {

  let [ onFirst, setOnfirst ] = useState(true);   // un seul appel à l'initialisation des boutons Like / Dislike

  let [ onComment, setOncomment ] = useState(false);    // affichage du formulaire de commentaire
  let [ onModify, setOnmodify ] = useState(false);    // affichage du formulaire de modification

  let [ onLike, setOnlike ] = useState(false);          // appui sur le bouton like
  let [ onDislike, setOndislike ] = useState(false);    // appui sur le bouton dislike

  let [ onButtonLike, setOnbuttonlike ] = useState(true);        // bouton like visible
  let [ onButtonDislike, setOnbuttondislike ] = useState(true);  // bouton dislike visible

  let [ nbLike, setNblike ] = useState(props.likes);            // nombre de like du post
  let [ nbDislike, setNbdislike ] = useState(props.dislikes);   // nombre de dislike du post

  // fonction pour effacer un Post

  function modifyPost() {
    setOnmodify(!onModify);
        // a compléter
  }

  // fonction pour effacer un Post

  function deletePost() {

    const config = {     
      headers: { 'Authorization': `Bearer ${props.token}`}      // envoi du jeton de l'utilisateur actuel
    }

    axios.delete(`http://localhost:4000/api/posts/${props._id}`, config)    // envoi au serveur Backend
      .then(function(value) {
        props.fnclosePost(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

  // fonction pour la mise à jour des commentaires dans la base de données

  function sendInfos(e) {
    e.preventDefault()

    let requete = {
      "newComment": e.target['comment'].value    // envoi du nouveau commentaire
    }

    const config = {     
      headers: { 'Authorization': `Bearer ${props.token}`}      // envoi du jeton de l'utilisateur actuel
    }

    axios.put(`http://localhost:4000/api/posts/${props._id}`, requete, config)    // envoi au serveur Backend
      .then(function(value) {
        props.comments.push(e.target['comment'].value);
        console.log(value.data.message);
        setOncomment(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

// Initialisation au premier appel de l'état des boutons LIKE /DISLIKE

  if (onFirst) {                                        
    if (props.usersLiked.includes(props.userId)) {
      setOnlike(true);
      setOnbuttondislike(false);
    }
    if (props.usersDisliked.includes(props.userId)) {
      setOndislike(true);
      setOnbuttonlike(false);
    }
    setOnfirst(false);
  }

  const tabLike = [];     // création de la ligne des LIKE

  for (let index = 0; index < nbLike; index++) {
    tabLike.push(<img src={logoLike} alt='logo like' />);     // Génération du HTML
  }

  const tabdisLike = [];  // création de la ligne des DISLIKE

  for (let index = 0; index < nbDislike; index++) {
    tabdisLike.push(<img src={logoDislike} alt='logo dislike' />);  // Génération du HTML
  }

  // Fonction pour gérer l'appui sur le bouton LIKE

  function like() { 
    let code = 0;
    if (!onLike) {
      code = 1;  
      setNblike(nbLike=nbLike+1);
      setOnbuttondislike(false);
    }
    else {
      setNblike(nbLike=nbLike-1); 
      setOnbuttondislike(true);
    }
    setOnlike(onLike=!onLike);
    majLike(code);
  }

  // Fonction pour gérer l'appui sur le bouton DISLIKE

  function dislike() {
    let code = 0;
    if (!onDislike){
      code = -1;
      setNbdislike(nbDislike=nbDislike+1);
      setOnbuttonlike(false);
    }
    else {
      setNbdislike(nbDislike=nbDislike-1);
      setOnbuttonlike(true);
    } 
    setOndislike(onDislike=!onDislike);
    majLike(code);
  }

  // fonction pour la mise à jour du système de Like / Dislike
  //
  // codeLike : code a transmettre au serveur
  //

  function majLike(codeLike) {

    let requete = {
      "like": codeLike    // envoi du code correspondant à l'action (-1 0 1) sur le serveur
    }; 

    const config = {     
      headers: { 'Authorization': `Bearer ${props.token}`}      // envoi du jeton de l'utilisateur actuel
    }

    axios.post(`http://localhost:4000/api/posts/${props._id}/like`, requete, config)    // envoi au serveur Backend
      .then(function(value) {
        console.log(value.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

  // Génération du code HTML

  return (
    <div className='cadre'>
      <div className={(onModify && props.modPost) ? 'opaque':''}>
        <figure >
          <img src={props.source} alt='ma photo' className={onModify? 'masq':null}/>     {/* alt à compléter */}
          <figcaption>{props.titre}</figcaption>
        </figure>
        <div className='like'>
          {tabLike}
          {tabdisLike}
        </div>
        <div className='cadre-bouton'>
          <button onClick={() => setOncomment(!onComment)}>Commenter</button>
          {onButtonLike ? <button onClick={() => like()}>Like</button>:<button className='button--off'>Like</button>}
          {onButtonDislike ? <button onClick={() => dislike()}>Dislike</button>:<button className='button--off'>Dislike</button>}
        </div>
        <div className='cadre-comment'>
          {onComment && 
          <form onSubmit={sendInfos}>
            <textarea name="comment" rows="2" defaultValue={''} />
            <button type="submit">Poster</button>
          </form>}
          {props.comments.map(pt =>(<p>{pt}</p>))}
        </div>
      </div>
      {(props.delPost  && (props.userId==props.userPost)) && <button className='button--supp' onClick={() => deletePost()}>X</button>}
      {(props.modPost  && (props.userId==props.userPost)) && <button className='button--supp' onClick={() => modifyPost()}>M</button>}
      {props.modPost && onModify && <ModifyCardPost titre={props.titre}/>}
    </div>
  )
}