#!/bin/bash
# Sunite Enterprise Production PostgreSQL & Redis Backup Script
set -e

BACKUP_DIR="/var/backups/sunite"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="sunite_production"
DB_USER="sunite_admin"
S3_BUCKET="s3://sunite-production-backups-ap-south-1"

mkdir -p $BACKUP_DIR

echo "=========================================="
echo "Starting Sunite Production Backup: $TIMESTAMP"
echo "=========================================="

# 1. PostgreSQL Database Dump
echo "[1/3] Dumping PostgreSQL Database ($DB_NAME)..."
pg_dump -U $DB_USER -h localhost -F c -b -v -f "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump" $DB_NAME
gzip -f "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump"

# 2. Redis RDB Backup
echo "[2/3] Snapshotting Redis Cache Data..."
redis-cli -h localhost BGSAVE
cp /var/lib/redis/dump.rdb "$BACKUP_DIR/sunite_redis_$TIMESTAMP.rdb"

# 3. AWS S3 Storage Upload & Cleanup
echo "[3/3] Uploading Backups to AWS S3 ($S3_BUCKET)..."
aws s3 cp "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump.gz" "$S3_BUCKET/postgres/"
aws s3 cp "$BACKUP_DIR/sunite_redis_$TIMESTAMP.rdb" "$S3_BUCKET/redis/"

# Remove backups older than 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "=========================================="
echo "Backup Completed Successfully at $(date)"
echo "=========================================="
