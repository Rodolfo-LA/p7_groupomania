import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

export default function Inscription() {

  const Navigate = useNavigate();

  function sendInfos(e) {
    e.preventDefault()

    let requete = {
      "email": e.target['email'].value,
      "password": e.target['password'].value
    };
    
    axios.post("http://localhost:4000/api/auth/signup", requete)
      .then(function(value) {
        console.log(value);
        document.getElementById("reponse").textContent = value.data.message;
        Navigate(`/con`);
      })
      .catch((err) => {
        //alert("Le serveur ne répond pas,\nveuillez réessayer ultérieurement.");
        document.getElementById("reponse").textContent = err.response.data.message;
    });
  }
  
  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={sendInfos} className='formEntete' >
        <label>Entrez votre e-mail</label>
        <input type="text" name="email" defaultValue={'xxxxx@xxx.xx'} />
        <label>Entrez votre mot de passe</label>
        <input type="text" name="password" defaultValue={'xxxxxxxx'}/>
        <button type="submit" id='reponse'>Validez</button>
        <Link to="/">Annuler</Link>
      </form>
    </div>
  )
}
