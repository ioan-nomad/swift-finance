@echo off
set SOURCE=C:\Users\ciupe\Desktop\swift-finance
set BACKUP=C:\Users\ciupe\OneDrive\Backups\swift-finance-%date:~-4,4%%date:~-10,2%%date:~-7,2%

echo Creating backup...
xcopy "%SOURCE%" "%BACKUP%" /E /I /H /Y
echo Backup complete: %BACKUP%
pause