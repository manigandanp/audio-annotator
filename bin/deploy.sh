#!/bin/bash

# export DATABASE_URL=${DATABASE_URL}

echo "running docker compose build"
# docker-compose build 

echo ${{secrets.DATABASE_URL}}
# docker-compose push 