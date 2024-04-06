#!/bin/bash

# Change directory to client (assuming your client code is there)
cd client

# Install Node.js and npm (adjust if using a different package manager)
apt-get update && apt-get install -y nodejs npm

# Install dependencies and build the React app
npm install && npm run build
