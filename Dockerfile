# Stage 1: Build the SvelteKit app
FROM node:18-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy built files and dependencies from the build stage
COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json /app/

# Install production dependencies
RUN npm install --production

# Expose port 3000
EXPOSE 3000

# Command to start the application
CMD ["node", "build"]
