
import { Routes, Route } from 'react-router-dom'
import '../styles/Styles.scss'
import Banner from './Banner'
import Welcome from './Welcome'
import Inscription from './Inscription'
import Connexion from './Connexion'
import ManagementPost from './ManagementPost'
import Footer from './Footer'
import ErrorPage from './ErrorPage'

// Fonction poue la définition des routes générales

export default function App() {
    return (
        <div>
            <Banner />
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/ins" element={<Inscription/>} />
                <Route path="/con" element={<Connexion/>} />
                <Route path="/post" element={<ManagementPost/>} />
                <Route path="/*" element={<ErrorPage/>} />
            </Routes>
            <Footer />
        </div>
    )
}
