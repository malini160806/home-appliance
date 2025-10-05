import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ApplianceDetail from './components/ApplianceDetail'
import AddApplianceForm from './components/AddApplianceForm'
import Header from './components/Header'
import './App.css'

function App() {
  const [appliances, setAppliances] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load appliances from API on component mount
  useEffect(() => {
    fetchAppliances()
  }, [])

  const API_BASE_URL = 'http://localhost:5000/api'

  const fetchAppliances = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appliances`)
      if (!response.ok) {
        throw new Error('Failed to fetch appliances')
      }
      const data = await response.json()
      setAppliances(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addAppliance = async (appliance) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appliances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appliance)
      })
      
      if (!response.ok) {
        throw new Error('Failed to add appliance')
      }
      
      // Refresh the list
      fetchAppliances()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateAppliance = async (updatedAppliance) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appliances/${updatedAppliance.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppliance)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update appliance')
      }
      
      // Refresh the list
      fetchAppliances()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteAppliance = async (id) => {
    if (window.confirm('Are you sure you want to delete this appliance?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/appliances/${id}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete appliance')
        }
        
        // Refresh the list
        fetchAppliances()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) {
    return <div className="container text-center mt-5"><h2>Loading...</h2></div>
  }

  if (error) {
    return <div className="container text-center mt-5"><div className="alert alert-danger">Error: {error}</div></div>
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage appliances={appliances} onDelete={deleteAppliance} />} />
          <Route path="/appliance/:id" element={<ApplianceDetail appliances={appliances} onUpdate={updateAppliance} />} />
          <Route path="/add" element={<AddApplianceForm onAdd={addAppliance} />} />
          <Route path="/edit/:id" element={<AddApplianceForm appliances={appliances} onUpdate={updateAppliance} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App