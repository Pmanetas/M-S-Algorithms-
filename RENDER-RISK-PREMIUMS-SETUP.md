# Risk Premiums / Discount Rate - Render Deployment Guide

## 🚀 Deploying to Render

Your Risk Premiums feature is **already server-side** and will work perfectly on Render. Follow these steps to enable it on your deployed site.

## Prerequisites

You need two API keys:
1. **FRED API Key** (FREE) - for market data
2. **OpenAI API Key** (may already have) - for AI analysis

## Step 1: Get FRED API Key (5 minutes)

### Register for FRED API

1. Go to https://fred.stlouisfed.org/
2. Click **"My Account"** (top right) → **"Create Account"**
3. Fill out the registration form
4. Verify your email
5. Login to your account

### Request API Key

1. Once logged in, go to: https://fredaccount.stlouisfed.org/apikeys
2. Click **"Request API Key"**
3. Fill out the form:
   - **API Key Name:** "MS Portal" (or anything)
   - **API Key Type:** Select "Personal use"
   - **Purpose:** "Financial risk premium analysis"
4. Click **"Request API key"**
5. **Copy your API key** - it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

Keep this key safe - you'll need it in the next step!

## Step 2: Configure Render Environment Variables

### Add FRED_API_KEY to Render

1. Go to your Render dashboard: https://dashboard.render.com/
2. Find your **ms-portal** service
3. Click on it to open service details
4. Click **"Environment"** in the left sidebar
5. Scroll down to **"Environment Variables"**
6. Click **"Add Environment Variable"**
7. Add:
   - **Key:** `FRED_API_KEY`
   - **Value:** `paste-your-fred-api-key-here`
8. Click **"Save Changes"**

### Verify OpenAI API Key

While you're there, make sure you have:
- **Key:** `OPENAI_API_KEY`
- **Value:** Your OpenAI key (should already be set)

If it's missing, add it the same way.

### Your Environment Variables Should Look Like:

```
NODE_ENV = production
PORT = 10000
OPENAI_API_KEY = sk-proj-your-key-here...
FRED_API_KEY = a1b2c3d4e5f6...
LOGIN_USERNAME = admin (optional)
LOGIN_PASSWORD = terminal (optional)
```

## Step 3: Deploy Changes

### Option A: Automatic Deploy (if auto-deploy enabled)

Simply push your changes:

```bash
git add .
git commit -m "Add Risk Premiums / Discount Rate feature"
git push origin main
```

Render will automatically detect changes and deploy.

### Option B: Manual Deploy

1. In Render dashboard, click your service
2. Click **"Manual Deploy"** button (top right)
3. Select **"Clear build cache & deploy"** if needed
4. Wait for deployment to complete (~2-3 minutes)

### Monitor Deployment

Watch the logs in Render dashboard. You should see:

```
🚀 M&S Associates Portal running on port 10000
   Environment: production
   OpenAI API: ✓ Configured
```

**Note:** The server logs won't show FRED API status unless you add it, but it will work if configured.

## Step 4: Test the Feature

1. Go to your deployed URL (e.g., `https://ms-portal.onrender.com`)
2. Login with your credentials
3. Click **MARKETS**
4. Click **UNITED STATES**
5. Click **RISK PREMIUMS / DISCOUNT RATE**
6. Wait 5-10 seconds for data to load
7. Click **"GET AI ANALYSIS"** to test AI feature

### Expected Behavior

- **Metric cards load** with actual values (not "--")
- **Last updated** shows current time
- **GET AI ANALYSIS** generates recommendations
- **No console errors** (check browser dev tools F12)

## Troubleshooting on Render

### Data Not Loading / Shows "--"

**Check:**
1. Render dashboard → Environment → Verify `FRED_API_KEY` is set
2. Check Render logs for errors
3. Open browser console (F12) - look for API errors
4. Try clicking "REFRESH DATA" button

**Common Issue:** Environment variable not saved
- **Solution:** Re-add the FRED_API_KEY, click Save, then manually deploy

### "FRED API key not configured" Error

This means the server doesn't see the environment variable.

**Solution:**
1. Go to Render dashboard
2. Environment → Add `FRED_API_KEY`
3. Click **"Save Changes"**
4. Wait for auto-redeploy OR click "Manual Deploy"

### AI Analysis Not Working

**Check:**
1. Verify `OPENAI_API_KEY` is set in Render
2. Check OpenAI account has credits/usage available
3. Check Render logs for OpenAI API errors

**Common Issue:** OpenAI rate limits or insufficient credits
- **Solution:** Check your OpenAI account billing

### 500 Server Error

**Check Render Logs:**
1. Render dashboard → Your service
2. Click **"Logs"** tab
3. Look for error messages around the time you accessed the page

**Common causes:**
- Missing environment variable
- Invalid API key format
- Network issues (rare with Render)

## Verify Environment Variables

### Check from Render Dashboard

1. Go to your service
2. Click **"Environment"**
3. You should see both keys listed (values hidden with `•••`)

### Check from Server Logs (Optional Enhancement)

You can add this to `server.js` startup to verify:

```javascript
// Add after line 134 in server.js
console.log(`   FRED API: ${process.env.FRED_API_KEY ? '✓ Configured' : '✗ Not configured'}`);
```

Then commit and push to see it in logs.

## Architecture (Why This Works on Render)

```
User Browser
    ↓
Render Server (Node.js)
    ├─→ /api/fred/series → FRED API
    └─→ /api/chat → OpenAI API
```

**Key Points:**
- ✅ All API calls go through YOUR server
- ✅ API keys never exposed to browser
- ✅ Works on any domain (localhost, Render, custom domain)
- ✅ No CORS issues (same-origin requests)
- ✅ Render handles HTTPS automatically

## Cost on Render

### Render Free Tier
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Unlimited requests when active

### FRED API
- **FREE forever**
- 120 requests/minute limit
- Your app uses ~7 requests per 30 minutes
- **No cost**

### OpenAI API
- ~$0.01 per AI analysis
- With 1-hour caching: ~$0.24/day if used hourly
- Billed to your OpenAI account (not Render)

## Security Best Practices

✅ **API Keys on Server** - Never in frontend code  
✅ **Environment Variables** - Not in git/code  
✅ **HTTPS** - Render provides automatically  
✅ **Proxy Endpoints** - Server validates requests  

## Updating in Production

### To Update the Code

```bash
# Make changes locally
git add .
git commit -m "Update risk premiums feature"
git push origin main
```

Render auto-deploys from main branch.

### To Update Environment Variables

1. Render dashboard → Environment
2. Edit or add variables
3. Click "Save Changes"
4. Render auto-redeploys

### To Force Redeploy

Sometimes needed after environment variable changes:

1. Render dashboard → Your service
2. Click "Manual Deploy" (top right)
3. Select "Clear build cache & deploy"

## Post-Deployment Checklist

- [ ] FRED API key added to Render environment
- [ ] OpenAI API key verified in Render
- [ ] Code pushed to GitHub
- [ ] Render deployment successful (check logs)
- [ ] Can access deployed site
- [ ] Risk Premiums page loads
- [ ] Metric cards show data (not "--")
- [ ] "GET AI ANALYSIS" works
- [ ] No console errors in browser

## Monitoring

### Check Service Health

Render automatically monitors your `/health` endpoint.

**To check manually:**
```bash
curl https://your-app.onrender.com/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-22T..."
}
```

### Check Logs

Render dashboard → Logs tab shows:
- Server startup messages
- API requests
- Errors and warnings
- Performance metrics

## Support

### If Something's Not Working

1. **Check Render Logs First**
   - Dashboard → Logs
   - Look for red error messages
   
2. **Check Browser Console**
   - F12 → Console tab
   - Look for failed API calls
   
3. **Verify API Keys**
   - FRED: Try it at https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=YOUR_KEY&file_type=json
   - OpenAI: Check account at https://platform.openai.com/
   
4. **Test Endpoints Directly**
   ```bash
   # Test FRED endpoint
   curl https://your-app.onrender.com/api/fred/series?series_id=DGS10
   
   # Should return JSON with success: true
   ```

## Success!

Once deployed, your Risk Premiums feature will be available to anyone who accesses your portal at your Render URL. The data is fetched server-side, so it's fast and secure.

---

**Need local testing first?** See `QUICK-START-RISK-PREMIUMS.md` for localhost setup.

**Technical details?** See `IMPLEMENTATION-SUMMARY.md` for architecture info.

