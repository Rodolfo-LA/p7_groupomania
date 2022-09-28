import {useState} from 'react'

export default function Affiche(props) {

  let [ onComment, setOncomment ] = useState(false);

  function sendInfos(e) {
    e.preventDefault()
    setOncomment(!onComment);
  }

  return (
    <div className='cadre'>
      <figure>
        <img src={props.source} alt='ma photo' />
        <figcaption>{props.titre}</figcaption>
      </figure>
      <div className='like'>
        <p>J'aime : + + + + + + + + + +</p>
        <p>Je n'aime pas : X X X X X X X</p>
      </div>
      <div className='cadre-bouton'>
        <button onClick={() => setOncomment(!onComment)}>Commenter</button>
        <button>Like</button>
        <button>Dislike</button>
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
