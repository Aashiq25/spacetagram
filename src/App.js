import './scss/all-styles.scss'
import SpHeader from './pages/SpHeader'
import SpBody from './pages/SpBody'
import LikedPosts from './pages/LikedPosts'
import 'rsuite/dist/rsuite.min.css'

import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="sp-home">
            <SpHeader></SpHeader>

            <Routes>
                <Route path="/" exact element={<SpBody />} />
                <Route path="/liked-posts" exact element={<LikedPosts />} />
            </Routes>
        </div>
    )
}

export default App
