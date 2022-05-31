#!/bin/bash

sudo DATABASE_URL=$DATABASE_URL docker-compose up -d --force-recreate annotator segmenter
