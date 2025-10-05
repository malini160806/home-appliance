import express from 'express'
const router = express.Router()

// In-memory storage as fallback
let appliances = []
let nextId = 1

// Middleware to check database connection
router.use((req, res, next) => {
  const db = req.app.get('db')
  req.db = db
  req.useDatabase = db && db.state === 'authenticated'
  next()
})

// Get all appliances with their related data
router.get('/appliances', (req, res) => {
  if (req.useDatabase) {
    const query = `
      SELECT 
        a.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', sc.id,
            'name', sc.name,
            'phone', sc.phone,
            'email', sc.email
          )
        ) as service_contacts,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', mt.id,
            'name', mt.name,
            'date', mt.date,
            'frequency', mt.frequency
          )
        ) as maintenance_tasks
      FROM appliances a
      LEFT JOIN service_contacts sc ON a.id = sc.appliance_id
      LEFT JOIN maintenance_tasks mt ON a.id = mt.appliance_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `
    
    req.db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      
      // Process results to handle NULL values and clean up the data
      const processedResults = results.map(appliance => ({
        ...appliance,
        service_contacts: appliance.service_contacts ? 
          JSON.parse(appliance.service_contacts).filter(contact => contact.id !== null) : 
          [],
        maintenance_tasks: appliance.maintenance_tasks ? 
          JSON.parse(appliance.maintenance_tasks).filter(task => task.id !== null) : 
          []
      }))
      
      res.json(processedResults)
    })
  } else {
    // Fallback to in-memory storage
    res.json(appliances)
  }
})

// Get a single appliance by ID
router.get('/appliances/:id', (req, res) => {
  const { id } = req.params
  
  if (req.useDatabase) {
    const query = `
      SELECT 
        a.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', sc.id,
            'name', sc.name,
            'phone', sc.phone,
            'email', sc.email
          )
        ) as service_contacts,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', mt.id,
            'name', mt.name,
            'date', mt.date,
            'frequency', mt.frequency
          )
        ) as maintenance_tasks
      FROM appliances a
      LEFT JOIN service_contacts sc ON a.id = sc.appliance_id
      LEFT JOIN maintenance_tasks mt ON a.id = mt.appliance_id
      WHERE a.id = ?
      GROUP BY a.id
    `
    
    req.db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Appliance not found' })
      }
      
      const appliance = results[0]
      const processedAppliance = {
        ...appliance,
        service_contacts: appliance.service_contacts ? 
          JSON.parse(appliance.service_contacts).filter(contact => contact.id !== null) : 
          [],
        maintenance_tasks: appliance.maintenance_tasks ? 
          JSON.parse(appliance.maintenance_tasks).filter(task => task.id !== null) : 
          []
      }
      
      res.json(processedAppliance)
    })
  } else {
    // Fallback to in-memory storage
    const appliance = appliances.find(a => a.id == id)
    if (!appliance) {
      return res.status(404).json({ message: 'Appliance not found' })
    }
    res.json(appliance)
  }
})

// Create a new appliance
router.post('/appliances', (req, res) => {
  const { 
    name, brand, model, purchase_date, warranty_years, 
    serial_number, purchase_location, service_contacts, maintenance_tasks 
  } = req.body
  
  if (req.useDatabase) {
    // Insert appliance
    const applianceQuery = `INSERT INTO appliances 
      (name, brand, model, purchase_date, warranty_years, serial_number, purchase_location) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`
    
    req.db.query(
      applianceQuery, 
      [name, brand, model, purchase_date, warranty_years, serial_number, purchase_location], 
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        
        const applianceId = result.insertId
        
        // Insert service contacts
        if (service_contacts && service_contacts.length > 0) {
          const contactQueries = service_contacts.map(contact => {
            return new Promise((resolve, reject) => {
              const contactQuery = `INSERT INTO service_contacts (appliance_id, name, phone, email) VALUES (?, ?, ?, ?)`
              req.db.query(contactQuery, [applianceId, contact.name, contact.phone, contact.email], (err, result) => {
                if (err) reject(err)
                else resolve(result)
              })
            })
          })
          
          Promise.all(contactQueries)
            .then(() => {
              // Insert maintenance tasks
              if (maintenance_tasks && maintenance_tasks.length > 0) {
                const taskQueries = maintenance_tasks.map(task => {
                  return new Promise((resolve, reject) => {
                    const taskQuery = `INSERT INTO maintenance_tasks (appliance_id, name, date, frequency) VALUES (?, ?, ?, ?)`
                    req.db.query(taskQuery, [applianceId, task.name, task.date, task.frequency], (err, result) => {
                      if (err) reject(err)
                      else resolve(result)
                    })
                  })
                })
                
                Promise.all(taskQueries)
                  .then(() => {
                    res.status(201).json({ id: applianceId, message: 'Appliance created successfully' })
                  })
                  .catch(err => {
                    res.status(500).json({ error: err.message })
                  })
              } else {
                res.status(201).json({ id: applianceId, message: 'Appliance created successfully' })
              }
            })
            .catch(err => {
              res.status(500).json({ error: err.message })
            })
        } else {
          // No service contacts, just insert maintenance tasks
          if (maintenance_tasks && maintenance_tasks.length > 0) {
            const taskQueries = maintenance_tasks.map(task => {
              return new Promise((resolve, reject) => {
                const taskQuery = `INSERT INTO maintenance_tasks (appliance_id, name, date, frequency) VALUES (?, ?, ?, ?)`
                req.db.query(taskQuery, [applianceId, task.name, task.date, task.frequency], (err, result) => {
                  if (err) reject(err)
                  else resolve(result)
                })
              })
            })
            
            Promise.all(taskQueries)
              .then(() => {
                res.status(201).json({ id: applianceId, message: 'Appliance created successfully' })
              })
              .catch(err => {
                res.status(500).json({ error: err.message })
              })
          } else {
            res.status(201).json({ id: applianceId, message: 'Appliance created successfully' })
          }
        }
      }
    )
  } else {
    // Fallback to in-memory storage
    const newAppliance = {
      id: nextId++,
      name,
      brand,
      model,
      purchase_date,
      warranty_years,
      serial_number,
      purchase_location,
      service_contacts: service_contacts || [],
      maintenance_tasks: maintenance_tasks || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    appliances.push(newAppliance)
    res.status(201).json({ id: newAppliance.id, message: 'Appliance created successfully' })
  }
})

// Update an appliance
router.put('/appliances/:id', (req, res) => {
  const { id } = req.params
  const { 
    name, brand, model, purchase_date, warranty_years, 
    serial_number, purchase_location, service_contacts, maintenance_tasks 
  } = req.body
  
  if (req.useDatabase) {
    // Update appliance
    const applianceQuery = `UPDATE appliances SET 
      name = ?, brand = ?, model = ?, purchase_date = ?, warranty_years = ?, 
      serial_number = ?, purchase_location = ? 
      WHERE id = ?`
    
    req.db.query(
      applianceQuery, 
      [name, brand, model, purchase_date, warranty_years, serial_number, purchase_location, id], 
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Appliance not found' })
        }
        
        // Delete existing service contacts and insert new ones
        const deleteContactsQuery = `DELETE FROM service_contacts WHERE appliance_id = ?`
        
        req.db.query(deleteContactsQuery, [id], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          
          if (service_contacts && service_contacts.length > 0) {
            const contactQueries = service_contacts.map(contact => {
              return new Promise((resolve, reject) => {
                const contactQuery = `INSERT INTO service_contacts (appliance_id, name, phone, email) VALUES (?, ?, ?, ?)`
                req.db.query(contactQuery, [id, contact.name, contact.phone, contact.email], (err, result) => {
                  if (err) reject(err)
                  else resolve(result)
                })
              })
            })
            
            Promise.all(contactQueries)
              .then(() => {
                // Delete existing maintenance tasks and insert new ones
                const deleteTasksQuery = `DELETE FROM maintenance_tasks WHERE appliance_id = ?`
                
                req.db.query(deleteTasksQuery, [id], (err) => {
                  if (err) {
                    return res.status(500).json({ error: err.message })
                  }
                  
                  if (maintenance_tasks && maintenance_tasks.length > 0) {
                    const taskQueries = maintenance_tasks.map(task => {
                      return new Promise((resolve, reject) => {
                        const taskQuery = `INSERT INTO maintenance_tasks (appliance_id, name, date, frequency) VALUES (?, ?, ?, ?)`
                        req.db.query(taskQuery, [id, task.name, task.date, task.frequency], (err, result) => {
                          if (err) reject(err)
                          else resolve(result)
                        })
                      })
                    })
                    
                    Promise.all(taskQueries)
                      .then(() => {
                        res.json({ message: 'Appliance updated successfully' })
                      })
                      .catch(err => {
                        res.status(500).json({ error: err.message })
                      })
                  } else {
                    res.json({ message: 'Appliance updated successfully' })
                  }
                })
              })
              .catch(err => {
                res.status(500).json({ error: err.message })
              })
          } else {
            // No service contacts, just handle maintenance tasks
            const deleteTasksQuery = `DELETE FROM maintenance_tasks WHERE appliance_id = ?`
            
            req.db.query(deleteTasksQuery, [id], (err) => {
              if (err) {
                return res.status(500).json({ error: err.message })
              }
              
              if (maintenance_tasks && maintenance_tasks.length > 0) {
                const taskQueries = maintenance_tasks.map(task => {
                  return new Promise((resolve, reject) => {
                    const taskQuery = `INSERT INTO maintenance_tasks (appliance_id, name, date, frequency) VALUES (?, ?, ?, ?)`
                    req.db.query(taskQuery, [id, task.name, task.date, task.frequency], (err, result) => {
                      if (err) reject(err)
                      else resolve(result)
                    })
                  })
                })
                
                Promise.all(taskQueries)
                  .then(() => {
                    res.json({ message: 'Appliance updated successfully' })
                  })
                  .catch(err => {
                    res.status(500).json({ error: err.message })
                  })
              } else {
                res.json({ message: 'Appliance updated successfully' })
              }
            })
          }
        })
      }
    )
  } else {
    // Fallback to in-memory storage
    const index = appliances.findIndex(a => a.id == id)
    if (index === -1) {
      return res.status(404).json({ message: 'Appliance not found' })
    }
    
    appliances[index] = {
      ...appliances[index],
      name,
      brand,
      model,
      purchase_date,
      warranty_years,
      serial_number,
      purchase_location,
      service_contacts: service_contacts || [],
      maintenance_tasks: maintenance_tasks || [],
      updated_at: new Date().toISOString()
    }
    
    res.json({ message: 'Appliance updated successfully' })
  }
})

// Delete an appliance
router.delete('/appliances/:id', (req, res) => {
  const { id } = req.params
  
  if (req.useDatabase) {
    const query = `DELETE FROM appliances WHERE id = ?`
    
    req.db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Appliance not found' })
      }
      
      res.json({ message: 'Appliance deleted successfully' })
    })
  } else {
    // Fallback to in-memory storage
    const index = appliances.findIndex(a => a.id == id)
    if (index === -1) {
      return res.status(404).json({ message: 'Appliance not found' })
    }
    
    appliances.splice(index, 1)
    res.json({ message: 'Appliance deleted successfully' })
  }
})

export default router