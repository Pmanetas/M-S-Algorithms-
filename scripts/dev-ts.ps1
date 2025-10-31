# MS Portal Development Script (TypeScript Frontend + Rust Backend)
Write-Host "Starting MS Portal Development Environment..." -ForegroundColor Green

# Check if required tools are installed
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

if (-not (Test-Command "cargo")) {
    Write-Host "Error: Rust/Cargo not found. Please install Rust from https://rustup.rs/" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Host "Error: Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "Error: npm not found. Please install Node.js with npm from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "Installing TypeScript frontend dependencies..." -ForegroundColor Blue
Set-Location frontend-ts
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install frontend dependencies!" -ForegroundColor Red
        exit 1
    }
}
Set-Location ..

# Start backend server
Write-Host "Starting Rust backend server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-Command", "cd backend; cargo run" -WindowStyle Normal

Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend development server
Write-Host "Starting TypeScript frontend development server..." -ForegroundColor Blue
Set-Location frontend-ts
npm run dev

Write-Host "Development servers started!" -ForegroundColor Green
Write-Host "Frontend: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "Backend API: http://127.0.0.1:8080/api" -ForegroundColor Cyan
Write-Host "Default credentials: 'manetas & stevens associates' / '123'" -ForegroundColor Yellow 