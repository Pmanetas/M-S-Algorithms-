Write-Host "Starting M&S Portal Server..." -ForegroundColor Green
Write-Host ""

# Change to the script's directory
Set-Location $PSScriptRoot

# Start the Node.js server
Write-Host "Server will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:8000" -ForegroundColor Cyan
Write-Host "  http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

node simple-server.js 