
import logo from '../assets/icon-left-font.svg'
import '../styles/Banner.scss'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Banner() {
    return (
      <div>
        <img src={logo} alt='logo grouponmania' className='logo' />
        <h1 className='roro'>Votre réseau interne d'entreprise</h1>

        <nav className='menu'>
          <Link to="/ins">Inscrivez-vous</Link>
          <Link to="/con">connectez-vous</Link>
        </nav>
      </div>
    )
}
