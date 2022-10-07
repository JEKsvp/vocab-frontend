#!/bin/bash

display_usage() {
  echo -e "\n This script starts container for it-landscape-web"
  echo -e "\nUSAGE:\n\n ${0} <build-tag>\n"
}

if [ $# -lt 1 ]; then
  display_usage
  exit 1
fi

docker run -e REDIS_HOST="docker.for.mac.host.internal" \
-e BACKEND_URL="http://docker.for.mac.host.internal:8081" \
-e PORT="80" \
-p 80:80 \
"$1"
