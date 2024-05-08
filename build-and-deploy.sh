#!/bin/sh
# Set Node version
# export NVM_DIR=$HOME/.nvm;
# source $NVM_DIR/nvm.sh;
# nvm use --lts # Use latest Node.js version

# Data pipeline updates
# TK as necessary

# Build
npm run build

# Deploy
aws s3 sync build s3://apps.montanafreepress.org/draft-election-guide-2024 --delete
aws cloudfront create-invalidation --distribution-id E3LVPS3XLJHLL5 --paths "/draft-election-guide-2024/*"