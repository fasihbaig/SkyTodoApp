#!/bin/bash

echo "Starting Backend Server In debug mode"

yarn workspace backend-nest run start:debug

echo "Backend Server Started Successfully"

yarn workspace frontend-react run dev

sleep 3000

echo "Frontend Server Started Successfully"
