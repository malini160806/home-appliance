import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddApplianceForm = ({ onAdd, appliances, onUpdate }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    purchaseDate: '',
    warrantyYears: 1,
    serialNumber: '',
    purchaseLocation: '',
    serviceContacts: [],
    maintenanceTasks: []
  })
  
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' })
  const [newTask, setNewTask] = useState({ name: '', date: '', frequency: '' })
  const [errors, setErrors] = useState({})
  
  // If editing, load the appliance data
  useEffect(() => {
    if (isEditing && appliances) {
      const appliance = appliances.find(appliance => appliance.id === id)
      if (appliance) {
        setFormData({
          ...appliance,
          warrantyYears: appliance.warrantyYears || 1
        })
      }
    }
  }, [id, appliances, isEditing])
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Appliance name is required'
    }
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required'
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required'
    }
    
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required'
    }
    
    if (formData.warrantyYears <= 0) {
      newErrors.warrantyYears = 'Warranty duration must be greater than 0'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleTaskChange = (e) => {
    const { name, value } = e.target
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const addContact = () => {
    if (newContact.name && (newContact.phone || newContact.email)) {
      setFormData(prev => ({
        ...prev,
        serviceContacts: [...prev.serviceContacts, newContact]
      }))
      setNewContact({ name: '', phone: '', email: '' })
    }
  }
  
  const removeContact = (index) => {
    setFormData(prev => {
      const newContacts = [...prev.serviceContacts]
      newContacts.splice(index, 1)
      return { ...prev, serviceContacts: newContacts }
    })
  }
  
  const addTask = () => {
    if (newTask.name && newTask.date) {
      setFormData(prev => ({
        ...prev,
        maintenanceTasks: [...prev.maintenanceTasks, newTask]
      }))
      setNewTask({ name: '', date: '', frequency: '' })
    }
  }
  
  const removeTask = (index) => {
    setFormData(prev => {
      const newTasks = [...prev.maintenanceTasks]
      newTasks.splice(index, 1)
      return { ...prev, maintenanceTasks: newTasks }
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (isEditing) {
      onUpdate(formData)
      navigate(`/appliance/${id}`)
    } else {
      onAdd(formData)
      navigate('/')
    }
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center mb-4">{isEditing ? 'Edit Appliance' : 'Add New Appliance'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Appliance Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g., Refrigerator, Washing Machine"
                />
                {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="brand" className="form-label">Brand *</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
                  placeholder="e.g., Samsung, LG"
                />
                {errors.brand && <div className="text-danger mt-1">{errors.brand}</div>}
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="model" className="form-label">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className={`form-control ${errors.model ? 'is-invalid' : ''}`}
                  placeholder="e.g., RF28R7351SR"
                />
                {errors.model && <div className="text-danger mt-1">{errors.model}</div>}
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="serialNumber" className="form-label">Serial Number</label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 123456789"
                />
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="purchaseDate" className="form-label">Purchase Date *</label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className={`form-control ${errors.purchaseDate ? 'is-invalid' : ''}`}
                />
                {errors.purchaseDate && <div className="text-danger mt-1">{errors.purchaseDate}</div>}
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="warrantyYears" className="form-label">Warranty Duration (years) *</label>
                <input
                  type="number"
                  id="warrantyYears"
                  name="warrantyYears"
                  min="0"
                  step="1"
                  value={formData.warrantyYears}
                  onChange={handleChange}
                  className={`form-control ${errors.warrantyYears ? 'is-invalid' : ''}`}
                />
                {errors.warrantyYears && <div className="text-danger mt-1">{errors.warrantyYears}</div>}
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="purchaseLocation" className="form-label">Purchase Location</label>
                <input
                  type="text"
                  id="purchaseLocation"
                  name="purchaseLocation"
                  value={formData.purchaseLocation}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Best Buy, Amazon"
                />
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <h3>Service Contacts</h3>
            <p className="text-muted">Add service centers or warranty contacts for this appliance</p>
            
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newContact.name}
                    onChange={handleContactChange}
                    className="form-control"
                    placeholder="e.g., Service Center"
                  />
                </div>
              </div>
              
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleContactChange}
                    className="form-control"
                    placeholder="e.g., (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleContactChange}
                    className="form-control"
                    placeholder="e.g., support@example.com"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={addContact}
              className="btn btn-primary"
              disabled={!newContact.name || (!newContact.phone && !newContact.email)}
            >
              Add Contact
            </button>
            
            {formData.serviceContacts.length > 0 && (
              <div className="mt-3">
                <h4>Added Contacts</h4>
                <div className="row">
                  {formData.serviceContacts.map((contact, index) => (
                    <div key={index} className="col-12 col-md-6 mb-2">
                      <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="row align-items-center">
                          <div className="col-10">
                            <strong>{contact.name}</strong>
                            {contact.phone && <div>📞 {contact.phone}</div>}
                            {contact.email && <div>✉️ {contact.email}</div>}
                          </div>
                          <div className="col-2 text-right">
                            <button 
                              type="button" 
                              onClick={() => removeContact(index)}
                              className="btn btn-danger btn-sm"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="card mt-4">
            <h3>Maintenance Tasks</h3>
            <p className="text-muted">Schedule maintenance tasks for this appliance</p>
            
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Task Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleTaskChange}
                    className="form-control"
                    placeholder="e.g., Filter Replacement"
                  />
                </div>
              </div>
              
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Due Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={newTask.date}
                    onChange={handleTaskChange}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <input
                    type="text"
                    name="frequency"
                    value={newTask.frequency}
                    onChange={handleTaskChange}
                    className="form-control"
                    placeholder="e.g., Every 6 months"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={addTask}
              className="btn btn-primary"
              disabled={!newTask.name || !newTask.date}
            >
              Add Task
            </button>
            
            {formData.maintenanceTasks.length > 0 && (
              <div className="mt-3">
                <h4>Scheduled Tasks</h4>
                <div className="row">
                  {formData.maintenanceTasks.map((task, index) => (
                    <div key={index} className="col-12 col-md-6 mb-2">
                      <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="row align-items-center">
                          <div className="col-10">
                            <strong>{task.name}</strong>
                            <div>📅 Due: {task.date}</div>
                            {task.frequency && <div>🔄 {task.frequency}</div>}
                          </div>
                          <div className="col-2 text-right">
                            <button 
                              type="button" 
                              onClick={() => removeTask(index)}
                              className="btn btn-danger btn-sm"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-success mr-2">
              {isEditing ? 'Update Appliance' : 'Add Appliance'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApplianceForm