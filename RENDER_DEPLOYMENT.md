# Deploying Home Appliance Tracker to Render

This guide will help you deploy the Home Appliance Tracker application to Render.

## Prerequisites

1. A Render account (create one at https://render.com if you don't have one)
2. Your GitHub repository with the Home Appliance Tracker code

## Deployment Steps

### 1. Connect Render to Your GitHub Repository

1. Go to https://dashboard.render.com and log in to your account
2. Click on "New+" and select "Web Service"
3. Connect your GitHub account if you haven't already
4. Select your forked repository (malini160806/home-appliance)

### 2. Configure the Web Service

Fill in the following information:

- **Name**: home-appliance-tracker
- **Region**: Choose the region closest to you
- **Branch**: main
- **Root Directory**: Leave empty (root of repository)
- **Environment**: Node
- **Build Command**: `npm run render-build`
- **Start Command**: `npm start`
- **Instance Type**: Free (or choose a paid tier for better performance)

### 3. Add Environment Variables

Click on "Advanced" and add the following environment variables:

```
NODE_ENV=production
DB_HOST=YOUR_MYSQL_HOST
DB_USER=YOUR_MYSQL_USER
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=YOUR_MYSQL_DATABASE
DB_PORT=3306
```

Note: For initial deployment, you can use placeholder values since the app has a fallback to in-memory storage.

### 4. Deploy

Click "Create Web Service" to start the deployment process.

## Database Configuration (Optional)

For persistent data storage, you can add a MySQL database:

1. In Render dashboard, click "New+" and select "Database"
2. Choose "MySQL"
3. Configure the database settings
4. After creation, Render will provide connection details
5. Update your environment variables with the actual database credentials

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to "production" for production deployment
- `PORT`: Port for the application (Render will set this automatically)
- `DB_HOST`: MySQL database host
- `DB_USER`: MySQL database user
- `DB_PASSWORD`: MySQL database password
- `DB_NAME`: MySQL database name
- `DB_PORT`: MySQL database port (default: 3306)

## Deployment with Database

If you want to deploy with MySQL database support:

1. First deploy the application with placeholder database credentials
2. Create a MySQL database on Render
3. Update the environment variables with actual database credentials
4. The application will automatically create the necessary tables on first run

## Fallback Mode

If database connection fails, the application will automatically fall back to in-memory storage, ensuring the application remains functional.

## Troubleshooting

1. **Build Failures**: Check the build logs in Render dashboard
2. **Application Crashes**: Check the application logs in Render dashboard
3. **Database Connection Issues**: Verify environment variables are correctly set
4. **Performance Issues**: Consider upgrading to a paid instance type

## Updating the Application

To update your deployed application:

1. Push changes to your GitHub repository
2. Render will automatically detect changes and start a new deployment
3. You can also manually trigger a deployment from the Render dashboard

## Support

For issues with the application, please check:
- Application logs in Render dashboard
- Ensure all environment variables are correctly set
- Verify the build process completed successfully