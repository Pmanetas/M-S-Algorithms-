@echo off
echo ========================================
echo  M^&S Associates - Server Deployment
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check which frontend to run
echo Select which frontend to run:
echo 1. TypeScript Frontend (Vite)
echo 2. MS-Portal Website (Simple Server)
echo 3. Both
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto typescript_only
if "%choice%"=="2" goto portal_only
if "%choice%"=="3" goto both
echo Invalid choice. Exiting.
pause
exit /b 1

:typescript_only
echo.
echo ========================================
echo  Starting TypeScript Frontend (Vite)
echo ========================================
cd frontend-ts

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Building production version...
call npm run build

echo.
echo Starting preview server...
echo The server will be available at http://localhost:4173
echo Press Ctrl+C to stop the server
call npm run preview
goto end

:portal_only
echo.
echo ========================================
echo  Starting MS-Portal Website
echo ========================================
cd MS-Portal-Website

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install express
)

echo.
echo Starting simple server...
echo The server will be available at http://localhost:3000
echo Press Ctrl+C to stop the server
node simple-server.js
goto end

:both
echo.
echo Starting both servers...
echo TypeScript Frontend: http://localhost:4173
echo MS-Portal Website: http://localhost:3000
echo.

REM Start TypeScript frontend in new window
start "TypeScript Frontend" cmd /k "cd frontend-ts && if not exist node_modules npm install && npm run build && npm run preview"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start MS-Portal in current window
cd MS-Portal-Website
if not exist "node_modules" (
    echo Installing dependencies for MS-Portal...
    call npm install express
)
echo.
echo Starting MS-Portal server...
node simple-server.js
goto end

:end
echo.
echo ========================================
echo  Server stopped
echo ========================================
pause

