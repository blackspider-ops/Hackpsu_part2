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

cd frontend && npm install && npm run build 
cd ../backend && pip3 install -r requirements.txt && python3 app.py 