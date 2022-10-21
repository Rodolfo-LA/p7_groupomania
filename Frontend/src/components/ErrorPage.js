import React from 'react'
import { Link } from 'react-router-dom'

// fonction pour signaler qu'une page n'exixte pas

export default function ErrorPage() {
  return (
    <div className='alerte'>
      <h1>!!! ERROR 404 !!!</h1>
      <p>Désolé, cette page n'existe pas !!!</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
