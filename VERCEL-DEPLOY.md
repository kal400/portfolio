# 🚀 Deploy to Vercel - Simple Guide

## Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 2.2 Import Your Project
1. Click "Add New..." → "Project"
2. Find your repository in the list
3. Click "Import"

### 2.3 Configure Build Settings
Vercel will auto-detect Vite, but verify these settings:

**Root Directory:**
```
portfolio
```

**Framework Preset:**
```
Vite
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### 2.4 Add Environment Variable
Before deploying, add this:

**Key:**
```
VITE_API_URL
```

**Value:**
```
http://localhost:5001/api
```
(We'll update this after deploying the backend)

### 2.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://your-portfolio-xyz.vercel.app`

## Step 3: Deploy Backend to Railway

### 3.1 Sign Up for Railway
1. Go to [railway.app](https://railway.app)
2. Click "Login"
3. Choose "Login with GitHub"
4. Authorize Railway

### 3.2 Create New Project
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your repository
4. Railway will start deploying

### 3.3 Configure Backend
1. Click on your service
2. Go to "Settings"
3. Set **Root Directory** to: `backend`
4. Set **Start Command** to: `npm start`

### 3.4 Add Environment Variables
Click "Variables" tab and add these:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key_here
PORT=5001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 3.5 Get Backend URL
1. Go to "Settings" → "Networking"
2. Copy the public URL (like: `https://your-app.railway.app`)

## Step 4: Update Frontend Environment Variable

### 4.1 Update Vercel Environment Variable
1. Go back to Vercel
2. Go to your project → "Settings" → "Environment Variables"
3. Find `VITE_API_URL`
4. Click "Edit"
5. Change value to: `https://your-app.railway.app/api`
   (Replace with your actual Railway URL)
6. Click "Save"

### 4.2 Redeploy Frontend
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for redeployment

## Step 5: Setup MongoDB Atlas

### 5.1 Create Free Cluster
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a free cluster (M0)
4. Choose a cloud provider and region

### 5.2 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password
5. Set role to "Read and write to any database"
6. Click "Add User"

### 5.3 Whitelist All IPs
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Enter: `0.0.0.0/0`
5. Click "Confirm"

### 5.4 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add `/portfolio` at the end

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio
```

### 5.5 Update Railway Environment Variable
1. Go back to Railway
2. Click "Variables"
3. Update `MONGODB_URI` with your connection string
4. Railway will auto-redeploy

## Step 6: Test Your Deployment

### 6.1 Test Frontend
1. Visit your Vercel URL
2. Check if the page loads
3. Test navigation
4. Test dark/light mode

### 6.2 Test Admin Login
1. Go to: `https://your-vercel-url.vercel.app/secret-admin-login`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. **Change password immediately!**

### 6.3 Test Backend Connection
1. Try adding a project in admin
2. Check if it appears on main page
3. Test contact form
4. Upload an image

## 🎉 You're Live!

Your portfolio is now deployed:
- **Frontend**: `https://your-portfolio.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **Admin**: `https://your-portfolio.vercel.app/secret-admin-login`

## 🔄 Making Updates

### Update Content
1. Login to admin panel
2. Make changes
3. Changes appear immediately

### Update Code
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel and Railway auto-deploy!

## 💰 Cost

- **Vercel**: FREE (for personal projects)
- **Railway**: FREE tier (500 hours/month)
- **MongoDB Atlas**: FREE (512MB storage)

**Total: FREE!** 🎉

## 🆘 Troubleshooting

### Frontend shows but no data
- Check backend is running (visit Railway URL)
- Verify `VITE_API_URL` in Vercel settings
- Check Railway logs for errors

### Can't login to admin
- Check backend is running
- Verify MongoDB connection
- Check browser console for errors

### Images not uploading
- Check Railway logs
- Verify file size (max 5MB)
- Check upload directory permissions

### Contact form not working
- Verify SMTP settings in Railway
- Check Gmail App Password
- Test email credentials

## 📱 Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to project "Settings" → "Domains"
2. Click "Add"
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] MongoDB Atlas configured
- [ ] Environment variables set
- [ ] Frontend can connect to backend
- [ ] Admin login works
- [ ] Can add/edit content
- [ ] Contact form works
- [ ] Images upload successfully
- [ ] Mobile responsive works
- [ ] Changed admin password

## 🎊 Congratulations!

Your portfolio is live and ready to share!

**Next Steps:**
1. Add your content in admin panel
2. Share your URL on LinkedIn
3. Add to your resume
4. Share on social media

---

**Need help?** Check the troubleshooting section or review DEPLOYMENT.md for more details.
