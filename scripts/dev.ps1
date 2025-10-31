# MS Portal Development Script for Windows
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

if (-not (Test-Command "trunk")) {
    Write-Host "Installing trunk..." -ForegroundColor Yellow
    cargo install trunk
}

# Install wasm target if not present
cargo install wasm-pack
rustup target add wasm32-unknown-unknown

Write-Host "Starting backend server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-Command", "cd backend; cargo run" -WindowStyle Normal

Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Starting frontend development server..." -ForegroundColor Blue
trunk serve --open

Write-Host "Development servers started!" -ForegroundColor Green
Write-Host "Frontend: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "Backend API: http://127.0.0.1:8080/api" -ForegroundColor Cyan 