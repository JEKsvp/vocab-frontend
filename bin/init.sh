#!/bin/bash
WORK_DIR=$(cd "$(dirname "$0")"; cd ..; pwd)

echo -e " \n WORK_DIR $WORK_DIR "

cd "${WORK_DIR}/client/" || exit
npm install

cd "${WORK_DIR}/server/" || exit
npm install