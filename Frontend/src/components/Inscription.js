import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

// fonction pour gérer l' inscription d'un nouveau utilisateur

export default function Inscription() {

  const Navigate = useNavigate();

  function ctrlEmail() {    // Remise à zero du message d'erreur pour le email
    document.getElementById("repEmail").textContent = '';
  }

  function ctrlPass() {     // Remise à zero du message d'erreur pour le mot de passe
    document.getElementById("repPass").textContent = '';
  }

  function ctrlPseudo() {     // Remise à zero du message d'erreur pour le pseudo
    document.getElementById("repPseudo").textContent = '';
  }

  function sendInfos(e) {     // Envoi des données sur le serveur si le mot de passe & email ok
    e.preventDefault()

    // eslint-disable-next-line
    let regOk= new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); // Nouvelle règle REGEX pour l'email

    if (!regOk.test(e.target['email'].value)) {
      document.getElementById("repEmail").textContent = "Adresse email non valide !";
    }
    else {
      let requete = {
        "email": e.target['email'].value,
        "password": e.target['password'].value,
        "pseudo": e.target['pseudo'].value
      };
      
      axios.post("http://localhost:4000/api/auth/signup", requete)
        .then(function(value) {
          console.log(value);
          document.getElementById("repPass").textContent = value.data.message;
          Navigate(`/con`);
        })
        .catch((err) => {
          if(err.response.data.message === "Renforcez votre mot de passe !") {
            document.getElementById("repPass").textContent = err.response.data.message; 
          }
          else {
            document.getElementById("repEmail").textContent = "Cet e-mail est déja enregistré !";
          }
          
      });
    }
  }

  // Génération du HTML

  return (
    <div className='ground'>
      <h1>Inscription</h1>
      <form onSubmit={sendInfos} className='formEntete' >
        <label>Entrez votre e-mail</label>
        <input type="email" name="email" placeholder='xxx@xx.xx' onChange={ctrlEmail} required />
        <p id='repEmail'></p>
        <label>Entrez votre mot de passe</label>
        <input type="password" name="password" onChange={ctrlPass} required/>
        <p id='repPass'></p>
        <label>Entrez votre pseudonyme</label>
        <input type="text" name="pseudo" minlength="3" maxlength="9" onChange={ctrlPseudo} required/>
        <p id='repPseudo'></p>
        <button type="submit">Validez</button>
        <Link to="/">Annuler</Link>    
      </form>
    </div>
  )
}
