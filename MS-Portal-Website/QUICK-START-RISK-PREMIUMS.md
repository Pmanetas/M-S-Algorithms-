# Quick Start: Risk Premiums / Discount Rate

## 🚀 Get Started in 3 Steps

### Step 1: Get Your API Keys (5 minutes)

#### FRED API Key (FREE)
1. Visit: https://fred.stlouisfed.org/
2. Click "My Account" → "Create Account"
3. After login, go to: https://fredaccount.stlouisfed.org/apikeys
4. Click "Request API Key"
5. Fill form (use "personal" for API key type)
6. **Copy your API key** (looks like: `abc123def456...`)

#### OpenAI API Key
If you already have the chat working, skip this. Otherwise:
1. Visit: https://platform.openai.com/api-keys
2. Sign up / Login
3. Click "Create new secret key"
4. **Copy immediately** (you can't see it again)

### Step 2: Configure Environment (2 minutes)

Create a file called `.env` in the `MS-Portal-Website` folder:

```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
FRED_API_KEY=your-actual-fred-key-here
LOGIN_USERNAME=admin
LOGIN_PASSWORD=terminal
PORT=3000
```

**Important:** Replace the placeholder values with your actual API keys!

### Step 3: Start the Server (1 minute)

```bash
cd MS-Portal-Website
node server.js
```

You should see:
```
🚀 M&S Associates Portal running on port 3000
   Environment: development
   OpenAI API: ✓ Configured
```

## 📊 Access the Feature

1. Open browser: http://localhost:3000
2. Login (admin / terminal)
3. Click **MARKETS**
4. Click **UNITED STATES**
5. Click **RISK PREMIUMS / DISCOUNT RATE**

## 🎯 What You'll See

### Metric Cards (12 total)
- **10-Year Treasury Yield** - Current risk-free rate
- **2-Year Treasury Yield** - Short-term rate
- **Fed Funds Rate** - Central bank policy rate
- **Equity Risk Premium** - Stock return vs bonds
- **Term Premium** - Long vs short rate spread
- **Credit Risk Premium** - Corporate vs Treasury spread
- **High Yield Spread** - Junk bond premium
- **Liquidity Premium** - VIX-based volatility measure
- **Real Yield** - Inflation-adjusted return
- **Estimated Discount Rate** - Cost of equity capital
- **VIX Index** - Market volatility gauge
- **Corporate Bond Yield** - Investment grade rate

### Controls
- **Last updated:** Shows timestamp of last data fetch
- **REFRESH DATA:** Clears cache, reloads all data
- **GET AI ANALYSIS:** Generates market positioning recommendations

## 💡 Using AI Analysis

Click "GET AI ANALYSIS" to receive:
- Current risk premium assessment
- Historical context
- Market valuation implications  
- Specific positioning recommendations (overweight/underweight)
- Key risks to monitor

**Note:** First analysis takes ~5 seconds. Subsequent clicks use 1-hour cache.

## 🔧 Troubleshooting

### "FRED API key not configured"
- Check `.env` file exists in `MS-Portal-Website/`
- Verify `FRED_API_KEY=` line has your actual key
- Restart server: `Ctrl+C` then `node server.js`

### Data shows "--"
- Wait 5-10 seconds for data to load
- Check browser console (F12) for errors
- Verify FRED API key is valid
- Try clicking "REFRESH DATA"

### AI Analysis not working
- Verify `OPENAI_API_KEY` in `.env`
- Check you have credits in OpenAI account
- Check browser console for error messages

### Still having issues?
1. Open browser console (F12 → Console tab)
2. Look for red error messages
3. Check server terminal for error logs
4. Verify both API keys are correctly set

## 📈 Understanding the Metrics

### Color Coding

**Green Values:**
- Equity Risk Premium > 3% (stocks attractive vs bonds)
- VIX < 15 (low volatility, calm markets)

**Red Values:**
- Equity Risk Premium < 1% (stocks expensive vs bonds)
- VIX > 25 (high volatility, stressed markets)

**White Values:**
- Neutral / informational only

### Key Metrics to Watch

**Equity Risk Premium** (most important)
- \> 3%: Stocks attractive
- 2-3%: Fair value
- < 2%: Stocks expensive

**Term Premium** (yield curve)
- Positive: Normal (long > short)
- Negative: Inverted (recession warning)

**High Yield Spread**
- < 3%: Low credit stress
- 3-5%: Moderate stress
- \> 5%: High stress / crisis

**VIX**
- < 15: Complacent
- 15-20: Normal
- 20-30: Elevated fear
- \> 30: Panic

## 💰 Cost

**FRED API:** FREE forever

**OpenAI API (AI Analysis):**
- ~$0.01 per analysis
- With 1-hour caching: ~$0.24/day if used hourly
- Model: gpt-4o-mini (most economical)

## 🔄 Data Freshness

- **FRED data:** Updated daily by Federal Reserve
- **Cache duration:** 30 minutes
- **Manual refresh:** Click "REFRESH DATA" anytime
- **Auto-refresh:** Page reload or navigation back

## 📚 Learn More

- **Full Setup Guide:** `RISK-PREMIUMS-SETUP.md`
- **Implementation Details:** `IMPLEMENTATION-SUMMARY.md`
- **FRED API Docs:** https://fred.stlouisfed.org/docs/api/

## ✅ Success Checklist

- [ ] FRED API key obtained
- [ ] OpenAI API key obtained (if not already)
- [ ] `.env` file created with both keys
- [ ] Server starts without errors
- [ ] Can access login page
- [ ] Can navigate to Risk Premiums page
- [ ] Metric cards load with data (not "--")
- [ ] AI Analysis generates successfully

---

**Need help?** Check `RISK-PREMIUMS-SETUP.md` for detailed troubleshooting.

