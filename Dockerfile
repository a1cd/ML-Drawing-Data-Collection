# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy application files
COPY server.js .
COPY index.html .

# Expose the port the app runs on
EXPOSE 3000

# Create directory for storing drawing data
RUN mkdir -p /app/data

# Run the server
CMD ["node", "server.js"]
