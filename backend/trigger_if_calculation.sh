#!/bin/sh

inotifywait -e modify $BASE_DIR/$APP_NAME | while read EVENT; 
do

  APP_NAME=$APP_NAME docker compose -f admin/docker-compose.yml exec -T if_plugin python main.py
done