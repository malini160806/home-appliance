# Home Appliance Tracker - Render Deployment Guide

This guide provides step-by-step instructions for deploying the Home Appliance Tracker application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A GitHub account with the repository forked
3. This repository: https://github.com/malini160806/home-appliance

## Deployment Steps

### Step 1: Create a New Web Service on Render

1. Log in to your Render account
2. Click the "New+" button in the dashboard
3. Select "Web Service"

### Step 2: Connect Your GitHub Repository

1. If you haven't already, connect your GitHub account to Render
2. Search for and select your forked repository: `malini160806/home-appliance`
3. Select the `main` branch

### Step 3: Configure the Web Service

Fill in the following configuration:

- **Name**: `home-appliance-tracker`
- **Region**: Choose the region closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repository)
- **Environment**: `Node`
- **Build Command**: `npm run render-build`
- **Start Command**: `npm start`

### Step 4: Add Environment Variables

Click on "Advanced" and add these environment variables:

```
NODE_ENV=production
PORT=10000
```

For database connectivity (optional but recommended for persistent data):

```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

### Step 5: Deploy

Click "Create Web Service" to begin the deployment process.

## Database Setup (Optional but Recommended)

For persistent data storage, you can add a MySQL database:

### Option 1: Use Render's Database Service

1. In Render dashboard, click "New+" and select "Database"
2. Choose "MySQL"
3. Configure the database settings:
   - **Name**: `home-appliance-db`
   - **Region**: Same as your web service
   - **Plan**: Free or choose a paid tier
4. After creation, Render will provide connection details
5. Update your web service environment variables with the actual database credentials

### Option 2: Use External MySQL Provider

You can use any external MySQL provider (AWS RDS, DigitalOcean, etc.) and configure the connection using the environment variables.

## Environment Variables Reference

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Port for the application | `5000` |
| `DB_HOST` | MySQL database host | `localhost` |
| `DB_USER` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL database password | `password` |
| `DB_NAME` | MySQL database name | `appliance_tracker` |
| `DB_PORT` | MySQL database port | `3306` |

## How the Application Works

### Fallback Mechanism

The application has a built-in fallback mechanism:
- If database connection fails, it automatically switches to in-memory storage
- This ensures the application remains functional even without a database
- All data will persist in memory until the service restarts

### Build Process

1. Render runs `npm run render-build` which:
   - Installs all dependencies
   - Builds the React frontend using Vite
2. The built files are placed in the `dist` directory
3. Render then runs `npm start` which:
   - Starts the Node.js Express server
   - Serves the built frontend files in production

### API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/appliances` - Retrieve all appliances
- `GET /api/appliances/:id` - Retrieve a specific appliance
- `POST /api/appliances` - Create a new appliance
- `PUT /api/appliances/:id` - Update an existing appliance
- `DELETE /api/appliances/:id` - Delete an appliance

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are correctly listed in package.json
   - Verify the build command is correct

2. **Application Crashes**
   - Check the application logs in Render dashboard
   - Verify environment variables are correctly set
   - Check database connection settings

3. **Database Connection Issues**
   - Verify database credentials are correct
   - Ensure the database is accessible from Render
   - Check firewall settings if using an external database

4. **Performance Issues**
   - Consider upgrading to a paid instance type
   - Optimize database queries if needed

### Logs

You can view detailed logs for both build process and application runtime in the Render dashboard:
1. Go to your web service
2. Click on "Logs" tab
3. Select "Build" or "App" to view respective logs

## Updating the Application

To update your deployed application:

1. Push changes to your GitHub repository
2. Render will automatically detect changes and start a new deployment
3. You can also manually trigger a deployment from the Render dashboard:
   - Go to your web service
   - Click "Manual Deploy"
   - Select "Clear build cache & deploy"

## Custom Domain (Optional)

To use a custom domain:

1. In your web service settings, go to "Custom Domains"
2. Add your domain
3. Follow the instructions to configure DNS records
4. Render will automatically provision an SSL certificate

## Scaling

Render automatically handles scaling for your application. For higher traffic:

1. Upgrade to a paid instance type
2. Consider adding a database if you haven't already
3. Monitor performance using Render's metrics

## Support

For issues with the application:

1. Check the logs in Render dashboard
2. Ensure all environment variables are correctly set
3. Verify the build process completed successfully
4. Check that your database (if used) is properly configured

For issues with Render deployment:

1. Refer to Render's documentation: https://render.com/docs
2. Check Render's status page: https://status.render.com
3. Contact Render support through their dashboard

## Application Features

The deployed application includes:

1. **Inventory Tracking**: Manage all your home appliances
2. **Warranty Management**: Track warranty periods and expiration dates
3. **Maintenance Scheduling**: Schedule and track maintenance tasks
4. **Service Contact Storage**: Store service center contact information
5. **Responsive Design**: Works on desktop and mobile devices
6. **Search and Filter**: Easily find appliances by various criteria

## Data Management

### Initial Data

The application comes with sample data scripts:
- `add-sample-data.js` - Adds 4 sample appliances
- `add-20-appliances.js` - Adds 20 appliances with various warranty statuses

### Data Persistence

- With database: Data persists between deployments and restarts
- Without database: Data is stored in memory and lost on restart

## Security Considerations

1. Environment variables are encrypted at rest
2. HTTPS is automatically provided by Render
3. Database credentials should never be hardcoded
4. API endpoints do not currently implement authentication (single-user app)

## Performance Optimization

1. The application uses efficient database queries
2. Frontend is built and minified for production
3. Static assets are served efficiently
4. Database connections are properly managed

## Backup and Recovery

For production use with a database:

1. Regular database backups are recommended
2. Render provides backup options for paid database plans
3. Consider implementing export/import functionality for data portability

## Monitoring

Render provides built-in monitoring:

1. Uptime monitoring
2. Performance metrics
3. Error tracking
4. Resource usage monitoring

Set up notifications in the Render dashboard to be alerted of any issues.