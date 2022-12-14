import {useState, useContext} from 'react'
import axios from 'axios'
import logoLike from '../assets/logo_like.svg'
import logoDislike from '../assets/logo_dislike.svg'
import ModifyCardPost from './ModifyCardPost'
import {context} from './ManagementPost'


// Fonction pour afficher et gérer un post

export default function CardPost(props) {

  const tokenPass = useContext(context).token;   // récupération du jeton de l'utilisateur courant
  const admin = useContext(context).admin;
  const pseudo = useContext(context).pseudo;

  let [ onFirst, setOnfirst ] = useState(true);   // un seul appel à l'initialisation des boutons Like / Dislike

  let [ onComment, setOncomment ] = useState(false);    // affichage du formulaire de commentaire
  let [ onModify, setOnmodify ] = useState(false);    // affichage du formulaire de modification

  let [ onLike, setOnlike ] = useState(false);          // appui sur le bouton like
  let [ onDislike, setOndislike ] = useState(false);    // appui sur le bouton dislike

  let [ onButtonLike, setOnbuttonlike ] = useState(true);        // bouton like visible
  let [ onButtonDislike, setOnbuttondislike ] = useState(true);  // bouton dislike visible

  let [ nbLike, setNblike ] = useState(props.post.pt.likes);            // nombre de like du post
  let [ nbDislike, setNbdislike ] = useState(props.post.pt.dislikes);   // nombre de dislike du post

  // fonction pour inverser l'affichage de modification du post

  function modifyPost() {
    setOnmodify(!onModify);
  }

  // fonction pour effacer un Post

  function deletePost() {

    const config = {     
      headers: { 'Authorization': `Bearer ${tokenPass}`},      // envoi du jeton de l'utilisateur actuel
      data: {"isAdmin":admin}
    }

    axios.delete(`http://localhost:4000/api/posts/${props.post.pt._id}`, config)    // envoi au serveur Backend
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
      "isAdmin":admin,
      "newComment": pseudo +'/§/'+ e.target['comment'].value    // envoi du nouveau commentaire
    }

    const config = {     
      headers: { 'Authorization': `Bearer ${tokenPass}`}      // envoi du jeton de l'utilisateur actuel
    }

    axios.put(`http://localhost:4000/api/posts/${props.post.pt._id}`, requete, config)    // envoi au serveur Backend
      .then(function(value) {
        props.post.pt.comments.push(pseudo +'/§/'+ e.target['comment'].value);
        console.log(value.data.message);
        setOncomment(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

// Initialisation au premier appel de l'état des boutons LIKE /DISLIKE

  if (onFirst) {                                        
    if (props.post.pt.usersLiked.includes(props.userId)) {
      setOnlike(true);
      setOnbuttondislike(false);
    }
    if (props.post.pt.usersDisliked.includes(props.userId)) {
      setOndislike(true);
      setOnbuttonlike(false);
    }
    setOnfirst(false);
  }

  const tabLike = [];     // création de la ligne des LIKE

  for (let index = 0; index < nbLike; index++) {
    tabLike.push(<img  key={index} src={logoLike} alt='logo like' />);     // Génération du HTML
  }

  const tabdisLike = [];  // création de la ligne des DISLIKE

  for (let index = 0; index < nbDislike; index++) {
    tabdisLike.push(<img key={index} src={logoDislike} alt='logo dislike' />);  // Génération du HTML
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
  // codeLike : code a transmettre au serveur 0: annulation du dernier état / 1: like / -1:dislike
  //

  function majLike(codeLike) {

    let requete = {
      "like": codeLike    // envoi du code correspondant à l'action (-1 0 1) sur le serveur
    }; 

    const config = {     
      headers: { 'Authorization': `Bearer ${tokenPass}`}      // envoi du jeton de l'utilisateur actuel
    }

    axios.post(`http://localhost:4000/api/posts/${props.post.pt._id}/like`, requete, config)    // envoi au serveur Backend
      .then(function(value) {
        console.log(value.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

  // Condition pour griser un Post.

  let greyPost = (((props.modPost) && ((!onModify) && (props.userId!==props.post.pt.userId)))
                                   || ((onModify) && (props.userId===props.post.pt.userId))
                                   || (props.delPost && (props.userId!==props.post.pt.userId)));

  // Génération du code HTML

  return (
    <div className='cadre'>
      <div className={greyPost ? 'opaque':''}>
        <figure >
          <img src={props.post.pt.imageUrl} alt={props.post.pt.name} className={onModify? 'masq':null}/>
          <figcaption>{props.post.pt.name}</figcaption>
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
            <textarea name="comment" rows="3" defaultValue={''} minLength={3} maxLength={120} required/>
            <button type="submit">Poster</button>
          </form>}
          {props.post.pt.comments.map(pt =>(<div key={pt}><p className='pseudo'>{pt.substr(0,pt.indexOf("/§/"))}</p>{pt.substr(pt.indexOf("/§/")+3)}</div>))}
        </div>
      </div>
      {(props.delPost  && ((props.userId===props.post.pt.userId) || admin)) && <button className='button--supp' onClick={() => deletePost()}>X</button>}
      {(props.modPost  && ((props.userId===props.post.pt.userId) || admin)) && <button className='button--supp' onClick={() => modifyPost()}>M</button>}
      {props.modPost && onModify && <ModifyCardPost post={props.post.pt} titre={props.post.pt.name} _id={props.post.pt._id}
                                                    fnModPost={props.fnModPost} fnModify={setOnmodify}/>}
    </div>
  )
}