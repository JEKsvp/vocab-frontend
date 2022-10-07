#!/bin/bash

IMAGE_NAME=jeksvp/vocab-frontend:latest

SCRIPT_PATH=$(
  cd "$(dirname "${BASH_SOURCE[0]}")" || exit
  pwd -P
)
"${SCRIPT_PATH}"/init.sh

WORK_DIR=$(
  cd "$(dirname "$0")" || exit
  cd ..
  pwd
)

echo -e " \n WORK_DIR $WORK_DIR "

cd "${WORK_DIR}/client/" || exit
npm run build

mv "${WORK_DIR}/client/dist" "${WORK_DIR}/server/public/"

cd "$WORK_DIR" || exit
docker build . -t "$IMAGE_NAME"
