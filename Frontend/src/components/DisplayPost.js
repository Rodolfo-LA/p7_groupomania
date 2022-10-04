import {useEffect, useState} from 'react'
import axios from 'axios'
import Affiche from './Affiche'

export default function DisplayPost(props) {

  let [tabPosts, updateTabPosts] = useState([]);
  let [closePost, updateClosepost] = useState(false);

  useEffect(() => {props.fnGetpost(true);},[closePost]);

  if (props.getPost) {
    const config = {     
      headers: { 'Authorization': `Bearer ${props.tokenPass}`,
                'content-type': 'multipart/form-data' }
    }
    axios.get("http://localhost:4000/api/posts", config)
    .then(function(value) {
      updateTabPosts(x => Object.values(value.data));
      props.fnGetpost(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  console.log(tabPosts);

  return (
    <div className='dispo'>
      {tabPosts.map(pt =>(<Affiche key={pt._id}
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
