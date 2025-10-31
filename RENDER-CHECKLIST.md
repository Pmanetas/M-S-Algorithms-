# 🚀 Render Deployment Checklist

Quick checklist to deploy M&S Portal to Render.

## Before You Start
- [ ] Code is pushed to GitHub: `https://github.com/Pmanetas/M-S-Algorithms-.git`
- [ ] You have an OpenAI API key ready
- [ ] You have a Render account (sign up at render.com)

## Deployment Steps

### 1. Create Web Service
- [ ] Go to render.com dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect to GitHub repository: **M-S-Algorithms-**
- [ ] Select the repository

### 2. Configure Service
- [ ] **Name**: `ms-associates-portal`
- [ ] **Region**: (select closest)
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `MS-Portal-Website`
- [ ] **Runtime**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `node server.js`
- [ ] **Instance Type**: `Free` (or paid)

### 3. Environment Variables
Add these in the Environment section:

- [ ] `OPENAI_API_KEY` = `your-actual-openai-key`
- [ ] `NODE_ENV` = `production`

### 4. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait 2-5 minutes for deployment
- [ ] Check logs for any errors

### 5. Test Your App
- [ ] Visit your Render URL (e.g., `https://ms-associates-portal.onrender.com`)
- [ ] Test home page loads
- [ ] Test dashboard page
- [ ] Test AI chat functionality
- [ ] Check `/health` endpoint

### 6. Post-Deployment
- [ ] Bookmark your Render URL
- [ ] Monitor OpenAI usage at platform.openai.com
- [ ] Set up custom domain (optional)
- [ ] Upgrade to paid tier if needed (for always-on)

## Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repo**: https://github.com/Pmanetas/M-S-Algorithms-.git
- **OpenAI Dashboard**: https://platform.openai.com
- **Full Guide**: See `RENDER-DEPLOYMENT-GUIDE.md`

## Environment Variables Reference

```
OPENAI_API_KEY=sk-proj-xxxxx...
NODE_ENV=production
```

## Troubleshooting

**Deployment failed?**
- Check build logs in Render dashboard
- Verify environment variables are set
- Review `RENDER-DEPLOYMENT-GUIDE.md`

**AI chat not working?**
- Verify OPENAI_API_KEY is set correctly
- Check OpenAI account has credits
- Review server logs for errors

**App not responding?**
- Wait 30 seconds (free tier cold start)
- Check `/health` endpoint
- Review deployment logs

---

**Need help?** See full guide in `RENDER-DEPLOYMENT-GUIDE.md`

