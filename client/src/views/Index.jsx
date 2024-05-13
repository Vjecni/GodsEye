import React from 'react'
import { Link } from 'react-router-dom'

// index css 
import '../style/index.css'

import BanLookup from './BanLookup.jsx'
import EvidenceUploader from './EvidenceUploader.jsx'

const Index = () => {
  return (
    <>
        <div className="index-container">
            <h1>Menu</h1>
            <div className="index-content">
                <div className="index-box">
                    <Link to='/bans'>Ban Lookup</Link>
                </div>
                <div className="index-box">
                    <Link to='/evidence'>Evidence Uploader</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Index