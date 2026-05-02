# CareLoop Deployment Guide

This guide covers deploying both the React frontend to Netlify and the Node.js backend to Render (or Railway).

---

## Table of Contents
1. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
4. [Environment Variables](#environment-variables)

---

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (free tier available at netlify.com)
- GitHub account with repository access

### Step 1: Connect GitHub to Netlify
1. Visit [Netlify](https://netlify.com) and log in
2. Click "Add new site" → "Import an existing project"
3. Select "GitHub" and authorize Netlify
4. Choose the `dushyanthreddyvk/careloop` repository

### Step 2: Configure Build Settings
1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Node version:** 18 or higher (set in `netlify.toml`)

### Step 3: Set Environment Variables
In Netlify Dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add the following:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://careloop-backend.onrender.com`)

### Step 4: Deploy
- Every push to the `main` branch will trigger automatic deployment
- Netlify will build and deploy the React app

### Live URL
Your frontend will be available at: `https://careloop.netlify.app` (or your custom domain)

---

## Backend Deployment (Render)

### Prerequisites
- Render account (free tier available at render.com)
- GitHub account with repository access
- MongoDB Atlas account with connection string

### Step 1: Connect GitHub to Render
1. Visit [Render](https://render.com) and log in
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select the `careloop` repository
5. Choose the repository and branch (`main`)

### Step 2: Configure Web Service
1. **Name:** `careloop-backend`
2. **Environment:** `Node`
3. **Build command:** `npm install` (Render runs this automatically)
4. **Start command:** `npm start`
5. **Root directory:** `backend/`

### Step 3: Set Environment Variables
In Render Dashboard (Environment):
```
PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/careloop?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CORS_ORIGIN=https://careloop.netlify.app
NODE_ENV=production
```

### Step 4: Deploy
- Select "Free" tier or "Paid" tier based on needs
- Click "Create Web Service"
- Render will automatically build and deploy from your GitHub repo

### Live URL
Your backend will be available at: `https://careloop-backend.onrender.com` (or custom domain)

---

## Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new project named "CareLoop"

### Step 2: Create a Cluster
1. Click "Create" cluster
2. Select M0 (free tier)
3. Choose your preferred region (closest to your users)
4. Click "Create Deployment"

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these)
5. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development
   - **Note:** For production, whitelist specific IP addresses
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Select "Drivers"
3. Copy the connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`
4. Replace `<username>` and `<password>` with your database user credentials
5. Replace `?` with `careloop?` to specify the database name

### Example Connection String
```
mongodb+srv://careloop_user:password123@cluster0.mongodb.net/careloop?retryWrites=true&w=majority
```

---

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=https://careloop-backend.onrender.com
```

### Backend (.env)
```
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/careloop?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
STRIPE_SECRET_KEY=sk_test_your_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
CORS_ORIGIN=https://careloop.netlify.app
```

---

## Post-Deployment Checklist

- [ ] Frontend builds and deploys on Netlify
- [ ] Backend starts successfully on Render
- [ ] MongoDB Atlas cluster is active
- [ ] Frontend can communicate with backend API
- [ ] Environment variables are correctly set on both platforms
- [ ] CORS is configured properly
- [ ] Stripe keys are updated in production environment
- [ ] JWT secret is strong and secure
- [ ] Database backups are configured

---

## Troubleshooting

### Frontend Issues
- **Build fails:** Check Node version (18+), ensure `npm run build` works locally
- **API not responding:** Verify `VITE_API_URL` is correct in Netlify environment
- **CORS errors:** Ensure backend `CORS_ORIGIN` matches frontend URL

### Backend Issues
- **Service won't start:** Check `npm start` works locally, verify all dependencies in `package.json`
- **Database connection fails:** Verify MongoDB connection string, check network access in Atlas
- **Port issues:** Render assigns PORT dynamically; use `process.env.PORT || 5001`

### Database Issues
- **Can't connect:** Verify IP whitelist in MongoDB Atlas includes 0.0.0.0/0
- **Authentication fails:** Double-check username and password in connection string
- **Timeout:** Increase timeout in connection string parameters

---

## Quick Commands

```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
npm install
npm run build
npm run preview

# Push changes to trigger deployment
git add .
git commit -m "Update deployment"
git push origin main
```

---

## Support
For issues, check:
- [Netlify Documentation](https://docs.netlify.com)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
