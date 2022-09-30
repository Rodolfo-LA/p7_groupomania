import {useState} from 'react'
import axios from 'axios'

import logoLike from '../assets/logo_like.svg'
import logoDislike from '../assets/logo_dislike.svg'

export default function Affiche(props) {

  let [ onComment, setOncomment ] = useState(false);

  function sendInfos(e) {
    e.preventDefault()
    setOncomment(!onComment);
  }

  const tabLike = [];     // création de la ligne des LIKE

  for (let index = 0; index < props.likes; index++) {
    tabLike.push(<img src={logoLike} alt='logo like' />); 
  }

  const tabdisLike = [];  // création de la ligne des DISLIKE

  for (let index = 0; index < props.dislikes; index++) {
    tabdisLike.push(<img src={logoDislike} alt='logo dislike' />); 
  }

  function like() {
    let code = 0;
    if (!props.usersLiked.includes(props.userId))
      code = 1;
    majLike(code);
  }

  function dislike() {
    let code = 0;
    if (!props.usersDisliked.includes(props.userId))
      code = -1;
    majLike(code);
  }

  function majLike(codeLike) {
    console.log(codeLike);

    let requete = {
      "like": codeLike 
    };

    const config = {     
      headers: { 'Authorization': `Bearer ${props.token}`}
    }

    console.log(props.key);
  
    axios.post(`http://localhost:4000/api/posts/${props._id}/like`, requete, config)
      .then(function(value) {
        console.log(value.data.message);
        window.location.reload();
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
        <button onClick={() => like()}>Like</button>
        <button onClick={() => dislike()}>Dislike</button>
      </div>
      <div className='cadre-comment'>
        {onComment && 
        <form onSubmit={sendInfos}>
          <textarea name="comment" rows="4" defaultValue={''} />
          <button type="submit">Envoyer</button>
        </form>}
        <p>Le chat est là</p>
        <p>Le chien est là</p>
        <p>Le chat est là</p>
        <p>Le chien est là</p>
      </div>
    </div>
  )
}
