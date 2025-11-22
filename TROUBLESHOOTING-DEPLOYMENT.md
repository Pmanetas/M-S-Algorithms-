# Troubleshooting: Risk Premiums Page Not Loading

## 🔍 Quick Diagnostics

### Check 1: Is FRED API Key in Render?

**Go to:** Render Dashboard → Your Service → Environment

**Look for:** `FRED_API_KEY` in the list

**If NOT there:**
1. Click "Add Environment Variable"
2. Key: `FRED_API_KEY`
3. Value: `1743ac2b39d7613256c1ebb01785c2e2`
4. Click "Save Changes"
5. Wait 3 minutes for redeploy

---

### Check 2: What Does the Page Show?

#### Scenario A: Shows "Loading market data..." Forever
**Problem:** FRED API key missing or invalid

**Fix:**
1. Verify FRED_API_KEY is in Render environment
2. Check Render logs for "FRED API key not configured"
3. Hard refresh browser (Ctrl+Shift+R)

#### Scenario B: All Cards Show "--"
**Problem:** API calls failing

**Fix:**
1. Open browser console (F12 → Console)
2. Look for errors mentioning "fred" or "500"
3. Check Render logs for API errors
4. Verify FRED API key is correct

#### Scenario C: Blank Page / Nothing
**Problem:** JavaScript error or navigation issue

**Fix:**
1. Open browser console (F12)
2. Look for red errors
3. Try navigating: MARKETS → UNITED STATES → RISK PREMIUMS / DISCOUNT RATE
4. Hard refresh (Ctrl+Shift+R)

#### Scenario D: Old Page Still Showing
**Problem:** Browser cache

**Fix:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private window

---

### Check 3: Verify Render Deployment

**Go to:** Render Dashboard → Your Service → Logs

**Look for these messages:**
```
🚀 M&S Associates Portal running on port 10000
   Environment: production
   OpenAI API: ✓ Configured
```

**If you see errors:**
- Red text = something failed
- Look for "FRED" mentions
- Check for "api key" errors

---

### Check 4: Test API Endpoint Directly

Open this URL in your browser (replace with your actual Render URL):

```
https://YOUR-APP.onrender.com/api/fred/series?series_id=DGS10
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "observations": [...]
  }
}
```

**If you see:**
- `"FRED API key not configured"` → Add key to Render
- `500 error` → Check Render logs
- Connection timeout → Service might be spinning down

---

## 🔧 Step-by-Step Fix

### Option 1: Add FRED Key (Most Common Issue)

1. **Render Dashboard:** https://dashboard.render.com/
2. **Click:** Your ms-portal service
3. **Click:** "Environment" (left sidebar)
4. **Scroll:** To "Environment Variables"
5. **Click:** "Add Environment Variable"
6. **Enter:**
   - Key: `FRED_API_KEY`
   - Value: `1743ac2b39d7613256c1ebb01785c2e2`
7. **Click:** "Save Changes"
8. **Wait:** 2-3 minutes for automatic redeploy
9. **Watch:** Logs tab to see restart
10. **Test:** Reload your Risk Premiums page

### Option 2: Clear Browser Cache

1. **Press:** Ctrl+Shift+Delete (Chrome/Edge)
2. **Select:** "Cached images and files"
3. **Time range:** "All time"
4. **Click:** "Clear data"
5. **Reload:** Your page

### Option 3: Force Render Redeploy

1. **Render Dashboard:** Your service
2. **Click:** "Manual Deploy" (top right)
3. **Select:** "Clear build cache & deploy"
4. **Wait:** 3-5 minutes
5. **Check:** Logs for successful startup

---

## 📊 Expected Behavior When Working

### On Page Load:
1. You see "Loading market data from FRED API..."
2. After 3-5 seconds, 14 metric cards appear
3. Cards show actual numbers (like "4.42%" not "--")
4. "Last updated: [time]" shows at top
5. No errors in browser console (F12)

### When Clicking "GET AI ANALYSIS":
1. Button changes to "ANALYZING..."
2. Blue box appears after 3-5 seconds
3. Shows detailed text analysis
4. Button returns to "GET AI ANALYSIS"

---

## 🧪 Test Each Component

### Test 1: Can you reach the page?
**Navigate:** MARKETS → UNITED STATES → RISK PREMIUMS / DISCOUNT RATE

**If NO:** JavaScript navigation issue
**If YES:** Continue to Test 2

### Test 2: Does page render?
**Look for:** Title "RISK PREMIUMS & DISCOUNT RATES" at top

**If NO:** Content rendering issue
**If YES:** Continue to Test 3

### Test 3: Does data load?
**Look for:** Numbers in metric cards (not "--")

**If NO:** API key issue (most common)
**If YES:** Everything working!

### Test 4: Does AI work?
**Click:** "GET AI ANALYSIS" button

**If NO:** OpenAI key issue
**If YES:** Fully functional!

---

## 🔍 Common Error Messages

### Browser Console Errors:

**Error:** `Failed to fetch` or `500 Internal Server Error`
**Meaning:** Server can't reach FRED API
**Fix:** Add FRED_API_KEY to Render

**Error:** `FRED API key not configured on server`
**Meaning:** Environment variable missing
**Fix:** Add FRED_API_KEY to Render (see above)

**Error:** `No valid data found`
**Meaning:** FRED returned no data (rare)
**Fix:** Try different time of day (after 5 PM ET)

### Render Log Errors:

**Error:** `FRED API Error: 400 Bad API key`
**Meaning:** API key is wrong
**Fix:** Verify key is: `1743ac2b39d7613256c1ebb01785c2e2`

**Error:** `Cannot read property 'observations'`
**Meaning:** API response format unexpected
**Fix:** Check FRED API is operational

---

## 📞 Support Checklist

Before asking for help, gather this info:

- [ ] What do you see on the page? (loading/blank/errors/dashes)
- [ ] Screenshot of browser console (F12)
- [ ] Screenshot of Render logs
- [ ] Did you add FRED_API_KEY to Render?
- [ ] What's your Render URL?
- [ ] When did you deploy? (timestamp)
- [ ] Have you tried hard refresh? (Ctrl+Shift+R)

---

## ✅ Success Checklist

You'll know it's working when:

- [ ] Page loads without errors
- [ ] 14 metric cards visible
- [ ] Cards show numbers like "4.42%" (not "--")
- [ ] "Last updated" timestamp shows
- [ ] "GET AI ANALYSIS" generates text
- [ ] No red errors in console (F12)
- [ ] Clicking "REFRESH DATA" reloads successfully

---

## 🎯 Most Common Solutions

**90% of issues:** FRED_API_KEY not in Render environment
**5% of issues:** Browser cache (hard refresh fixes)
**5% of issues:** Render still deploying (wait 3 minutes)

---

## 🔗 Quick Links

- **Render Dashboard:** https://dashboard.render.com/
- **FRED API Test:** https://fred.stlouisfed.org/series/DGS10
- **Your FRED Key:** `1743ac2b39d7613256c1ebb01785c2e2`

---

## 💡 Pro Tips

1. **Wait 5 PM ET:** FRED updates after market close (4 PM ET)
2. **Use Hard Refresh:** Ctrl+Shift+R avoids cache issues
3. **Check Logs First:** Render logs tell you exactly what's wrong
4. **Test API Direct:** Hit /api/fred/series?series_id=DGS10 to isolate issues
5. **Incognito Mode:** Tests without cache/extensions interfering

---

**Still not working?** Share:
1. What you see on the page
2. Screenshot of browser console
3. Screenshot of Render environment variables
4. Your Render URL

I'll help you debug it!

