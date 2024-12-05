# Stage 1: Build React app
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# RUN npm install -g yarn

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the project
RUN yarn pbuild

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the first stage
# Create /public directory and copy bundle.min.js
RUN mkdir -p /usr/share/nginx/html/public
COPY --from=build /app/dist/bundle.min.js /usr/share/nginx/html/public/
COPY --from=build /app/index.html /usr/share/nginx/html/
COPY --from=build /app/public/*.png /usr/share/nginx/html/public

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
