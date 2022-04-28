#!/bin/bash
PROJECT_NAME="eindwerk-fe"
DOCKER_PATH="/home/wouter/lokalhost/projects/eindwerk-fe/docker/local"
IN_DOCKER_PATH="/app"

alias dnode="cd $DOCKER_PATH && docker-compose run --rm node"
alias dyarn="cd $DOCKER_PATH && docker-compose run --rm node yarn"
alias dserve="cd $DOCKER_PATH && docker-compose run --rm node yarn serve"

echo "available aliases:dnode, dyarn, dserve"