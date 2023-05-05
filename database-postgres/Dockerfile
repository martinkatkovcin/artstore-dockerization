FROM postgres:14-alpine

# Set default environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres
ENV POSTGRES_PORT 5432

# Expose PostgreSQL port
EXPOSE 5432

# Copy the initialization script
COPY init.sql /docker-entrypoint-initdb.d/