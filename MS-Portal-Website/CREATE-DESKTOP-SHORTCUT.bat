@echo off
title Create M&S Portal Desktop Shortcut
color 0B
cls

echo.
echo  ═══════════════════════════════════════════════════════════════════════════════
echo                          CREATE DESKTOP SHORTCUT
echo  ═══════════════════════════════════════════════════════════════════════════════
echo.
echo  🖥️  This will create a desktop shortcut for your M&S Portal
echo.
echo  📂  The shortcut will point to: START-MS-PORTAL.bat
echo  🌐  When clicked, it will start the server and open your browser
echo.

REM Get current directory
set "CURRENT_DIR=%~dp0"
set "BATCH_FILE=%CURRENT_DIR%START-MS-PORTAL.bat"

REM Check if the main batch file exists
if not exist "%BATCH_FILE%" (
    echo ❌ ERROR: START-MS-PORTAL.bat not found!
    echo Please make sure this file is in the same folder as START-MS-PORTAL.bat
    echo.
    pause
    exit /b 1
)

REM Get desktop path
for /f "tokens=3*" %%a in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v Desktop 2^>nul') do set "DESKTOP_PATH=%%a %%b"

REM Remove any trailing spaces
for /l %%i in (1,1,5) do if "!DESKTOP_PATH:~-1!"==" " set "DESKTOP_PATH=!DESKTOP_PATH:~0,-1!"

echo  📍  Desktop path: %DESKTOP_PATH%
echo.

REM Create the shortcut using PowerShell
echo  🔧  Creating desktop shortcut...
echo.

powershell -Command ^
"$ws = New-Object -ComObject WScript.Shell; ^
$s = $ws.CreateShortcut('%DESKTOP_PATH%\M&S Portal - Enhanced Server.lnk'); ^
$s.TargetPath = '%BATCH_FILE%'; ^
$s.WorkingDirectory = '%CURRENT_DIR%'; ^
$s.Description = 'M&S Portal Enhanced Server with Live Data Integration'; ^
$s.Save()"

if errorlevel 1 (
    echo ❌ Failed to create shortcut using PowerShell
    echo.
    echo 💡 Manual method:
    echo    1. Right-click on START-MS-PORTAL.bat
    echo    2. Select "Send to" → "Desktop (create shortcut)"
    echo.
) else (
    echo ✅ Success! Desktop shortcut created!
    echo.
    echo 🎉 You can now find "M&S Portal - Enhanced Server" on your desktop
    echo.
    echo 🚀 Double-click the shortcut to start your M&S Portal with:
    echo    • Live Data Integration
    echo    • AI Chat with Current Information
    echo    • Real-time Market Data  
    echo    • All Enhanced Features
    echo.
)

echo  ═══════════════════════════════════════════════════════════════════════════════
echo.
echo  Press any key to close this window...
pause >nul 