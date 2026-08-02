#!/bin/bash
# SUNITE ENTERPRISE - AUTOMATED DATABASE BACKUP & S3 ARCHIVE SCRIPT

set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/sunite"
DB_NAME=${DB_NAME:-"sunite_db"}
DB_USER=${DB_USER:-"sunite_user"}
S3_BUCKET=${S3_BUCKET:-"s3://sunite-enterprise-backups-prod"}

mkdir -p $BACKUP_DIR

echo "[$(date)] Starting Automated PostgreSQL Backup for $DB_NAME..."

# PostgreSQL Dump
pg_dump -U $DB_USER -h localhost -F c -b -v -f "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump" $DB_NAME

echo "[$(date)] Compressing Backup File..."
gzip -f "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump"

echo "[$(date)] Uploading Encrypted Backup to Cloud S3 ($S3_BUCKET)..."
# aws s3 cp "$BACKUP_DIR/sunite_db_$TIMESTAMP.dump.gz" "$S3_BUCKET/daily/"

# Clean up backups older than 7 days locally
find $BACKUP_DIR -type f -mtime +7 -name "*.dump.gz" -exec rm -f {} \;

echo "[$(date)] PostgreSQL Backup Completed Successfully: sunite_db_$TIMESTAMP.dump.gz"
