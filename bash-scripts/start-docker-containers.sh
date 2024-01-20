#!/bin/bash

container_name="todo-app-mongodb"

# Specify the directory containing the docker-compose.yml file
compose_directory="./docker/mongoDB"


# Specify the docker-compose.yml file name (if it's not named docker-compose.yml)
compose_file="docker-compose.yml"

# Set the project name (optional)
project_name="todo-app-data-containers"


# Check if the container is running
if sudo docker ps -f "name=${container_name}" --format '{{.Names}}' | grep -q "${container_name}"; then
    echo "Container ${container_name} is running."
else
    echo "Container ${container_name} is not running."
    # Change to the specified directory
    cd "${compose_directory}" || exit
    echo "Current Directory" + pwd 
    sudo docker-compose -f "${compose_file}" -p "${project_name}" up -d
fi