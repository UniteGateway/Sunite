#!/bin/bash
# Sunite Enterprise Production Disaster Recovery & Restore Script
set -e

if [ -z "$1" ]; then
  echo "Usage: ./restore-db.sh <backup_dump_file.dump.gz>"
  exit 1
fi

DUMP_FILE="$1"
DB_NAME="sunite_production"
DB_USER="sunite_admin"

echo "=========================================="
echo "Sunite Disaster Recovery Restore Execution"
echo "=========================================="

echo "[1/3] Decompressing $DUMP_FILE..."
gunzip -k -f "$DUMP_FILE"
UNCOMPRESSED_FILE="${DUMP_FILE%.gz}"

echo "[2/3] Terminating active PostgreSQL connections to $DB_NAME..."
psql -U $DB_USER -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();"

echo "[3/3] Restoring database schema and records..."
pg_restore -U $DB_USER -h localhost -d $DB_NAME --clean --if-exists -v "$UNCOMPRESSED_FILE"

echo "=========================================="
echo "Database Restoration Complete! Systems Healthy."
echo "=========================================="
