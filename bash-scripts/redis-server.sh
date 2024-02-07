#!/bin/bash

# Update package repository
sudo apt update   # For Debian/Ubuntu

# Install Redis
sudo apt install -y redis-server

# Start Redis server
sudo systemctl start redis

# Enable Redis to start on boot
sudo systemctl enable redis
