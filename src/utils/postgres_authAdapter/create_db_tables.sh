#!/usr/bin/env bash
set -e

echo "Dropping DB adapter-postgres-test..."
dropdb chatdb --if-exists
echo "Creating DB adapter-postgres-test..."
createdb chatdb

echo "Creating tables in example-schema.sql..."
psql -d chatweb3-auth -a -f ./example-schema.sql

echo "Done."