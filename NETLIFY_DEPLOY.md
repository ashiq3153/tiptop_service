# Netlify Deployment Guide

এই গাইড আপনাকে Netlify-এ loan application deploy করতে সাহায্য করবে।

## ⚠️ Important: Full-Stack App Deployment

এই app-এ **দুইটা অংশ** আছে:
1. **Frontend** (React) - Netlify-এ deploy করা হবে ✅
2. **Backend** (Node.js/Express) - অন্য service-এ deploy করতে হবে (Render, Railway, Heroku, etc.)

## Step 1: Backend Deploy করুন

Frontend deploy করার আগে backend deploy করতে হবে।

### Option A: Render.com (Recommended - Free tier)

1. **Render.com** এ account তৈরি করুন: https://render.com
2. **New Web Service** তৈরি করুন
3. GitHub repository connect করুন: `https://github.com/ashiq3153/tiptop_service`
4. **Settings:**
   - **Build Command:** `npm install && npm run prisma:generate && npm run build:server`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     DATABASE_URL=file:./dev.db
     PORT=3000
     NODE_ENV=production
     ```
5. **Create Web Service** click করুন
6. Backend URL copy করুন (যেমন: `https://tiptop-service.onrender.com`)

### Option B: Railway.app (Free tier available)

1. **Railway.app** এ account তৈরি করুন: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Repository select করুন
4. Railway automatically detect করবে এবং deploy করবে
5. Backend URL copy করুন

## Step 2: Backend URL Update করুন

Backend deploy করার পর, Netlify config-এ backend URL update করুন:

### `netlify.toml` file এ:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-BACKEND-URL.herokuapp.com/api/:splat"
  status = 200
  force = true
```

`YOUR-BACKEND-URL` replace করুন আপনার actual backend URL দিয়ে।

## Step 3: Netlify-এ Deploy করুন

### Method 1: Netlify Dashboard থেকে (Easiest)

1. **Netlify.com** এ login করুন: https://app.netlify.com
2. **Add new site** → **Import an existing project**
3. **GitHub** connect করুন
4. Repository select করুন: `ashiq3153/tiptop_service`
5. **Build settings:**
   - **Base directory:** (leave empty)
   - **Build command:** `cd client && npm install && npm run build`
   - **Publish directory:** `client/dist`
6. **Environment variables** (optional, যদি backend URL static না হয়):
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
7. **Deploy site** click করুন

### Method 2: Netlify CLI দিয়ে

```bash
# Netlify CLI install করুন
npm install -g netlify-cli

# Netlify login করুন
netlify login

# Deploy করুন
netlify deploy --prod
```

## Step 4: Verify Deployment

1. Netlify আপনাকে একটি URL দেবে (যেমন: `https://tiptop-service.netlify.app`)
2. Browser এ visit করুন
3. Loan application create করে test করুন

## Troubleshooting

### API calls কাজ করছে না

1. Browser Console check করুন (F12)
2. CORS error দেখলে, backend `cors` middleware check করুন
3. Network tab এ API calls check করুন
4. Backend URL সঠিকভাবে configured আছে কিনা verify করুন

### Build failed

1. Netlify build logs check করুন
2. `package.json` scripts verify করুন
3. Node version check করুন (Netlify.toml এ 18 set করা আছে)

## Next Steps

- **Custom Domain:** Netlify dashboard থেকে custom domain add করতে পারেন
- **Environment Variables:** Sensitive data (API keys) জন্য Netlify environment variables ব্যবহার করুন
- **Auto Deploy:** Git push করলেই automatically deploy হবে

## Production Checklist

- [ ] Backend deployed এবং running
- [ ] Backend URL Netlify config-এ updated
- [ ] Frontend Netlify-এ deployed
- [ ] API calls working (test করুন)
- [ ] CORS properly configured
- [ ] Environment variables set

---

**Help:** যদি কোনো সমস্যা হয়, Netlify logs check করুন: Site settings → Build & deploy → Deploys
