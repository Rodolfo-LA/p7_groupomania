import {React} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

// Fonction poue la connexion au serveur Backend

export default function Connexion() {

  const navigate = useNavigate(); // Prépare la redirection vers le chemin post

  function sendInfos(e) {
    e.preventDefault()
  
    let requete = {
      "email": e.target['email'].value,
      "password": e.target['password'].value
    };
  
    axios.post("http://localhost:4000/api/auth/login", requete)
      .then(function(value) {
        document.getElementById("reponse").textContent = value.data.userId;
        navigate('/post',{state : {userId:value.data.userId,token:value.data.token}})
      })
      .catch((err) => {
        console.log(err.response.data);
        document.getElementById("reponse").textContent = err.response.data.message;
    });
  }

  // Génération du HTML

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={sendInfos}>
        <label>Votre e-mail</label>
        <input type="text" name="email" defaultValue={''} />
        <label>Votre mot de passe</label>
        <input type="text" name="password" defaultValue={''}/>
        <button type="submit" id='reponse'>S'indentifier</button>
        <Link to="/">Annuler</Link>
      </form>
    </div>
  )
}


