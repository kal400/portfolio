# Deployment Guide

This guide will help you deploy your portfolio website to production.

## Prerequisites

- Git installed
- GitHub account
- MongoDB Atlas account (for database)
- Vercel account (for frontend) or Netlify
- Railway/Render account (for backend) or any Node.js hosting

## Part 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add `/portfolio` at the end: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

## Part 2: Backend Deployment (Railway)

### Option A: Railway (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect it's a Node.js app
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key_here
   PORT=5001
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=your-email@gmail.com
   ```
7. Set root directory to `/backend`
8. Deploy!
9. Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: portfolio-backend
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables (same as Railway)
7. Deploy!

## Part 3: Frontend Deployment (Vercel)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `portfolio`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   (Replace with your actual backend URL from Railway/Render)
7. Deploy!

### Alternative: Netlify

1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure:
   - Base directory: `portfolio`
   - Build command: `npm run build`
   - Publish directory: `portfolio/dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
7. Deploy!

## Part 4: Email Configuration (Gmail)

To enable contact form emails:

1. Go to your Google Account settings
2. Security → 2-Step Verification (enable it)
3. Security → App passwords
4. Generate a new app password
5. Use this password in your backend `SMTP_PASS` environment variable

## Part 5: Custom Domain (Optional)

### For Vercel:
1. Go to your project settings
2. Domains → Add domain
3. Follow instructions to configure DNS

### For Railway:
1. Go to your service settings
2. Networking → Custom Domain
3. Add your domain and configure DNS

## Part 6: Post-Deployment Setup

1. Visit your deployed frontend URL
2. Go to `/secret-admin-login`
3. Login with:
   - Username: `admin`
   - Password: `admin123`
4. **IMPORTANT**: Change your admin password immediately!
5. Update your content:
   - Add your projects
   - Update about section
   - Upload your resume
   - Configure SEO settings
   - Add testimonials
   - Write blog posts

## Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_random_secret_key_minimum_32_characters
PORT=5001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## Troubleshooting

### Backend not connecting to database
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for all IPs)
- Verify connection string is correct
- Check environment variables are set

### Frontend can't reach backend
- Verify VITE_API_URL is correct
- Check backend is running (visit backend URL)
- Enable CORS in backend (already configured)

### Contact form not sending emails
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Test SMTP credentials

### Images not uploading
- Check file size (max 5MB)
- Verify upload directory exists
- Check file permissions

## Monitoring

### Railway
- View logs in Railway dashboard
- Monitor resource usage
- Set up alerts

### Vercel
- View deployment logs
- Monitor analytics
- Check function logs

## Backup

Regularly backup your MongoDB database:
1. Go to MongoDB Atlas
2. Clusters → Your Cluster → Backup
3. Enable automated backups

## Security Checklist

- [ ] Changed default admin password
- [ ] MongoDB IP whitelist configured
- [ ] Environment variables set correctly
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] JWT secret is strong and random
- [ ] CORS configured properly
- [ ] File upload limits set
- [ ] Rate limiting enabled (optional)

## Updates

To update your deployed site:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel/Railway will auto-deploy
4. Check deployment logs for errors

## Cost Estimate

- MongoDB Atlas: Free (512MB)
- Railway: Free tier available ($5/month for more resources)
- Vercel: Free for personal projects
- Total: **FREE** for small portfolios!

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

## Next Steps

1. Add Google Analytics (update in admin settings)
2. Set up custom domain
3. Configure email notifications
4. Add more projects and content
5. Share your portfolio!

---

**Congratulations!** Your portfolio is now live! 🎉
