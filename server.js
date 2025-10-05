import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import applianceRoutes from './routes/applianceRoutes.js'

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')))
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

// Create MySQL connection
let db

// Try to connect to MySQL
try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
  
  // Connect to MySQL
  db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.stack)
      console.log('Running in fallback mode with in-memory storage')
      return
    }
    
    console.log('Connected to MySQL database')
    
    // Create database if it doesn't exist
    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,(err)=>{
      if (err) {
        console.error('Error creating database:', err)
        return
      }
      
      // Use the database
      db.query(`USE ${process.env.DB_NAME}`,(err)=>{
        if (err) {
          console.error('Error selecting database:', err)
          return
        }
        
        // Create appliances table if it doesn't exist
        const createAppliancesTable = `
          CREATE TABLE IF NOT EXISTS appliances (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brand VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            purchase_date DATE NOT NULL,
            warranty_years INT NOT NULL,
            serial_number VARCHAR(255),
            purchase_location VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `
        
        db.query(createAppliancesTable, (err) => {
          if (err) {
            console.error('Error creating appliances table:', err)
          } else {
            console.log('Appliances table is ready')
          }
        })
        
        // Create service_contacts table if it doesn't exist
        const createServiceContactsTable = `
          CREATE TABLE IF NOT EXISTS service_contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            appliance_id INT,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            email VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (appliance_id) REFERENCES appliances(id) ON DELETE CASCADE
          )
        `
        
        db.query(createServiceContactsTable, (err) => {
          if (err) {
            console.error('Error creating service_contacts table:', err)
          } else {
            console.log('Service contacts table is ready')
          }
        })
        
        // Create maintenance_tasks table if it doesn't exist
        const createMaintenanceTasksTable = `
          CREATE TABLE IF NOT EXISTS maintenance_tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            appliance_id INT,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            frequency VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (appliance_id) REFERENCES appliances(id) ON DELETE CASCADE
          )
        `
        
        db.query(createMaintenanceTasksTable, (err) => {
          if (err) {
            console.error('Error creating maintenance_tasks table:', err)
          } else {
            console.log('Maintenance tasks table is ready')
          }
        })
      })
    })
  })
} catch (error) {
  console.error('Failed to initialize MySQL connection:', error)
  console.log('Running in fallback mode with in-memory storage')
}

// Make db accessible to the router
app.set('db', db)

// Use routes
app.use('/api', applianceRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app