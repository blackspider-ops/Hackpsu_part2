#!/bin/bash

# Create a .gitignore file
cat > .gitignore << 'EOL'
# Python
__pycache__/
*.py[cod]
*$py.class
venv/
env/
.env

# Node.js
node_modules/
.npm

# Build files
frontend/dist/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOL

echo "Project setup complete!"
echo "To start the backend:"
echo "  cd backend"
echo "  pip install -r requirements.txt"
echo "  python app.py"
echo ""
echo "To start the frontend (development mode):"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "To build the frontend for production:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run build"