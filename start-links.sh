#!/bin/bash
set -e
cd /home/telchar/links
export NODE_ENV=production
mkdir -p /home/telchar/logs
exec ./node_modules/.bin/next start -p 3002
