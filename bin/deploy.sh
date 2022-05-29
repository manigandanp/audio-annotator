#!/bin/bash

cd ./sever

ls -lrht 

npm install prisma

npx prisma migrate deploy

# # export DATABASE_URL=${DATABASE_URL}

# echo "running docker compose build"
# # docker-compose build 

# echo ${DATABASE_URL}
# # docker-compose push 