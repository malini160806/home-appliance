import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ 
            margin: 0,
            background: 'linear-gradient(90deg, #4361ee, #4cc9f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}>
            Home Appliance Tracker
          </h1>
        </div>
        <nav>
          <Link to="/" className="btn btn-outline" style={{ marginRight: '0.5rem' }}>
            Home
          </Link>
          <Link to="/add" className="btn btn-primary">
            Add Appliance
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header