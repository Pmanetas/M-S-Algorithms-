# M&S Associates Portal - Render Deployment Guide

## 🚀 Quick Deploy to Render

This guide will help you deploy your M&S Portal to Render in minutes.

---

## Prerequisites

1. **GitHub Account** - Your code is already pushed to: `https://github.com/Pmanetas/M-S-Algorithms-.git`
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **OpenAI API Key** - Get one from [platform.openai.com](https://platform.openai.com)

---

## Deployment Steps

### Step 1: Connect GitHub to Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize Render
4. Select your repository: **M-S-Algorithms-**

### Step 2: Configure Web Service

Fill in these settings:

#### Basic Settings
- **Name**: `ms-associates-portal` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `MS-Portal-Website`
- **Runtime**: `Node`

#### Build & Deploy Settings
- **Build Command**: 
  ```bash
  npm install
  ```

- **Start Command**: 
  ```bash
  node server.js
  ```

#### Instance Settings
- **Instance Type**: `Free` (or choose paid for better performance)

### Step 3: Add Environment Variables

Scroll down to **Environment Variables** section and add:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | `your-openai-api-key-here` |
| `NODE_ENV` | `production` |

**Important:** Keep your OpenAI API key secret! Never commit it to GitHub.

### Step 4: Deploy!

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait 2-5 minutes for the initial deployment

### Step 5: Access Your App

Once deployed, Render will provide a URL like:
```
https://ms-associates-portal.onrender.com
```

Visit this URL to access your portal! 🎉

---

## Configuration Options

### Using render.yaml (Alternative Method)

If you prefer automated deployment, Render can use the `render.yaml` file in your repo root:

1. In your Render dashboard, click **"New +"** → **"Blueprint"**
2. Connect to your GitHub repository
3. Render will automatically detect `render.yaml` and configure everything

The `render.yaml` file is already configured with:
- Web service settings
- Environment variable placeholders
- Health check endpoints
- Proper build and start commands

You'll just need to add your `OPENAI_API_KEY` in the Render dashboard.

---

## Environment Variables Explained

### Required Variables

#### `OPENAI_API_KEY`
- **Required**: Yes
- **Description**: Your OpenAI API key for AI chat functionality
- **Get it from**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Example**: `sk-proj-...`

#### `NODE_ENV`
- **Required**: No (defaults to 'development')
- **Description**: Sets the environment mode
- **Value**: `production`

#### `PORT`
- **Required**: No (Render sets this automatically)
- **Description**: Port number for the server
- **Default**: Set by Render (usually 10000)

---

## Health Checks

Your application includes a health check endpoint at `/health`

Test it:
```bash
curl https://your-app.onrender.com/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-31T..."
}
```

---

## Custom Domain (Optional)

Want to use your own domain? 

1. In Render dashboard, go to your service
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain (e.g., `portal.mslabs.com`)
4. Update your DNS records as instructed
5. Render automatically provisions SSL certificate

---

## Monitoring & Logs

### View Logs
1. Go to your service in Render dashboard
2. Click **"Logs"** tab
3. See real-time server logs

### Key Things to Monitor
- OpenAI API usage (check your OpenAI dashboard)
- Server health (`/health` endpoint)
- Response times
- Error rates

---

## Troubleshooting

### Deployment Failed

**Check Build Logs:**
1. Go to **"Events"** tab in Render
2. Click on the failed deployment
3. Review error messages

**Common Issues:**
- Missing `package.json` → Fixed (we created it)
- Missing dependencies → Run `npm install` locally to test
- Environment variables not set → Add them in Settings

### OpenAI API Not Working

**Symptoms:**
- Chat returns errors
- "API key not configured" message

**Solutions:**
1. Check environment variables are set correctly
2. Verify your OpenAI API key is valid
3. Check OpenAI account has credits
4. Review server logs for detailed errors

### App Shows "Service Unavailable"

**Possible Causes:**
- App is starting up (wait 1-2 minutes)
- Free tier spinning down (first request wakes it up)
- Build failed (check logs)

**Solutions:**
- Wait for deployment to complete
- Check health endpoint: `/health`
- Review logs for startup errors

### Free Tier Sleeping

Render free tier spins down after 15 minutes of inactivity.

**Solutions:**
- Upgrade to paid tier ($7/month)
- Use a uptime monitor (like UptimeRobot) to ping your app
- Accept 30-second cold start on first request

---

## Cost Estimation

### Render Costs
- **Free Tier**: $0/month
  - 750 hours/month
  - Spins down after 15 min inactivity
  - Good for testing

- **Starter**: $7/month
  - Always on
  - Better performance
  - Recommended for production

### OpenAI Costs
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Typical chat: ~200-500 tokens
- **Estimate**: $5-20/month depending on usage

**Total Monthly Cost Estimate**: $7-27/month

---

## Security Best Practices

### ✅ Already Implemented
- API key stored as environment variable (not in code)
- Server-side proxy for OpenAI calls
- CORS enabled for security
- Secrets excluded from git

### 📋 Recommended Additional Steps
1. **Set up rate limiting** to prevent API abuse
2. **Add authentication** if portal should be private
3. **Monitor API usage** in OpenAI dashboard
4. **Rotate API keys** periodically
5. **Enable Render's DDoS protection** (in settings)

---

## Updating Your App

### Method 1: Auto-Deploy (Recommended)
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
2. Render automatically detects and deploys changes
3. Wait 2-3 minutes for deployment

### Method 2: Manual Deploy
1. Go to Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Scaling (When You Need More Power)

### Vertical Scaling
Upgrade your instance type:
- Starter: 0.5 GB RAM
- Standard: 2 GB RAM
- Pro: 4 GB RAM

### Horizontal Scaling
For high traffic:
1. Use Render's load balancing
2. Add more instances
3. Consider Redis for session management

---

## Alternative Deployment Options

### Vercel
Good for: Static sites, serverless functions
- Won't work well (we need persistent Node server)

### Heroku
Similar to Render, but:
- More expensive (~$7-25/month)
- Similar setup process
- Good alternative if you prefer it

### AWS/Azure/GCP
For enterprise needs:
- More complex setup
- More control
- Higher costs
- Overkill for this project

**Recommendation**: Stick with Render for simplicity and cost.

---

## Support & Resources

### Render Documentation
- [Web Services Guide](https://render.com/docs/web-services)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Deploy from GitHub](https://render.com/docs/github)

### Your App Resources
- GitHub Repo: `https://github.com/Pmanetas/M-S-Algorithms-.git`
- Local Docs: `DEPLOYMENT-GUIDE.md` (general deployment)
- This Guide: `RENDER-DEPLOYMENT-GUIDE.md`

### Getting Help
- Render Support: support@render.com
- Render Community: community.render.com

---

## Next Steps After Deployment

1. ✅ **Test all features** on your live URL
2. ✅ **Set up custom domain** (optional)
3. ✅ **Monitor logs** for any errors
4. ✅ **Check OpenAI usage** to track costs
5. ✅ **Share URL** with your team/users

---

## Quick Reference Commands

### Local Testing Before Deploy
```bash
cd MS-Portal-Website
npm install
set OPENAI_API_KEY=your-key-here  # Windows
# or
export OPENAI_API_KEY=your-key-here  # Mac/Linux
npm start
```

### Git Commands
```bash
# Push updates
git add .
git commit -m "Your message"
git push origin main

# Check status
git status

# View logs
git log --oneline -5
```

---

## Success Checklist

- [ ] GitHub repository is up to date
- [ ] Render account created
- [ ] Web service created and connected to GitHub
- [ ] Environment variables set (OPENAI_API_KEY)
- [ ] First deployment completed successfully
- [ ] App is accessible via Render URL
- [ ] Health check endpoint working
- [ ] AI chat functionality tested
- [ ] All pages loading correctly

---

**You're all set! Your M&S Portal is now running in the cloud! 🎉**

For questions or issues, review the troubleshooting section or check the logs in your Render dashboard.

