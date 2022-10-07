
import { Routes, Route } from 'react-router-dom'
import Banner from './Banner'
import Inscription from './Inscription'
import Connexion from './Connexion'
import Footer from './Footer'
import ManagementPost from './ManagementPost'
import Welcome from './Welcome'

function App() {
    return (
        <div>
            <Banner />
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/ins" element={<Inscription/>} />
                <Route path="/con" element={<Connexion/>} />
                <Route path="/env/:token/:userId" element={<ManagementPost/>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
