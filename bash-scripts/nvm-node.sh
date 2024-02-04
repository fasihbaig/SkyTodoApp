#!/bin/bash

# Download and install NVM
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Source the NVM script to make it available in the current session
source ~/.bashrc

# Install the latest LTS version of Node.js
nvm install --lts

# Display Node.js version
node --version