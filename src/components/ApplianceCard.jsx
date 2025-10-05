import React from 'react'
import { Link } from 'react-router-dom'

const ApplianceCard = ({ appliance, onDelete }) => {
  const warrantyEndDate = new Date(appliance.purchaseDate)
  warrantyEndDate.setFullYear(warrantyEndDate.getFullYear() + appliance.warrantyYears)
  
  const isWarrantyActive = warrantyEndDate > new Date()
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const daysUntilExpiry = Math.ceil((warrantyEndDate - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center'
          }}>
            {appliance.name}
            {isWarrantyActive && daysUntilExpiry < 30 && (
              <span className="badge badge-warning" style={{ marginLeft: '1rem', fontSize: '0.7em' }}>
                Warranty expiring soon
              </span>
            )}
          </h3>
          
          <div className="row">
            <div className="col-6 mb-2">
              <strong>Brand:</strong> {appliance.brand}
            </div>
            <div className="col-6 mb-2">
              <strong>Model:</strong> {appliance.model}
            </div>
            <div className="col-6 mb-2">
              <strong>Purchase Date:</strong> {formatDate(appliance.purchaseDate)}
            </div>
            <div className="col-6 mb-2">
              <strong>Warranty:</strong> {appliance.warrantyYears} year{appliance.warrantyYears !== 1 ? 's' : ''}
              <span className={`badge ${isWarrantyActive ? 'badge-success' : 'badge-danger'}`} style={{ marginLeft: '0.5rem' }}>
                {isWarrantyActive ? 'Active' : 'Expired'}
              </span>
            </div>
            {appliance.serialNumber && (
              <div className="col-6 mb-2">
                <strong>Serial Number:</strong> {appliance.serialNumber}
              </div>
            )}
            {appliance.purchaseLocation && (
              <div className="col-6 mb-2">
                <strong>Purchase Location:</strong> {appliance.purchaseLocation}
              </div>
            )}
          </div>
        </div>
        
        <div style={{ textAlign: 'right', minWidth: '200px' }}>
          <div style={{ marginBottom: '1rem' }}>
            {isWarrantyActive && (
              <div>
                <small>Warranty ends:</small>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                  {formatDate(warrantyEndDate)}
                </div>
                {daysUntilExpiry >= 0 && (
                  <div style={{ fontSize: '0.9rem', color: daysUntilExpiry < 30 ? '#e74c3c' : '#7f8c8d' }}>
                    {daysUntilExpiry === 0 ? 'Expires today' : 
                     daysUntilExpiry === 1 ? 'Expires tomorrow' : 
                     `Expires in ${daysUntilExpiry} days`}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <Link to={`/appliance/${appliance.id}`} className="btn btn-primary">
              View Details
            </Link>
            <Link to={`/edit/${appliance.id}`} className="btn btn-warning">
              Edit
            </Link>
            <button 
              onClick={() => onDelete(appliance.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplianceCard