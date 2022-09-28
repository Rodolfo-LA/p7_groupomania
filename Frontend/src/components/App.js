
import { Routes, Route } from 'react-router-dom'
import Banner from './Banner'
import Inscription from './Inscription'
import Connexion from './Connexion'
import Footer from './Footer'
import Envoi from './Envoi'
import Premiere from './Premiere'
import CreatePost from './CreatePost'
import DisplayPost from './DisplayPost'

function App() {
    return (
        <div>
            <Banner />
            <Routes>
                <Route path="/" element={<Premiere/>} />
                <Route path="/ins" element={<Inscription/>} />
                <Route path="/con" element={<Connexion/>} />
                <Route path="/env/:token" element={<Envoi/>} />
                <Route path="/create" element={<CreatePost/>} />
                <Route path="/display" element={<DisplayPost/>} /> 
            </Routes>
            <Footer />
        </div>
    )
}

export default App
