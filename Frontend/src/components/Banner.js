
import logo from '../assets/icon-left-font.svg'
import React from 'react'

// Fonction qui affiche l'entête de la page

export default function Banner() {
    return (
      <div>
        <img src={logo} alt='logo grouponmania' className='logo' />
        <h1 className='roro'>Votre réseau interne d'entreprise</h1>
      </div>
    )
}
