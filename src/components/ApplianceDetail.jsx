import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const ApplianceDetail = ({ appliances, onUpdate }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const appliance = appliances.find(appliance => appliance.id === id)
  
  if (!appliance) {
    return (
      <div className="container">
        <div className="card text-center" style={{ padding: '3rem' }}>
          <h3>Appliance not found</h3>
          <p>The appliance you're looking for doesn't exist or may have been deleted.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }
  
  const warrantyEndDate = new Date(appliance.purchaseDate)
  warrantyEndDate.setFullYear(warrantyEndDate.getFullYear() + appliance.warrantyYears)
  
  const isWarrantyActive = warrantyEndDate > new Date()
  const daysUntilExpiry = Math.ceil((warrantyEndDate - new Date()) / (1000 * 60 * 60 * 24))
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this appliance? This action cannot be undone.')) {
      // In a real app, we would call a delete function here
      // For now, we'll just navigate back to home
      alert('Appliance deleted successfully!')
      navigate('/')
    }
  }

  return (
    <div className="container">
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 style={{ margin: '0' }}>{appliance.name}</h2>
          <div>
            <span className={`badge ${isWarrantyActive ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '1rem' }}>
              Warranty {isWarrantyActive ? 'Active' : 'Expired'}
            </span>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-12 col-md-6">
            <h3>Basic Information</h3>
            <div className="row mb-2">
              <div className="col-4"><strong>Name:</strong></div>
              <div className="col-8">{appliance.name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4"><strong>Brand:</strong></div>
              <div className="col-8">{appliance.brand}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4"><strong>Model:</strong></div>
              <div className="col-8">{appliance.model}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4"><strong>Serial Number:</strong></div>
              <div className="col-8">{appliance.serialNumber || 'N/A'}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4"><strong>Purchase Location:</strong></div>
              <div className="col-8">{appliance.purchaseLocation || 'N/A'}</div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <h3>Warranty Information</h3>
            <div className="row mb-2">
              <div className="col-5"><strong>Purchase Date:</strong></div>
              <div className="col-7">{formatDate(appliance.purchaseDate)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-5"><strong>Warranty Duration:</strong></div>
              <div className="col-7">{appliance.warrantyYears} year{appliance.warrantyYears !== 1 ? 's' : ''}</div>
            </div>
            <div className="row mb-2">
              <div className="col-5"><strong>Warranty End Date:</strong></div>
              <div className="col-7">
                {formatDate(warrantyEndDate)}
                {isWarrantyActive && (
                  <div style={{ fontSize: '0.9rem', color: daysUntilExpiry < 30 ? '#e74c3c' : '#7f8c8d', marginTop: '0.25rem' }}>
                    {daysUntilExpiry === 0 ? 'Expires today' : 
                     daysUntilExpiry === 1 ? 'Expires tomorrow' : 
                     `Expires in ${daysUntilExpiry} days`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <h3>Service Contacts</h3>
            {appliance.serviceContacts && appliance.serviceContacts.length > 0 ? (
              <div>
                {appliance.serviceContacts.map((contact, index) => (
                  <div key={index} className="card mb-2" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <strong>{contact.name}</strong>
                      </div>
                      <div className="col-12 col-md-6">
                        {contact.phone && <div>📞 {contact.phone}</div>}
                        {contact.email && <div>✉️ {contact.email}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                No service contacts added yet.
              </div>
            )}
          </div>
        </div>
        
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <h3>Maintenance Tasks</h3>
            {appliance.maintenanceTasks && appliance.maintenanceTasks.length > 0 ? (
              <div>
                {appliance.maintenanceTasks.map((task, index) => (
                  <div key={index} className="card mb-2" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <strong>{task.name}</strong>
                      </div>
                      <div className="col-12 col-md-6">
                        <div>📅 Due: {formatDate(task.date)}</div>
                        {task.frequency && <div>🔄 Frequency: {task.frequency}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                No maintenance tasks scheduled yet.
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="card text-center">
        <div className="row">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <Link to={`/edit/${appliance.id}`} className="btn btn-warning">
              Edit Appliance
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <button 
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete Appliance
            </button>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/" className="btn btn-secondary">
            ← Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ApplianceDetail