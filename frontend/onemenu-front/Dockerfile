# ---------- STAGE 1: Build the Angular app ----------
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy full source code
COPY . .

# Build Angular app in production mode
RUN npm run build -- --configuration=production

# ---------- STAGE 2: Serve the built app with NGINX ----------
FROM nginx:alpine

# Copy Angular build to NGINX HTML folder
COPY --from=builder /app/dist/onemenu-front/browser /usr/share/nginx/html

# Optional: custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]