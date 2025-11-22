# Risk Premiums / Discount Rate Feature - Setup Guide

## Overview

The Risk Premiums / Discount Rate feature provides comprehensive analysis of US market risk metrics, including:

- **Core Risk Premiums**: Equity, term, credit, liquidity premiums
- **Market Rates**: 10Y Treasury, 2Y Treasury, Fed Funds Rate
- **Calculated Metrics**: Real yields, discount rates, VIX
- **AI Analysis**: OpenAI-powered market positioning recommendations

## Prerequisites

### 1. FRED API Key (Required)

The Federal Reserve Economic Data (FRED) API provides free access to economic data.

**Steps to get your API key:**
1. Visit https://fred.stlouisfed.org/
2. Create a free account (top right corner)
3. Go to https://fredaccount.stlouisfed.org/apikeys
4. Click "Request API Key"
5. Fill out the simple form (personal use is fine)
6. Copy your API key

### 2. OpenAI API Key (Required for AI Analysis)

You should already have this configured for the chat feature.

**If not:**
1. Visit https://platform.openai.com/
2. Sign up/login
3. Go to API Keys section
4. Create a new API key
5. Copy it immediately (you won't see it again)

## Installation

### 1. Configure Environment Variables

Create a `.env` file in the `MS-Portal-Website` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your keys:

```env
OPENAI_API_KEY=sk-your-actual-openai-key-here
FRED_API_KEY=your-actual-fred-api-key-here
LOGIN_USERNAME=admin
LOGIN_PASSWORD=terminal
PORT=3000
```

### 2. Install Dependencies (if needed)

```bash
cd MS-Portal-Website
npm install
```

The required packages should already be installed:
- `express`
- `axios`
- `dotenv`
- `cors`

### 3. Start the Server

```bash
npm start
# or
node server.js
```

The server will start on http://localhost:3000

## Usage

### Accessing the Feature

1. Login to the portal
2. Click **MARKETS**
3. Select **UNITED STATES**
4. Click **RISK PREMIUMS / DISCOUNT RATE**

### Features

**Metric Cards:**
- Displays 12+ key risk metrics
- Color-coded values (green = favorable, red = unfavorable)
- Real-time data from FRED
- Hover for descriptions

**Refresh Data Button:**
- Manually refresh all market data
- Clears 30-minute cache
- Fetches latest values from FRED

**Get AI Analysis Button:**
- Generates comprehensive market analysis
- Provides positioning recommendations
- Caches analysis for 1 hour
- Uses all current metrics as context

### Data Caching

The system uses intelligent caching to optimize performance and reduce API calls:

- **FRED data**: Cached for 30 minutes
- **AI analysis**: Cached for 1 hour
- **Storage**: Browser localStorage
- **Manual refresh**: Clears all cached data

## FRED Series Used

The feature fetches the following data series:

| Series ID | Description |
|-----------|-------------|
| DGS10 | 10-Year Treasury Constant Maturity Rate |
| DGS2 | 2-Year Treasury Constant Maturity Rate |
| FEDFUNDS | Federal Funds Effective Rate |
| BAMLC0A0CM | ICE BofA US Corporate Index Effective Yield |
| BAMLH0A0HYM2 | ICE BofA US High Yield Index Option-Adjusted Spread |
| VIXCLS | CBOE Volatility Index: VIX |
| SP500 | S&P 500 Index (for reference) |

## Calculations

### Equity Risk Premium
```
Equity Risk Premium = Earnings Yield - 10Y Treasury Yield
```
- Earnings Yield ≈ 5.2% (estimated typical S&P 500 E/P ratio)
- Shows excess return demanded for equity vs risk-free assets

### Term Premium
```
Term Premium = 10Y Yield - 2Y Yield
```
- Compensation for holding longer-duration securities
- Positive = normal curve, Negative = inverted curve

### Credit Risk Premium
```
Credit Risk Premium = Corporate Bond Yield - 10Y Treasury
```
- Spread between investment-grade corporates and treasuries
- Higher = more credit risk priced in

### Real Yield
```
Real Yield = 10Y Yield - Expected Inflation (2%)
```
- Inflation-adjusted return
- Uses Fed's 2% target as approximation

### Discount Rate
```
Discount Rate = 10Y Yield + Equity Risk Premium
```
- Estimated cost of equity capital
- Used for DCF valuations

## Troubleshooting

### "FRED API key not configured" error

**Solution:** Ensure `.env` file exists with valid `FRED_API_KEY`

```bash
# Check if .env file exists
ls -la .env

# Check server logs
# Should see: "FRED API: ✓ Configured"
```

### No data loading / "--" showing

**Possible causes:**
1. Invalid FRED API key
2. FRED API rate limit reached (free tier allows plenty of requests)
3. Network connectivity issues
4. Data series temporarily unavailable

**Solution:**
- Check browser console for error messages
- Verify API key is correct
- Try refreshing after a few minutes

### AI Analysis not working

**Possible causes:**
1. OpenAI API key not configured
2. API rate limit reached
3. No credits remaining on OpenAI account

**Solution:**
- Verify `OPENAI_API_KEY` in `.env`
- Check OpenAI account usage/credits
- Wait if rate limited

### Cache issues

**Solution:** Click "Refresh Data" button to clear cache and reload

Or manually clear from browser console:
```javascript
localStorage.clear();
location.reload();
```

## API Rate Limits

### FRED API
- **Free tier**: 120 requests per minute
- **Our usage**: ~7 series × 1 request per 30 min = very light
- **Conclusion**: Should never hit limits under normal use

### OpenAI API
- **Depends on your account tier**
- **Our usage**: 1 request per hour (with caching)
- **Model**: gpt-4o-mini (cheapest)
- **Cost**: ~$0.01 per analysis (approximately)

## Architecture

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ AJAX Requests
       ▼
┌─────────────┐      ┌──────────────┐
│   Node.js   │─────▶│   FRED API   │
│   Server    │      └──────────────┘
│  (Proxy)    │
└──────┬──────┘      ┌──────────────┐
       └────────────▶│  OpenAI API  │
                     └──────────────┘
```

**Benefits of proxy architecture:**
- API keys stay secure on server
- Rate limiting can be implemented
- Error handling centralized
- Caching can be server-side if needed

## Future Enhancements

Potential additions:
- Historical charts showing premium trends
- Comparison with other countries
- Email alerts when premiums reach thresholds
- Custom metric calculations
- Export data to CSV
- Integration with portfolio holdings for personalized analysis

## Support

If you encounter issues:
1. Check this documentation
2. Review browser console for errors
3. Check server logs
4. Verify API keys are valid
5. Ensure dependencies are installed

## License

Part of the M&S Associates Portal system.

