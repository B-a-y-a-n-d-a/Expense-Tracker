# ============================================
# STAGE 1: Development
# ============================================
# Start from the official Node.js image on Docker Hub
# We use version 20-alpine — alpine is a tiny Linux distro
# that keeps our image small
FROM node:20-alpine AS development

# Set the working directory inside the container
# All subsequent commands run from this folder
WORKDIR /app

# Copy package.json and package-lock.json first
# We copy these BEFORE the rest of the code because
# Docker caches each step — if package.json hasn't changed
# Docker reuses the cached npm install step (much faster)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of our source code into the container
COPY . .

# Tell Docker our app uses port 5173
# This is documentation — it doesn't actually open the port
EXPOSE 5173

# The command to run when the container starts
# host 0.0.0.0 makes Vite accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ============================================
# STAGE 2: Build
# ============================================
# This stage builds the production-ready static files
# We start fresh from Node again
FROM node:20-alpine AS build

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app — creates a dist/ folder with
# optimised HTML, CSS and JS files
RUN npm run build

# ============================================
# STAGE 3: Production
# ============================================
# Now we use Nginx to serve the built files
# We DON'T need Node.js in production — just the
# static files and a web server
# nginx:alpine is tiny — only ~23MB
FROM nginx:alpine AS production

# Copy our built files from the build stage
# into Nginx's default web root folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx serves on port 80
EXPOSE 80

# Start Nginx in the foreground
# daemon off means Nginx doesn't run as a background
# process — Docker needs the main process to stay running
CMD ["nginx", "-g", "daemon off;"]