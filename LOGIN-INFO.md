# 🔐 Login Information

## Default Login Credentials

After deploying to Render, use these credentials to access your portal:

### Default Credentials
- **Username (Key)**: `admin`
- **Password**: `terminal`

---

## Change Your Login Credentials

For better security, you should change these defaults!

### On Render Dashboard:

1. Go to your Web Service
2. Click **"Environment"** tab
3. Add these environment variables:

```
LOGIN_USERNAME = your-custom-username
LOGIN_PASSWORD = your-custom-password
```

4. Click **"Save Changes"**
5. Your app will automatically redeploy with new credentials

---

## Testing Locally

If you want to test locally before deploying:

```bash
cd MS-Portal-Website
npm install

# Windows
set LOGIN_USERNAME=admin
set LOGIN_PASSWORD=terminal
set OPENAI_API_KEY=your-key-here
npm start

# Mac/Linux
export LOGIN_USERNAME=admin
export LOGIN_PASSWORD=terminal
export OPENAI_API_KEY=your-key-here
npm start
```

Then visit: http://localhost:3000

---

## Login Flow

1. Open your deployed app URL
2. You'll see the login page with:
   - **Key** field (enter username)
   - **Password** field (enter password)
3. Click **"Login"**
4. Watch the cool animation: 
   - "m&s" → "Manetas & Stevens"
   - "associates"
   - "terminal" (in neon green)
5. Dashboard loads!

---

## Security Notes

### ⚠️ Important
The default credentials (`admin` / `terminal`) are **NOT SECURE** for production use!

### ✅ Best Practices
1. **Change credentials** via environment variables on Render
2. **Use strong passwords** (12+ characters, mix of letters/numbers/symbols)
3. **Don't share** credentials publicly
4. **Consider adding** proper authentication later (OAuth, JWT, etc.)

### 🔒 Current Security
- Credentials stored as environment variables (not in code)
- Password field masked in browser
- Server-side validation
- No password stored in browser/cookies

---

## Troubleshooting

### "Invalid username or password"
- Check you're using correct credentials
- Default: `admin` / `terminal`
- If you changed them in Render, use your custom values

### Login button doesn't work
- Check browser console for errors (F12)
- Verify server is running
- Check `/health` endpoint works

### Can't remember custom credentials
- Go to Render dashboard → Environment tab
- View your `LOGIN_USERNAME` and `LOGIN_PASSWORD` values
- Or set new ones

---

## For Developers

### How It Works

**Frontend** (`script.js`):
```javascript
// Sends credentials to server
POST /api/login
{
  "username": "admin",
  "password": "terminal"
}
```

**Backend** (`server.js`):
```javascript
// Validates credentials
const VALID_USERNAME = process.env.LOGIN_USERNAME || 'admin';
const VALID_PASSWORD = process.env.LOGIN_PASSWORD || 'terminal';
```

### Adding More Security

Want to add more security? Consider:
- **JWT tokens** for session management
- **Rate limiting** to prevent brute force
- **Password hashing** with bcrypt
- **2FA** (two-factor authentication)
- **OAuth** (Google, Microsoft login)
- **IP whitelisting**

---

## Quick Reference

| Field | Default Value | Can Change? |
|-------|---------------|-------------|
| Username | `admin` | ✅ Yes (via LOGIN_USERNAME) |
| Password | `terminal` | ✅ Yes (via LOGIN_PASSWORD) |

**Remember**: After changing environment variables on Render, your app will automatically redeploy!

