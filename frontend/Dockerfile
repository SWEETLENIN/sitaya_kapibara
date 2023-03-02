FROM nexus.rzd/node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# add nexus.rzd configurations to npm
RUN npm set registry "https://nexus.rzd/repository/npm-central/"
RUN npm set metrics-registry "https://nexus.rzd/repository/npm-central/"
RUN npm set strict-ssl false
# Install dependencies
RUN npm install
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nexus.rzd/nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
