# Use the official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /xposure

# Copy dependency definition files first to leverage Docker layer caching
COPY package.json ./

# Install dependencies
RUN bun install

# Copy application source code and prisma schema
COPY . .

# Generate Prisma client
# RUN bunx prisma generate

# Expose the port your app runs on
EXPOSE 3008

# Start the application
CMD ["bun", "run", "start"]