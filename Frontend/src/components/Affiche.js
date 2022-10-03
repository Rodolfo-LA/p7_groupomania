import {useEffect, useState} from 'react'
import axios from 'axios'

import logoLike from '../assets/logo_like.svg'
import logoDislike from '../assets/logo_dislike.svg'

export default function Affiche(props) {

  let [ onFirst, setOnfirst ] = useState(true);

  let [ onComment, setOncomment ] = useState(false);
  let [ onLike, setOnlike ] = useState(false);
  let [ onDislike, setOndislike ] = useState(false);

  let [ onButtonLike, setOnbuttonlike ] = useState(true);
  let [ onButtonDislike, setOnbuttondislike ] = useState(true);

  let [ nbLike, setNblike ] = useState(props.likes);
  let [ nbDislike, setNbdislike ] = useState(props.dislikes);

  function sendInfos(e) {
    e.preventDefault()
    setOncomment(!onComment);
  }

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
    tabLike.push(<img src={logoLike} alt='logo like' />); 
  }

  const tabdisLike = [];  // création de la ligne des DISLIKE

  for (let index = 0; index < nbDislike; index++) {
    tabdisLike.push(<img src={logoDislike} alt='logo dislike' />); 
  }

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

  function majLike(codeLike) {

    let requete = {
      "like": codeLike 
    }; 

    const config = {     
      headers: { 'Authorization': `Bearer ${props.token}`}
    }

    axios.post(`http://localhost:4000/api/posts/${props._id}/like`, requete, config)
      .then(function(value) {
        console.log(value.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
    });
  }

  return (
    <div className='cadre'>
      <figure>
        <img src={props.source} alt='ma photo' />
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
          <textarea name="comment" rows="4" defaultValue={''} />
          <button type="submit">Envoyer</button>
        </form>}
        <p>{onButtonLike?"VRAI":"FAUX"}</p>
        <p>{onButtonDislike?"VRAI":"FAUX"}</p>
        <p>Le chat est là</p>
        <p>Le chien est là</p>
      </div>
    </div>
  )
}
