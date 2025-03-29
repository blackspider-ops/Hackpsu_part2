#!/bin/bash

# Create necessary directories
mkdir -p frontend/src
mkdir -p frontend/public

# Copy React source files
cp -r ../123/tuk-tuk-ride-sharer/src/* frontend/src/
cp -r ../123/tuk-tuk-ride-sharer/public/* frontend/public/

# Copy configuration files
cp ../123/tuk-tuk-ride-sharer/index.html frontend/
cp ../123/tuk-tuk-ride-sharer/postcss.config.js frontend/
cp ../123/tuk-tuk-ride-sharer/tailwind.config.ts frontend/
cp ../123/tuk-tuk-ride-sharer/tsconfig.json frontend/
cp ../123/tuk-tuk-ride-sharer/tsconfig.app.json frontend/
cp ../123/tuk-tuk-ride-sharer/tsconfig.node.json frontend/
cp ../123/tuk-tuk-ride-sharer/components.json frontend/
cp ../123/tuk-tuk-ride-sharer/eslint.config.js frontend/

echo "Frontend files copied successfully!"