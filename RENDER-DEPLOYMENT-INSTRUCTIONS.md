# 🚀 Deploy Risk Premiums Feature to Render

## Your FRED API Key

```
FRED_API_KEY=1743ac2b39d7613256c1ebb01785c2e2
```

## Quick Deployment Steps

### Step 1: Add FRED Key to Render (2 minutes)

1. Go to **Render Dashboard**: https://dashboard.render.com/
2. Click on your **ms-portal** service
3. Click **"Environment"** in the left sidebar
4. Scroll to **"Environment Variables"**
5. Click **"Add Environment Variable"**
6. Enter:
   - **Key:** `FRED_API_KEY`
   - **Value:** `1743ac2b39d7613256c1ebb01785c2e2`
7. Click **"Save Changes"**

Render will automatically redeploy with the new environment variable.

### Step 2: Push Your Code to GitHub

```bash
# Make sure you're in the project root
cd M-S-Algorithms-

# Check what's changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Add Risk Premiums / Discount Rate feature with FRED API"

# Push to GitHub
git push origin main
```

### Step 3: Wait for Render to Deploy

- Render will automatically detect the push
- Deployment takes 2-3 minutes
- Watch progress in Render dashboard → Logs

### Step 4: Test the Feature

1. Go to your deployed URL (e.g., `https://ms-portal.onrender.com`)
2. Login
3. Navigate: **MARKETS → UNITED STATES → RISK PREMIUMS / DISCOUNT RATE**
4. Wait 5-10 seconds for data to load
5. Click **"GET AI ANALYSIS"** to test AI feature

## Verify It's Working

### ✅ Success Indicators:

- Metric cards show **actual numbers** (not "--")
- Last updated timestamp appears
- No errors in browser console (F12)
- AI Analysis generates recommendations

### ❌ If Data Shows "--":

1. **Check Render Environment Variables:**
   - Dashboard → Your service → Environment
   - Verify `FRED_API_KEY` is listed (value hidden with dots)

2. **Check Render Logs:**
   - Dashboard → Logs tab
   - Look for errors mentioning "FRED"

3. **Force Redeploy:**
   - Dashboard → Manual Deploy button
   - Select "Clear build cache & deploy"

## Environment Variables Checklist

Make sure these are set in Render:

- [x] `FRED_API_KEY` = `1743ac2b39d7613256c1ebb01785c2e2`
- [ ] `OPENAI_API_KEY` = Your OpenAI key (should already be set)
- [x] `NODE_ENV` = `production` (already set)
- [x] `PORT` = `10000` (already set)

## Architecture (Server-Side Only)

```
User Browser
    ↓
    | (uses relative paths: /api/fred/series)
    ↓
Render.com Server (Your Node.js app)
    ↓
    | (server makes actual API call with key)
    ↓
FRED API (fred.stlouisfed.org)
```

**Why this is secure:**
- ✅ API key never sent to browser
- ✅ All requests proxy through your server
- ✅ Key stored in Render environment variables
- ✅ HTTPS by default on Render

## Testing Locally (Optional)

If you want to test before deploying:

1. Create `MS-Portal-Website/.env` file:
```env
FRED_API_KEY=1743ac2b39d7613256c1ebb01785c2e2
OPENAI_API_KEY=your-openai-key-here
PORT=3000
```

2. Run locally:
```bash
cd MS-Portal-Website
node server.js
```

3. Test at: http://localhost:3000

**Note:** `.env` file is in `.gitignore` so it won't be committed.

## What Happens After Push

1. **GitHub receives your code**
2. **Render detects the change** (webhook)
3. **Build starts:**
   - `cd MS-Portal-Website && npm install`
4. **App starts:**
   - `node server.js`
   - Loads `FRED_API_KEY` from environment
5. **Health check passes**
6. **Traffic switches** to new deployment
7. **Old version shuts down**

Total time: ~2-3 minutes

## Files Modified in This Implementation

### Code Files:
- `MS-Portal-Website/server.js` - Added `/api/fred/series` endpoint
- `MS-Portal-Website/menu-page.js` - Added Risk Premiums page (~500 lines)
- `render.yaml` - Added `FRED_API_KEY` environment variable

### Documentation Files:
- `RENDER-RISK-PREMIUMS-SETUP.md` - Full deployment guide
- `IMPLEMENTATION-SUMMARY.md` - Technical details
- `QUICK-START-RISK-PREMIUMS.md` - Quick start guide
- This file - Deployment instructions

## Troubleshooting

### "FRED API key not configured" Error

**Cause:** Server doesn't see the environment variable

**Fix:**
1. Render dashboard → Environment
2. Confirm `FRED_API_KEY` exists
3. If missing, add it
4. Click "Save Changes"
5. Wait for automatic redeploy

### Data Still Shows "--"

**Cause:** Old cached deployment or API issue

**Fix:**
1. Clear browser cache (Ctrl+Shift+R)
2. Click "REFRESH DATA" button on the page
3. Check browser console for errors
4. Verify FRED API is working: https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=1743ac2b39d7613256c1ebb01785c2e2&file_type=json

### Render Deploy Failed

**Check:**
1. Render dashboard → Logs
2. Look for red error messages
3. Common issues:
   - Missing `package.json` dependencies
   - Syntax errors in code
   - Port conflicts

**Fix:** Review error message and fix the issue, then push again

## Cost Summary

### Render
- **Free tier:** Includes 750 hours/month
- **Spin down:** After 15 minutes of inactivity
- **First request:** ~30 seconds wake-up time
- **Cost:** $0

### FRED API
- **Free forever**
- **Limit:** 120 requests/minute
- **Your usage:** ~7 requests per 30 minutes
- **Cost:** $0

### OpenAI API
- **Model:** gpt-4o-mini
- **Per analysis:** ~$0.01
- **With caching:** ~$0.24/day if used every hour
- **Billed to:** Your OpenAI account

## Next Steps After Deployment

1. **Share the URL** with your team
2. **Monitor usage** in Render dashboard
3. **Check OpenAI billing** if using AI analysis frequently
4. **Add custom domain** (optional, in Render settings)

## Support

Having issues? Check these in order:

1. **Render Logs** - Dashboard → Your service → Logs
2. **Browser Console** - F12 → Console tab
3. **Test API Key** - Try the FRED URL above in browser
4. **Documentation** - See `RENDER-RISK-PREMIUMS-SETUP.md`

---

## Quick Reference Commands

```bash
# Deploy to Render
git add .
git commit -m "Update risk premiums feature"
git push origin main

# Test locally first
cd MS-Portal-Website
node server.js

# Check git status
git status

# View Render logs (from dashboard only)
```

## Your Deployment Checklist

- [ ] FRED API key added to Render environment variables
- [ ] Code committed to git
- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] Render deployment succeeded (check dashboard)
- [ ] Can access deployed site
- [ ] Risk Premiums page loads
- [ ] Metric cards show data (not "--")
- [ ] GET AI ANALYSIS button works
- [ ] No errors in browser console

---

**Ready to deploy?** Run the commands in Step 2 above! 🚀

