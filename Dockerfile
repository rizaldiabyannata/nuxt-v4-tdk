# Stage 1: Build Stage
# Use a slim Node.js LTS version as the base image for building the app.
FROM node:20-slim AS builder

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
COPY package*.json ./

# Install dependencies using npm ci for consistent and fast installs.
RUN npm ci

# Copy the rest of the application source code into the container.
COPY . .

# Run the build script to generate the production-ready application.
# The output will be in the ./.output directory.
RUN npm run build


# Stage 2: Production Stage
# Use a fresh, slim base image for the final production container.
FROM node:20-slim AS runner

# Set the working directory.
WORKDIR /app

# Set environment variables for production.
# Dokploy or other tools can override the PORT if needed.
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# For security, create a dedicated non-root user and group to run the application.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 node

# Copy the self-contained .output directory from the builder stage.
# This directory contains everything needed to run the app in production.
# Also, set the correct ownership to the non-root user.
COPY --from=builder --chown=node:nodejs /app/.output ./.output

# Switch to the non-root user.
USER node

# Expose the port the application will run on.
EXPOSE 3000

# The command to start the Nuxt server in production.
CMD [ "node", ".output/server/index.mjs" ]
