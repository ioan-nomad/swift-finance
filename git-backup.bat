@echo off
REM Git Backup Enhanced - creează branch backup cu verificări
REM Usage: git-backup.bat [branch-name-suffix]

cd /d C:\Users\ciupe\Desktop\swift-finance
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%

if "%1"=="" (
    set BRANCH_NAME=backup-%TIMESTAMP%
) else (
    set BRANCH_NAME=backup-%1-%TIMESTAMP%
)

echo ========================================
echo Swift Finance - Git Backup Creator
echo ========================================
echo.

REM Verifică dacă suntem în repo Git
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Not in a Git repository!
    pause
    exit /b 1
)

REM Verifică dacă avem uncommitted changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo ⚠️  Warning: You have uncommitted changes!
    echo Do you want to commit them first? (y/n)
    set /p COMMIT_CHOICE=
    if /i "%COMMIT_CHOICE%"=="y" (
        git add .
        git commit -m "Auto-commit before backup creation"
        echo ✓ Changes committed
    )
)

echo Creating Git backup branch: %BRANCH_NAME%
git branch %BRANCH_NAME%
if errorlevel 1 (
    echo ❌ Error creating branch!
    pause
    exit /b 1
)

echo Pushing to GitHub...
git push origin %BRANCH_NAME%
if errorlevel 1 (
    echo ❌ Error pushing to GitHub!
    echo Branch created locally but not pushed.
    pause
    exit /b 1
)

echo.
echo ✓ Git backup created: %BRANCH_NAME%
echo ✓ Pushed to GitHub successfully
echo ✓ Current branch:
git branch --show-current
echo.

REM Afișează ultimele backup branches
echo Recent backup branches:
git branch | findstr backup | sort /r

echo.
pause