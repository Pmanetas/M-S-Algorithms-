# MS Portal Production Build Script for Windows
Write-Host "Building MS Portal for production..." -ForegroundColor Green

# Clean previous builds
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "Cleaned previous build..." -ForegroundColor Yellow
}

# Build frontend
Write-Host "Building frontend with Trunk..." -ForegroundColor Blue
trunk build --release

if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend built successfully!" -ForegroundColor Green
} else {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Build backend
Write-Host "Building backend..." -ForegroundColor Blue
Set-Location backend
cargo build --release
Set-Location ..

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend built successfully!" -ForegroundColor Green
    Write-Host "Production build complete!" -ForegroundColor Green
    Write-Host "Frontend files: ./dist/" -ForegroundColor Cyan
    Write-Host "Backend binary: ./target/release/ms-portal-backend.exe" -ForegroundColor Cyan
} else {
    Write-Host "Backend build failed!" -ForegroundColor Red
    exit 1
} 