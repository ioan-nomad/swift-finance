#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="swift-finance-backup-$TIMESTAMP.zip"
cd ..
zip -r "$BACKUP_NAME" swift-finance -x "*/node_modules/*" "*/.git/*"
echo "Backup created: $BACKUP_NAME"