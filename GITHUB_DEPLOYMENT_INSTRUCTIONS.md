# GitHub Deployment Instructions

Your Home Appliance Tracker project is now ready to be deployed to GitHub. Follow these steps to publish your code:

## Prerequisites

1. A GitHub account (create one at https://github.com if you don't have one)
2. Git installed on your system (already set up)

## Deployment Steps

### 1. Create a New Repository on GitHub

1. Go to https://github.com and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "home-appliance-tracker")
4. **Important**: Do NOT initialize the repository with a README, .gitignore, or license
5. Click "Create repository"

### 2. Add the Remote Origin and Push

After creating the repository, you'll see a page with setup instructions. You'll need to run two commands in your project directory:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

### 3. Alternative Method Using Deployment Scripts

You can also use the deployment scripts included in this project:

**On Windows:**
Double-click the `deploy-to-github.bat` file or run it from the command line:
```cmd
deploy-to-github.bat
```

**On macOS/Linux:**
Run the shell script:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

### 4. Verify Deployment

After pushing, refresh your GitHub repository page. You should see all your project files uploaded.

## Project Structure on GitHub

Your repository will contain:
- All source code for the Home Appliance Tracker
- README.md documentation
- .gitignore file
- Deployment scripts
- Full commit history

## Future Updates

To update your GitHub repository with new changes:

1. Make your code changes
2. Add and commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```

## Troubleshooting

If you encounter any issues:

1. **Authentication problems**: Use GitHub CLI or set up SSH keys for easier authentication
2. **Permission denied**: Ensure you're using the correct repository URL and have proper access
3. **Branch name issues**: This project uses "master" branch; GitHub now defaults to "main"

For additional help, refer to GitHub's documentation at https://docs.github.com