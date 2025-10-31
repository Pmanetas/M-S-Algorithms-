# M&S Associates - Server Deployment Guide

## Quick Start

### Pushing to GitHub
Simply run:
```batch
push-to-github.bat
```

This will:
1. Initialize git if needed
2. Add your remote repository
3. Stage all changes
4. Commit with a custom message
5. Push to GitHub

### Running on Server

Run the deployment script:
```batch
deploy-server.bat
```

You'll be prompted to choose:
1. **TypeScript Frontend** - Modern Vite-based frontend (recommended)
2. **MS-Portal Website** - Original HTML/JS portal
3. **Both** - Run both servers simultaneously

## Server Endpoints

- **TypeScript Frontend**: http://localhost:4173
- **MS-Portal Website**: http://localhost:3000

## Production Deployment

### On a Windows Server

1. **Clone the repository:**
   ```batch
   git clone https://github.com/Pmanetas/M-S-Associates-Terminal---Server-.git
   cd M-S-Associates-Terminal---Server-
   ```

2. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Recommended: LTS version

3. **Run the deployment script:**
   ```batch
   deploy-server.bat
   ```

### On a Linux Server

If deploying to a Linux server, use these commands:

```bash
# Clone the repository
git clone https://github.com/Pmanetas/M-S-Associates-Terminal---Server-.git
cd M-S-Associates-Terminal---Server-

# For TypeScript Frontend
cd frontend-ts
npm install
npm run build
npm run preview

# For MS-Portal Website
cd MS-Portal-Website
npm install express
node simple-server.js
```

## Environment Configuration

### Port Configuration

To change the default ports, modify:

**TypeScript Frontend (Vite)**
Edit `frontend-ts/vite.config.ts`:
```typescript
export default defineConfig({
  preview: {
    port: 4173,  // Change this
    host: true
  }
})
```

**MS-Portal Website**
Edit `MS-Portal-Website/simple-server.js`:
```javascript
const PORT = 3000;  // Change this
```

## Running as a Windows Service

To run the server continuously on Windows:

1. **Install node-windows:**
   ```batch
   npm install -g node-windows
   ```

2. **Create a service script** (see examples online)

3. **Or use PM2 (recommended):**
   ```batch
   npm install -g pm2
   pm2 start "npm run preview" --name ms-portal-frontend
   pm2 startup
   pm2 save
   ```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```batch
netstat -ano | findstr :4173
taskkill /PID <PID> /F
```

### Dependencies Missing
Run in the respective directory:
```batch
npm install
```

### Git Push Issues
If push fails, try:
```batch
git pull origin main --rebase
git push origin main
```

## Security Notes

1. **Never commit sensitive data** (passwords, API keys)
2. **Use environment variables** for configuration
3. **Enable HTTPS** in production
4. **Configure firewall rules** appropriately
5. **Keep dependencies updated**: `npm audit fix`

## Support

For issues or questions, refer to:
- README.md
- README-TypeScript.md
- MS-Portal-Website/QUICK-START-GUIDE.md

