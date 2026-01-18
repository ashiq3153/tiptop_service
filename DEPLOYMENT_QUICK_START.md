# Netlify Deployment - Quick Start Guide

## 🚀 Fast Deployment Steps

### Step 1: Backend Deploy (5 minutes)

**Render.com এ deploy করুন (সবচেয়ে সহজ):**

1. https://render.com → Sign up
2. **New** → **Web Service**
3. **Connect GitHub** → Repository: `ashiq3153/tiptop_service`
4. **Settings:**
   - **Name:** `tiptop-service` (বা আপনার পছন্দমতো)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run prisma:generate && npm run build:server`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     DATABASE_URL=file:./dev.db
     PORT=3000
     ```
5. **Create Web Service**
6. ⏳ Wait 2-3 minutes for deployment
7. ✅ Backend URL copy করুন (যেমন: `https://tiptop-service.onrender.com`)

### Step 2: Netlify Frontend Deploy (2 minutes)

1. https://app.netlify.com → **Add new site** → **Import an existing project**
2. **GitHub** connect করুন → `ashiq3153/tiptop_service` select করুন
3. **Build settings:**
   - **Base directory:** (empty)
   - **Build command:** `cd client && npm install && npm run build`
   - **Publish directory:** `client/dist`
4. **Environment variables** (optional):
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   ```
   (YOUR-BACKEND-URL Step 1 থেকে copy করা URL দিয়ে replace করুন)

5. **Deploy site** → ✅ Done!

### Step 3: Update API URL in Code (If needed)

Frontend code এ API URL hard-code করতে হলে:

`client/src/services/api.ts` এ:
```typescript
const API_BASE_URL = 'https://YOUR-BACKEND-URL.onrender.com/api';
```

## ✅ Done!

Frontend: `https://your-app-name.netlify.app`  
Backend: `https://tiptop-service.onrender.com`

## 🐛 Troubleshooting

**API calls কাজ করছে না?**
- Browser Console (F12) check করুন
- Backend URL সঠিক কিনা verify করুন
- Backend service running আছে কিনা check করুন

**CORS Error?**
- Backend `cors` middleware check করুন (already আছে `src/server.ts` এ)

---

**Full documentation:** `NETLIFY_DEPLOY.md` file দেখুন
