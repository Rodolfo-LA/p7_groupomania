
import logo from '../assets/icon-left-font.svg'
import '../styles/Banner.scss'
import React from 'react'

export default function Banner() {
    return (
      <div>
        <img src={logo} alt='logo grouponmania' className='logo' />
        <h1 className='roro'>Votre réseau interne d'entreprise</h1>
      </div>
    )
}
