# MS Portal - Rust WebAssembly Edition

A modern web portal built with **Actix Web** (backend) and **Yew** (frontend compiled to WebAssembly).

## Architecture

### Backend (Actix Web)
- **Authentication API**: Session-based authentication with secure cookies
- **RESTful endpoints**: `/api/login`, `/api/logout`, `/api/auth`, `/api/health`
- **Static file serving**: Serves the compiled WebAssembly frontend
- **Session management**: Secure session handling with configurable cookies

### Frontend (Yew + WebAssembly)
- **Single Page Application**: Client-side routing with `yew-router`
- **WebAssembly**: Compiled Rust code running in the browser
- **Responsive design**: Modern CSS with animations and transitions
- **Authentication state**: Persistent login state management

## Features

✅ **Secure Authentication**
- Session-based authentication with HTTP-only cookies
- Automatic session validation
- Secure logout with session cleanup

✅ **Modern UI/UX**
- Smooth animations and transitions
- Responsive design
- Loading states and error handling
- Beautiful gradient backgrounds

✅ **WebAssembly Performance**
- Fast client-side execution
- Type-safe frontend code
- Minimal JavaScript footprint

## Quick Start

### Prerequisites

1. **Install Rust**: https://rustup.rs/
2. **Install Trunk** (WebAssembly bundler):
   ```bash
   cargo install trunk
   ```
3. **Add WebAssembly target**:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

### Development (Windows)

Run the development script:
```powershell
./scripts/dev.ps1
```

This will:
- Start the backend server on `http://127.0.0.1:8080`
- Start the frontend dev server on `http://127.0.0.1:8000`
- Automatically open your browser

### Manual Development Setup

1. **Start the backend**:
   ```bash
   cd backend
   cargo run
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   trunk serve --open
   ```

### Production Build

Run the build script:
```powershell
./scripts/build.ps1
```

Or manually:
```bash
# Build frontend
trunk build --release

# Build backend
cd backend
cargo build --release
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Authenticate user |
| POST | `/api/logout` | Logout user |  
| GET | `/api/auth` | Check authentication status |
| GET | `/api/health` | Health check |

### Authentication

**Login Request:**
```json
{
  "username": "manetas & stevens associates",
  "password": "123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

## Project Structure

```
├── backend/                 # Actix Web backend
│   ├── src/
│   │   └── main.rs         # Main server code
│   └── Cargo.toml          # Backend dependencies
├── frontend/               # Yew WebAssembly frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   ├── types.rs        # Shared types
│   │   └── lib.rs          # Main app
│   ├── index.html          # HTML template
│   └── Cargo.toml          # Frontend dependencies
├── scripts/                # Build scripts
│   ├── dev.ps1            # Development script
│   └── build.ps1          # Production build script
├── dist/                   # Built frontend (generated)
├── Trunk.toml             # Trunk configuration
└── Cargo.toml             # Workspace configuration
```

## Configuration

### Backend Configuration

The backend runs on `127.0.0.1:8080` by default. You can modify settings in `backend/src/main.rs`:

- **Port**: Change the `.bind()` address
- **CORS**: Update allowed origins for different environments
- **Session cookies**: Configure security settings
- **User credentials**: Update the `get_valid_users()` function

### Frontend Configuration

The frontend connects to the backend API. Update the base URL in `frontend/src/services/auth.rs`:

```rust
pub fn new() -> Self {
    Self {
        base_url: "http://127.0.0.1:8080/api".to_string(),
    }
}
```

## Security Features

- **HTTP-only cookies**: Session cookies are not accessible via JavaScript
- **CORS protection**: Configurable cross-origin resource sharing
- **Session validation**: Automatic authentication checks
- **Secure routing**: Protected dashboard route with auth guards

## Development Features

- **Hot reload**: Frontend automatically rebuilds on file changes
- **Error handling**: Comprehensive error states and user feedback
- **Loading states**: Visual feedback during API calls
- **Type safety**: Full type safety with Rust on both frontend and backend

## Browser Support

WebAssembly is supported in all modern browsers:
- Chrome 57+
- Firefox 52+
- Safari 11+
- Edge 16+

## Performance

- **WebAssembly**: Near-native performance for client-side logic
- **Efficient networking**: Minimal API calls with session persistence
- **Small bundle size**: Optimized WebAssembly builds
- **Fast startup**: Concurrent frontend/backend development

## Migration from Original

This version maintains the same visual design and user experience as the original HTML/CSS/JavaScript version, but with significant architectural improvements:

- **Type safety**: No more runtime errors from JavaScript
- **Better performance**: WebAssembly execution
- **Maintainable code**: Rust's strong type system and error handling
- **Modern architecture**: Separation of concerns with API-based communication

## License

This project is part of the Manetas & Stevens Associates portal system.

---

**Default Credentials:**
- Username: `manetas & stevens associates`
- Password: `123`

**Development URLs:**
- Frontend: http://127.0.0.1:8000
- Backend API: http://127.0.0.1:8080/api 