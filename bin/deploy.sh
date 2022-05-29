#!/bin/bash

cd ./server

npm install prisma

npx prisma migrate deploy
