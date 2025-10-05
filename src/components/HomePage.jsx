import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ApplianceCard from './ApplianceCard'

const HomePage = ({ appliances, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredAppliances = appliances.filter(appliance => {
    const matchesSearch = appliance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appliance.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appliance.model.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    
    // Check warranty status
    const today = new Date()
    const warrantyEndDate = new Date(appliance.purchaseDate)
    warrantyEndDate.setFullYear(warrantyEndDate.getFullYear() + appliance.warrantyYears)
    
    if (filter === 'warrantyActive') {
      return matchesSearch && warrantyEndDate > today
    }
    
    if (filter === 'warrantyExpired') {
      return matchesSearch && warrantyEndDate <= today
    }
    
    return matchesSearch
  })

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 style={{ margin: '0 1rem 0 0' }}>My Appliances</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Search appliances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="form-control"
              style={{ minWidth: '180px' }}
            >
              <option value="all">All Appliances</option>
              <option value="warrantyActive">Warranty Active</option>
              <option value="warrantyExpired">Warranty Expired</option>
            </select>
            <Link to="/add" className="btn btn-primary">
              Add Appliance
            </Link>
          </div>
        </div>
      </div>
      
      <div>
        {filteredAppliances.length === 0 ? (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <h3>No appliances found</h3>
            <p style={{ marginBottom: '1.5rem' }}>Get started by adding your first appliance</p>
            <Link to="/add" className="btn btn-primary">
              Add Your First Appliance
            </Link>
          </div>
        ) : (
          filteredAppliances.map(appliance => (
            <ApplianceCard 
              key={appliance.id} 
              appliance={appliance} 
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage