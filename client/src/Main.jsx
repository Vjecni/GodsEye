import React from 'react'
import ReactDOM from 'react-dom/client'

// Importing CSS
import './style/style.css'

// Main & Single Page
import Index from './views/Index'

const Main = () => {
  return (
    <>
      <Index />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)