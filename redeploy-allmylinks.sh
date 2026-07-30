#!/bin/bash
set -e
cd /home/telchar/allmylinks
git pull --rebase
npm ci
npm run build
pkill -f start-allmylinks.sh || true
nohup ./start-allmylinks.sh >>/home/telchar/logs/allmylinks.out 2>&1 &
