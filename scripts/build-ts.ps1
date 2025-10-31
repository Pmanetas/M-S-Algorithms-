# MS Portal Production Build Script (TypeScript Frontend + Rust Backend)
Write-Host "Building MS Portal for production..." -ForegroundColor Green

# Clean previous builds
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "Cleaned previous build..." -ForegroundColor Yellow
}

# Install frontend dependencies
Write-Host "Installing TypeScript frontend dependencies..." -ForegroundColor Blue
Set-Location frontend-ts
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install frontend dependencies!" -ForegroundColor Red
    exit 1
}

# Build frontend
Write-Host "Building TypeScript frontend..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend built successfully!" -ForegroundColor Green
} else {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Build backend
Write-Host "Building Rust backend..." -ForegroundColor Blue
Set-Location backend
cargo build --release
Set-Location ..

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend built successfully!" -ForegroundColor Green
    Write-Host "Production build complete!" -ForegroundColor Green
    Write-Host "Frontend files: ./dist/" -ForegroundColor Cyan
    Write-Host "Backend binary: ./backend/target/release/ms-portal-backend.exe" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor White
    Write-Host "To run in production:" -ForegroundColor Yellow
    Write-Host "1. Copy ./dist/ contents to your web server" -ForegroundColor Cyan
    Write-Host "2. Run: ./backend/target/release/ms-portal-backend.exe" -ForegroundColor Cyan
} else {
    Write-Host "Backend build failed!" -ForegroundColor Red
    exit 1
} 