# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Copy the scripts directory to ensure prepublish scripts are available
COPY scripts/ ./scripts/

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# Expose the port the app runs on
EXPOSE 8601

# Define the command to run the application
CMD ["npm", "start"]
