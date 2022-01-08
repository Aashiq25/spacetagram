import './scss/all-styles.scss'
import SpHeader from './pages/SpHeader'
import SpBody from './pages/SpBody'
import LikedPosts from './pages/LikedPosts'
import 'rsuite/dist/rsuite.min.css'

import { Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'

function App() {
    return (
        <div className="sp-home">
            <SpHeader></SpHeader>
            <Routes>
                <Route path="/" element={<SpBody />} />
                <Route path="liked-posts" element={<LikedPosts />} />
                <Route path="*" element={<PageNotFound />} />
                {/* <Route path="*" element={<Navigate replace to="/404" />} /> */}
            </Routes>
        </div>
    )
}

export default App
