# Cleanup Guide - Remove Old Files

## 🗑️ Files You Can Safely Delete

### Test Files (No longer needed)
- `test-final.js`
- `test-search.js`
- `test-specific.js`
- `test-api.js`
- `test-api.html`

### PHP Files (Not used with Node.js server)
- `chat-api.php`
- `secure-chat-api.php`
- `logout.php`
- `check-session.php`
- `secure-login.php`

### Old JavaScript Files (Replaced by enhanced version)
- `dashboard-fully-secure.js`
- `dashboard-secure.js`
- `secure-script.js`
- `force-resize.js`
- `clear-cache.js`

### Old Batch Files (Use new enhanced version)
- `build.bat`
- `install.bat`
- `run.bat`
- `start-server.bat`

### Old HTML Files (Use enhanced version)
- `index-original.html`

### Old Documentation
- `README-Desktop.md`
- `SECURITY-GUIDE.md`
- `README.md`

## 🔧 How to Clean Up

### Option 1: Delete Individual Files
Delete the files listed above one by one

### Option 2: Use PowerShell (Advanced)
```powershell
# Navigate to MS-Portal-Website folder first
cd MS-Portal-Website

# Delete test files
Remove-Item test-*.js, test-*.html

# Delete PHP files
Remove-Item *.php

# Delete old JS files
Remove-Item dashboard-fully-secure.js, dashboard-secure.js, secure-script.js, force-resize.js, clear-cache.js

# Delete old batch files
Remove-Item build.bat, install.bat, run.bat, start-server.bat

# Delete old documentation
Remove-Item README-Desktop.md, SECURITY-GUIDE.md, README.md
```

## ✅ Keep These Files (Required)
- `server.js` - Enhanced server with live data
- `dashboard.js` - Main dashboard functionality
- `dashboard.html` - Main dashboard page
- `menu-page.html` - Menu pages
- `menu-page.js` - Menu functionality
- `dashboard-styles.css` - All styles
- `index.html` - Login page
- `styles.css` - Login styles
- `script.js` - Login functionality
- `main.js` - Core functionality
- `package.json` - Dependencies
- `package-lock.json` - Dependency lock
- `node_modules/` - Required packages
- `assets/` - Images and resources
- `start-enhanced-server.bat` - New start script
- `README-ENHANCED.md` - New documentation

## 🚀 After Cleanup
Your directory will be much cleaner with only the essential files for the enhanced M&S Portal! 