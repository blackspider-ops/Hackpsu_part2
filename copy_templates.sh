#!/bin/bash

# Create necessary directories
mkdir -p backend/templates
mkdir -p backend/style

# Copy Flask template files
cp -r ../123/Hackpsu_part2/templates/* backend/templates/
cp -r ../123/Hackpsu_part2/style/* backend/style/

echo "Template files copied successfully!"