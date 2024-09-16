#!/bin/sh
# Set Node version
# export NVM_DIR=$HOME/.nvm;
# source $NVM_DIR/nvm.sh;
# nvm use --lts # Use latest Node.js version

# Data pipeline updates
node inputs/fec/fetch.js
node inputs/coverage/fetch.js

node process/legislative-candidates.js
node process/main.js
node process/make-candidate-list.js

# Build
npm run build

# Deploy
aws s3 sync build s3://apps.montanafreepress.org/election-guide-2024 --delete
aws cloudfront create-invalidation --distribution-id E3LVPS3XLJHLL5 --paths "/election-guide-2024/*"