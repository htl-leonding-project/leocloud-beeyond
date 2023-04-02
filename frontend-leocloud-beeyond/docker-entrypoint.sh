#!/bin/sh

if [ -z "$BASE_PATH" ]; then
    echo "please set the BASE_PATH environment variable" 1>&2
    exit
fi

if [ -z "$API_URL" ]; then
    echo "please set the API_URL environment variable" 1>&2
    exit
fi

# replace the environment variable placeholder tokens
# and move the file manually to circumvent permissions issues
sed -e 's@__BASE_PATH__@'"$BASE_PATH"'@' -e 's@__API_URL__@'"$API_URL"'@' server.js >/tmp/server.js
echo "using BASE_PATH=$BASE_PATH and API_URL=$API_URL"
cat /tmp/server.js >server.js
rm /tmp/server.js

node server.js
