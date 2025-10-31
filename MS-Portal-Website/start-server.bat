@echo off
echo Starting M&S Portal Server...
echo.
cd /d "%~dp0"
node simple-server.js
pause 