
import { Routes, Route } from 'react-router-dom'
import Banner from './Banner'
import Inscription from './Inscription'
import Connexion from './Connexion'
import Footer from './Footer'
import Envoi from './Envoi'
import Premiere from './Premiere'

function App() {
    return (
        <div>
            <Banner />
            <Routes>
                <Route path="/" element={<Premiere/>} />
                <Route path="/ins" element={<Inscription/>} />
                <Route path="/con" element={<Connexion/>} />
                <Route path="/env/:token/:userId" element={<Envoi/>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
