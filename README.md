# Home Appliance Tracker

A comprehensive web application for tracking and managing household electronic appliances, including warranty information, maintenance schedules, and service contacts.

## Features

- **Inventory Tracking**: Maintain a list of all electronic appliances with detailed metadata
- **Warranty Management**: Track warranty periods and receive notifications before expiration
- **Maintenance Scheduling**: Log and schedule maintenance tasks with recurring options
- **Service Contact Storage**: Store relevant contact information for warranty/service centers
- **Search & Filter**: Easily locate appliances by name, brand, or warranty status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- React with Vite
- React Router for navigation
- Modern CSS with responsive design

### Backend
- Node.js with Express
- MySQL database integration
- RESTful API architecture

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your MySQL database configuration:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=appliance_tracker
   DB_PORT=3306
   ```

4. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm start
   
   # Or start separately
   npm run server  # Backend API
   npm run dev     # Frontend development server
   ```

## Database Schema

The application automatically creates the following tables:

1. **appliances**: Stores appliance information
2. **service_contacts**: Stores service contact information for each appliance
3. **maintenance_tasks**: Stores maintenance tasks for each appliance

## API Endpoints

- `GET /api/appliances` - Retrieve all appliances
- `GET /api/appliances/:id` - Retrieve a specific appliance
- `POST /api/appliances` - Create a new appliance
- `PUT /api/appliances/:id` - Update an existing appliance
- `DELETE /api/appliances/:id` - Delete an appliance

## Fallback Mechanism

If MySQL is not available, the application gracefully falls back to in-memory storage, ensuring uninterrupted functionality.

## Usage

1. **Add an Appliance**: Click "Add Appliance" to enter details including name, brand, model, purchase date, warranty period, and serial number.

2. **View Details**: Click "View Details" on any appliance card to see comprehensive information including warranty status, service contacts, and maintenance tasks.

3. **Edit Information**: Use the "Edit" button to update appliance details, service contacts, or maintenance tasks.

4. **Search/Filter**: Use the search bar and filter dropdown on the home page to quickly locate appliances.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.