@echo off
REM Full Backup Enhanced - Local ZIP + Git Branch + Commit
REM Toate tipurile de backup într-un singur script

echo ========================================
echo FULL BACKUP - Swift Finance
echo ========================================
echo.

cd /d C:\Users\ciupe\Desktop\swift-finance

REM Verifică dacă suntem în repo Git
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Not in a Git repository!
    pause
    exit /b 1
)

REM [1/4] Git commit curent
echo [1/4] Committing current changes...
git add -A
if errorlevel 1 (
    echo ❌ Error adding files to Git!
    pause
    exit /b 1
)

git diff --cached --quiet
if errorlevel 1 (
    git commit -m "backup: auto backup before changes - %date% %time%"
    if errorlevel 1 (
        echo ❌ Error committing changes!
        pause
        exit /b 1
    )
    echo ✓ Changes committed

    git push origin main
    if errorlevel 1 (
        echo ⚠️  Warning: Could not push to GitHub (check connection)
    ) else (
        echo ✓ Pushed to GitHub
    )
) else (
    echo ℹ️  No changes to commit
)

REM [2/4] Git backup branch
echo.
echo [2/4] Creating backup branch...
if exist git-backup.bat (
    call git-backup.bat auto
) else (
    REM Fallback method
    set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
    set TIMESTAMP=%TIMESTAMP: =0%
    git branch backup-auto-%TIMESTAMP%
    git push origin backup-auto-%TIMESTAMP%
    echo ✓ Backup branch created: backup-auto-%TIMESTAMP%
)

REM [3/4] Local ZIP backup
echo.
echo [3/4] Creating local ZIP backup...
set BACKUP_DIR=C:\Users\ciupe\Desktop\swift-finance-backups
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Creating ZIP archive...
powershell -Command "Compress-Archive -Path * -DestinationPath '%BACKUP_DIR%\swift-finance-full-backup-%TIMESTAMP%.zip' -Force"
if errorlevel 1 (
    echo ❌ Error creating ZIP backup!
) else (
    echo ✓ ZIP backup created: swift-finance-full-backup-%TIMESTAMP%.zip
)

REM Cleanup - păstrează ultimele 5 full backups
echo Cleaning old full backups (keeping last 5)...
cd "%BACKUP_DIR%"
for /f "skip=5 delims=" %%i in ('dir /b /o-d swift-finance-full-backup-*.zip 2^>nul') do del "%%i" 2>nul

REM [4/4] Verificare și summary
echo.
echo [4/4] Verification and Summary...
cd /d C:\Users\ciupe\Desktop\swift-finance

echo.
echo 📋 Recent commits:
git log --oneline -3

echo.
echo 🌳 Backup branches:
git branch | findstr backup | head -5

echo.
echo 💾 Recent ZIP backups:
if exist "%BACKUP_DIR%" (
    dir "%BACKUP_DIR%\swift-finance-*.zip" /b /o-d 2>nul | head -3
) else (
    echo No ZIP backups found
)

echo.
echo ========================================
echo ✓ FULL BACKUP COMPLETE
echo ✓ Git: Committed + Branch + Push
echo ✓ Local: ZIP Archive
echo ✓ Location: %BACKUP_DIR%
echo ========================================
echo.
pause