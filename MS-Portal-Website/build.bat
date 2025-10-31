@echo off
echo Building PRAXIS Portal Desktop Application...
echo.

echo Installing/updating dependencies...
npm install

echo.
echo Building Windows executable...
npm run build-win

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build completed successfully!
    echo.
    echo Executable can be found in the 'dist' folder.
    echo.
) else (
    echo.
    echo ❌ Build failed!
    echo Check the error messages above.
    echo.
)

pause 

rustup toolchain install stable-x86_64-pc-windows-msvc
rustup default stable-x86_64-pc-windows-msvc 