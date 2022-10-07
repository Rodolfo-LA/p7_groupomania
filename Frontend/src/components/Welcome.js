import React from 'react'
import {Link} from 'react-router-dom'
import symbole from '../assets/symbole_groupomania.svg'

// Fonction page d'accueil

export default function Welcome() {
  return (
    <div>
        <nav className='menu'>
          <Link to="/ins">Inscrivez-vous</Link>
          <Link to="/con">connectez-vous</Link>
        </nav>
        <img src={symbole} alt=' groupomania' className='symbole'/>
    </div>
  )
}
