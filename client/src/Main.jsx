import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Importing CSS
import './style/style.css'

// Main & Single Page
import Index from './views/Index.jsx'
import BanLookup from './views/BanLookup.jsx'
import EvidenceUploader from './views/EvidenceUploader.jsx'

const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/bans' element={< BanLookup/>}></Route>
          <Route path='/evidence' element={<EvidenceUploader />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)