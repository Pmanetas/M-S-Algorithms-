@echo off
echo ========================================
echo  M^&S Associates - Push to GitHub
echo ========================================
echo.

REM Set the remote repository URL
set REPO_URL=https://github.com/Pmanetas/M-S-Associates-Terminal---Server-.git

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
    git branch -M main
    git remote add origin %REPO_URL%
) else (
    echo Git repository already initialized.
    REM Check if remote exists, if not add it
    git remote get-url origin >nul 2>&1
    if errorlevel 1 (
        echo Adding remote origin...
        git remote add origin %REPO_URL%
    ) else (
        echo Remote origin already exists.
    )
)

echo.
echo Checking git status...
git status
echo.

REM Add all files
echo Adding files to git...
git add .

REM Check if there are changes to commit
git diff-index --quiet HEAD 2>nul
if errorlevel 1 (
    echo.
    set /p commit_message="Enter commit message (or press Enter for default): "
    if "%commit_message%"=="" set commit_message=Update: Push from local development
    
    echo.
    echo Committing changes...
    git commit -m "%commit_message%"
    
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo Push failed. You may need to pull first or resolve conflicts.
        echo Try running: git pull origin main --rebase
        echo Then run this script again.
        pause
        exit /b 1
    )
    
    echo.
    echo ========================================
    echo  Successfully pushed to GitHub!
    echo ========================================
) else (
    echo.
    echo No changes to commit.
    echo.
    echo Would you like to force push anyway? (Y/N)
    set /p force_push=""
    if /i "%force_push%"=="Y" (
        echo Pushing to GitHub...
        git push -u origin main
    ) else (
        echo Skipping push.
    )
)

echo.
pause

