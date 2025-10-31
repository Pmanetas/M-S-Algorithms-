# MS Portal - TypeScript Edition

A modern web portal built with **Actix Web** (Rust backend) and **TypeScript + Vite** (frontend).

## 🏗️ Architecture

### Backend (Actix Web - Rust)
- **Authentication API**: Session-based authentication with secure cookies
- **RESTful endpoints**: `/api/login`, `/api/logout`, `/api/auth`, `/api/health`  
- **Static file serving**: Serves the compiled TypeScript frontend
- **Session management**: Secure session handling with HTTP-only cookies
- **CORS support**: Configured for development and production

### Frontend (TypeScript + Vite)
- **Single Page Application**: Client-side routing with custom TypeScript router
- **Type Safety**: Full TypeScript with strict type checking
- **Modern Build**: Vite for fast development and optimized production builds
- **API Integration**: Axios for HTTP requests with automatic credential handling
- **Component Architecture**: Modular TypeScript classes for maintainable code

## ✨ Features

✅ **Type-Safe Frontend**
- Full TypeScript with strict type checking
- Interface definitions for all API communication
- Compile-time error catching

✅ **Modern Development Experience**
- Hot module replacement with Vite
- Fast builds and instant feedback
- ESNext modules and modern JavaScript features

✅ **Same Beautiful UI**
- Identical visual design to the original
- Smooth login animations and transitions
- Responsive design with modern CSS

✅ **Secure Backend**
- Rust-powered Actix Web server
- Session-based authentication
- HTTP-only secure cookies
- CORS protection

## 🚀 Quick Start

### Prerequisites

1. **Rust**: https://rustup.rs/
2. **Node.js**: https://nodejs.org/ (LTS version recommended)
3. **npm** (comes with Node.js)

### Development Setup

**Option 1: Use the automated script**
```powershell
.\scripts\dev-ts.ps1
```

**Option 2: Manual setup**
```bash
# Terminal 1: Start backend
cd backend
cargo run

# Terminal 2: Start frontend  
cd frontend-ts
npm install
npm run dev
```

This will start:
- **Backend**: `http://127.0.0.1:8080`
- **Frontend**: `http://127.0.0.1:8000` (with API proxy)

### Production Build

```powershell
.\scripts\build-ts.ps1
```

Or manually:
```bash
# Build frontend
cd frontend-ts
npm install
npm run build

# Build backend
cd ../backend
cargo build --release
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Authenticate user |
| POST | `/api/logout` | Logout user |
| GET | `/api/auth` | Check authentication status |
| GET | `/api/health` | Health check |

### Request/Response Examples

**Login Request:**
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

**Login Response:**
```typescript
interface LoginResponse {
  success: boolean;
  message: string;
}
```

## 📁 Project Structure

```
├── backend/                     # Actix Web Rust backend
│   ├── src/
│   │   └── main.rs             # Main server code
│   └── Cargo.toml              # Backend dependencies
├── frontend-ts/                # TypeScript Vite frontend
│   ├── src/
│   │   ├── components/         # UI components (Login, Dashboard)
│   │   │   ├── Login.ts        # Login component
│   │   │   └── Dashboard.ts    # Dashboard component
│   │   ├── api.ts              # API service layer
│   │   ├── router.ts           # Client-side router
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── main.ts             # Application entry point
│   │   └── style.css           # Global styles
│   ├── index.html              # HTML template
│   ├── package.json            # Node.js dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   └── vite.config.ts          # Vite configuration
├── scripts/                    # Build automation
│   ├── dev-ts.ps1             # Development script
│   └── build-ts.ps1           # Production build script
├── dist/                       # Built frontend (generated)
└── Cargo.toml                 # Rust workspace
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main.rs` to modify:
- **Server port**: Change `.bind()` address
- **CORS origins**: Update allowed origins
- **Session settings**: Configure cookie security
- **User credentials**: Update `get_valid_users()` function

### Frontend Configuration  

Edit `frontend-ts/vite.config.ts` for:
- **Development port**: Change `server.port`
- **API proxy**: Update proxy target URL
- **Build settings**: Modify output directory

Edit `frontend-ts/src/api.ts` for:
- **API base URL**: Update for production deployment

## 🛠️ Development Features

### TypeScript Benefits
- **Compile-time type checking**: Catch errors before runtime
- **IntelliSense**: Full IDE support with autocomplete
- **Refactoring safety**: Rename symbols across the codebase
- **API contract enforcement**: Types ensure frontend/backend compatibility

### Development Tools
- **Hot reload**: Instant updates during development
- **Source maps**: Debug TypeScript in the browser
- **Linting**: ESLint integration (can be added)
- **Type checking**: `npm run type-check` for validation

## 🔒 Security Features

- **HTTP-only cookies**: Session cookies not accessible via JavaScript
- **CORS protection**: Configurable cross-origin resource sharing
- **Session validation**: Automatic authentication checks on protected routes
- **Secure routing**: Dashboard route requires valid authentication
- **Input validation**: Both client and server-side validation

## 📊 Performance

- **Fast builds**: Vite's esbuild-powered bundling
- **Code splitting**: Automatic route-based code splitting
- **Tree shaking**: Remove unused code in production
- **Modern JavaScript**: ESNext features for better performance
- **Efficient networking**: Axios with request/response interceptors

## 🌍 Browser Support

- **Chrome 87+**
- **Firefox 78+** 
- **Safari 14+**
- **Edge 88+**

(Supports modern ES2020+ features)

## 🚀 Deployment

### Frontend Deployment
The built frontend (`dist/` folder) is a static site that can be deployed to:
- **Netlify**, **Vercel**, **GitHub Pages**
- **Apache**, **Nginx**, **IIS**
- **AWS S3**, **Azure Static Web Apps**

### Backend Deployment
The Rust binary can be deployed to:
- **Traditional servers**: Linux, Windows, macOS
- **Docker containers**: Build with Dockerfile
- **Cloud platforms**: AWS, Azure, Google Cloud

### Environment Variables
```bash
# Backend
RUST_LOG=info
PORT=8080

# Frontend (build-time)
VITE_API_URL=https://your-api-domain.com
```

## 🔄 Migration Benefits

Compared to the original HTML/CSS/JavaScript version:

| Feature | Original | TypeScript Version |
|---------|----------|-------------------|
| **Type Safety** | ❌ Runtime errors | ✅ Compile-time validation |
| **Maintainability** | 😓 Manual coordination | 😍 Automated type checking |
| **Development Speed** | 🐌 Manual testing | ⚡ Instant feedback |
| **Refactoring** | 😰 Error-prone | 🎯 Safe and automatic |
| **IDE Support** | 🤔 Limited | 💪 Full IntelliSense |
| **Build Process** | 📁 Manual file management | 🔧 Automated pipeline |

## 📚 Learn More

- **TypeScript**: https://www.typescriptlang.org/
- **Vite**: https://vitejs.dev/
- **Actix Web**: https://actix.rs/
- **Axios**: https://axios-http.com/

---

## 🔑 Default Credentials
- **Username**: `manetas & stevens associates`
- **Password**: `123`

## 🌐 Development URLs
- **Frontend**: http://127.0.0.1:8000
- **Backend API**: http://127.0.0.1:8080/api
- **Health Check**: http://127.0.0.1:8080/api/health

---

*This version provides the same beautiful user experience with modern TypeScript development tools and full type safety!* 🎉 