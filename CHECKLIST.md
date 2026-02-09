# 📋 Portfolio Setup Checklist

Use this checklist to set up and deploy your portfolio website.

## ✅ Initial Setup

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Create MongoDB Atlas account (free)
- [ ] Get MongoDB connection string
- [ ] Update `MONGODB_URI` in `.env`
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Update `JWT_SECRET` in `.env`
- [ ] Run `npm run dev` to start backend
- [ ] Verify backend runs on http://localhost:5001

### Frontend Setup
- [ ] Navigate to `portfolio` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update `VITE_API_URL=http://localhost:5001/api`
- [ ] Run `npm run dev` to start frontend
- [ ] Verify frontend runs on http://localhost:5173

### First Login
- [ ] Go to http://localhost:5173/secret-admin-login
- [ ] Login with username: `admin`, password: `admin123`
- [ ] **IMPORTANT**: Change admin password immediately!

## 🎨 Content Customization

### About Section
- [ ] Update your name
- [ ] Update your title/role
- [ ] Write your bio (2-3 paragraphs)
- [ ] Add your skills
- [ ] Add social media links (GitHub, LinkedIn, Twitter)
- [ ] Add email address

### Projects
- [ ] Add at least 3 projects
- [ ] Upload project images
- [ ] Add tech stack for each
- [ ] Add GitHub links
- [ ] Add live demo links (if available)
- [ ] Order projects by importance

### Testimonials
- [ ] Add client testimonials (optional)
- [ ] Include star ratings
- [ ] Add company and role info
- [ ] Order by preference

### Blog
- [ ] Write your first blog post (optional)
- [ ] Add cover image
- [ ] Add relevant tags
- [ ] Publish when ready

### Settings
- [ ] Upload your resume (PDF)
- [ ] Configure SEO title
- [ ] Write SEO description
- [ ] Add SEO keywords
- [ ] Add contact email
- [ ] Add phone number (optional)
- [ ] Add address (optional)

## 📧 Email Configuration

- [ ] Go to Google Account settings
- [ ] Enable 2-Step Verification
- [ ] Generate App Password
- [ ] Update backend `.env`:
  - [ ] `SMTP_HOST=smtp.gmail.com`
  - [ ] `SMTP_PORT=587`
  - [ ] `SMTP_USER=your-email@gmail.com`
  - [ ] `SMTP_PASS=your-app-password`
  - [ ] `ADMIN_EMAIL=your-email@gmail.com`
- [ ] Restart backend
- [ ] Test contact form

## 🚀 Deployment

### MongoDB Atlas
- [ ] Create free cluster
- [ ] Add database user
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Save for deployment

### Backend Deployment (Railway)
- [ ] Create Railway account
- [ ] Connect GitHub repository
- [ ] Create new project
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `PORT=5001`
  - [ ] `SMTP_HOST`
  - [ ] `SMTP_PORT`
  - [ ] `SMTP_USER`
  - [ ] `SMTP_PASS`
  - [ ] `ADMIN_EMAIL`
- [ ] Deploy
- [ ] Copy backend URL

### Frontend Deployment (Vercel)
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory to `portfolio`
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL=https://your-backend.railway.app/api`
- [ ] Deploy
- [ ] Copy frontend URL

## 🧪 Testing

### Local Testing
- [ ] Test all navigation links
- [ ] Test dark/light mode toggle
- [ ] Test mobile menu
- [ ] Test contact form
- [ ] Test resume download
- [ ] Test scroll animations
- [ ] Test on mobile device

### Production Testing
- [ ] Visit deployed frontend URL
- [ ] Test all features
- [ ] Login to admin panel
- [ ] Verify all content displays
- [ ] Test contact form (send test message)
- [ ] Check email notifications
- [ ] Test on different devices
- [ ] Test on different browsers

## 🔒 Security

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Keep `.env` files private
- [ ] Don't commit `.env` to Git
- [ ] Use HTTPS in production
- [ ] Whitelist MongoDB IPs properly
- [ ] Keep dependencies updated

## 📊 Analytics (Optional)

- [ ] Set up Google Analytics
- [ ] Add tracking ID in settings
- [ ] Verify tracking works

## 🎯 Final Steps

- [ ] Export data backup (Settings tab)
- [ ] Save backup file safely
- [ ] Test data import (optional)
- [ ] Share portfolio URL
- [ ] Add to resume/CV
- [ ] Share on social media
- [ ] Add to LinkedIn profile

## 📱 Custom Domain (Optional)

### Vercel
- [ ] Purchase domain
- [ ] Go to Vercel project settings
- [ ] Add custom domain
- [ ] Configure DNS records
- [ ] Wait for SSL certificate

### Railway
- [ ] Go to Railway service settings
- [ ] Add custom domain
- [ ] Configure DNS records
- [ ] Update frontend `VITE_API_URL`

## 🔄 Maintenance

### Regular Tasks
- [ ] Update content regularly
- [ ] Add new projects
- [ ] Write blog posts
- [ ] Respond to messages
- [ ] Export data backups monthly
- [ ] Update dependencies quarterly
- [ ] Monitor analytics

### When Adding Content
- [ ] Login to admin panel
- [ ] Add/update content
- [ ] Verify changes on live site
- [ ] Export backup after major changes

## 📚 Resources

- **Documentation**: See README.md, FEATURES.md, DEPLOYMENT.md
- **Admin Panel**: /secret-admin-login
- **API Docs**: backend/README.md
- **Support**: Check troubleshooting sections

## ✨ Tips

1. **Content First**: Add all your content before deploying
2. **Test Locally**: Make sure everything works locally first
3. **Backup Data**: Export data before making major changes
4. **Mobile Test**: Always test on mobile devices
5. **SEO**: Configure SEO settings for better visibility
6. **Images**: Optimize images before uploading (max 5MB)
7. **Resume**: Keep resume updated
8. **Blog**: Regular blog posts improve SEO
9. **Testimonials**: Add real testimonials for credibility
10. **Analytics**: Monitor visitor stats regularly

## 🎊 You're Done!

Once all items are checked, your portfolio is:
- ✅ Fully functional
- ✅ Deployed to production
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Ready to share

**Congratulations on your new portfolio!** 🚀

---

**Need Help?**
- Check DEPLOYMENT.md for detailed deployment steps
- Review FEATURES.md for feature documentation
- See README.md for project overview
- Check troubleshooting sections in docs
