# MS Portal - Desktop Application

A cross-platform desktop application built with **Tauri** (Rust backend) and **HTML/CSS/JavaScript** frontend.

## 🚀 Features

- ✅ **Cross-platform**: Works on Windows, Mac, and Linux
- ✅ **Native performance**: Rust backend with web frontend
- ✅ **Secure authentication**: Real backend validation
- ✅ **Small file size**: Much smaller than Electron apps
- ✅ **Same UI**: Identical to your web version

## 🏗️ Architecture

### Backend (Rust/Tauri)
- **Authentication**: Login/logout with session management
- **Cross-platform**: Single codebase for all platforms
- **Secure**: Rust-based backend logic

### Frontend (HTML/CSS/JS)
- **Familiar**: Same UI as your web portal
- **Tauri integration**: Calls Rust functions directly
- **Responsive**: Works on different screen sizes

## 🔧 Prerequisites

1. **Install Rust**: https://rustup.rs/
2. **Install Node.js**: https://nodejs.org/ (for npm)

## 🚀 Development

### Option 1: Using npm (Recommended)
```bash
npm install
npm run tauri:dev
```

### Option 2: Using Tauri CLI directly
```bash
# Install Tauri CLI (if not already installed)
cargo install tauri-cli

# Run in development mode
cargo tauri dev
```

## 📦 Building

### Build for your current platform:
```bash
npm run tauri:build
```

### Build for specific platforms:
```bash
# Windows
cargo tauri build --target x86_64-pc-windows-msvc

# macOS
cargo tauri build --target x86_64-apple-darwin
cargo tauri build --target aarch64-apple-darwin  # Apple Silicon

# Linux
cargo tauri build --target x86_64-unknown-linux-gnu
```

## 📁 Project Structure

```
├── src-tauri/              # Rust backend
│   ├── src/
│   │   └── main.rs        # Main Tauri application
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── dist/                   # Frontend files
│   ├── index.html         # Login page
│   ├── dashboard.html     # Dashboard
│   ├── styles.css         # Styling
│   └── tauri-script.js    # Tauri API integration
├── package.json           # npm configuration
└── README-Desktop.md      # This file
```

## 🔐 Login Credentials

- **Username**: `manetas & stevens associates` / **Password**: `123`
- **Username**: `admin` / **Password**: `admin123`
- **Username**: `user1` / **Password**: `password1`
- **Username**: `user2` / **Password**: `password2`

## 🎯 Distribution

After building, you'll find the executable in:
- **Windows**: `src-tauri/target/release/ms-portal-desktop.exe`
- **macOS**: `src-tauri/target/release/bundle/macos/MS Portal.app`
- **Linux**: `src-tauri/target/release/ms-portal-desktop`

## 🔧 Configuration

Edit `src-tauri/tauri.conf.json` to:
- Change app name, version, or description
- Modify window size and behavior
- Add custom icons
- Configure build settings

## 🐛 Troubleshooting

### Build Issues
- Make sure Rust is installed and up to date
- Ensure you have the correct target installed: `rustup target add <target>`
- For Windows: Install Visual Studio Build Tools with C++ support

### Runtime Issues
- Check browser console for JavaScript errors
- Look at Tauri logs for backend errors
- Ensure all files are in the `dist/` directory

## 🔄 Converting from Web Version

This desktop app reuses your existing:
- ✅ HTML structure (`index.html`, `dashboard.html`)
- ✅ CSS styling (`styles.css`, `dashboard-styles.css`)
- ✅ Authentication logic (converted to Rust)
- ✅ UI/UX design (identical appearance)

The main difference is authentication now runs in Rust instead of JavaScript.

## 📈 Benefits over Web Version

- **No browser required**: Runs as native desktop app
- **Better security**: Backend logic in compiled Rust
- **Offline capable**: No web server needed
- **Native integration**: Can access system APIs
- **Cross-platform**: Same app works everywhere

---

**Ready to build your desktop app? Run `npm run tauri:dev` to get started!** 