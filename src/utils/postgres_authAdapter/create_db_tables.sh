#!/usr/bin/env bash
set -e

sudo -u postgres psql

echo "Dropping DB adapter-postgres-test..."
dropdb chatweb3-auth --if-exists
echo "Creating DB adapter-postgres-test..."
createdb chatweb3-auth

echo "Creating tables in example-schema.sql..."
psql -d chatweb3-auth -a -f ./example-schema.sql

echo "Done."