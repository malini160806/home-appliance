#!/bin/bash

# Script to deploy the Home Appliance Tracker to GitHub

echo "Deploying Home Appliance Tracker to GitHub"

# Check if we have a remote origin
if git remote get-url origin > /dev/null 2>&1; then
    echo "Remote origin already exists:"
    git remote -v
    echo "Pushing to existing remote..."
    git push -u origin master
else
    echo "No remote origin found. Please follow these steps:"
    echo "1. Create a new repository on GitHub (do not initialize with README)"
    echo "2. Copy the repository URL"
    echo "3. Run: git remote add origin <your-repository-url>"
    echo "4. Run: git push -u origin master"
    echo ""
    echo "Example commands (replace with your actual repository URL):"
    echo "git remote add origin https://github.com/yourusername/home-appliance-tracker.git"
    echo "git push -u origin master"
fi