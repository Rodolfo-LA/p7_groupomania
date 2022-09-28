
import logo from '../assets/icon-left-font-monochrome-black.svg'
import '../styles/Banner.scss'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Banner() {
    return (
      <div>
        <h1 className='roro'>Le réseau interne d'entreprise</h1>
        <img src={logo} alt='logo grouponmania' className='logo' />
        <nav className='menu'>
          <Link to="/ins">Inscrivez-vous</Link>
          <Link to="/con">connectez-vous</Link>
        </nav>
      </div>
    )
}
