#!/bin/sh
export BASE_DIR=$1
export APP_NAME=$2

docker compose -f admin/docker-compose.yml up -d

nohup ./trigger_if_calculation.sh &
