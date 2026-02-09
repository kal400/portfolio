# 🚀 Modern Portfolio Website

A full-stack portfolio website with admin dashboard, built with React, Node.js, Express, and MongoDB.

![Portfolio](https://img.shields.io/badge/Portfolio-Live-success)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive design with dark/light mode
- 📱 **Mobile First** - Fully responsive with hamburger menu
- ⚡ **Fast** - Built with Vite for lightning-fast performance
- 🔐 **Secure** - JWT authentication and protected routes
- 📝 **Blog System** - Create and manage blog posts
- 💬 **Testimonials** - Showcase client reviews
- 📧 **Contact Form** - Email notifications with Nodemailer
- 📊 **Analytics** - Track page views and visitor stats
- 🎯 **SEO Optimized** - Dynamic meta tags and Open Graph
- 📥 **Data Export/Import** - Backup and restore your data
- 🖼️ **Image Upload** - Upload project images and resume
- 🎭 **Animations** - Smooth scroll animations

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS 3
- React Router
- Context API

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Nodemailer (emails)

## 📁 Project Structure

```
portfolio/
├── backend/              # Node.js + Express API
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   └── server.js        # Entry point
├── portfolio/           # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Theme context
│   │   └── services/    # API service
│   └── dist/           # Build output
├── FEATURES.md         # Complete features list
└── DEPLOYMENT.md       # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and settings
# MONGODB_URI=mongodb+srv://...
# JWT_SECRET=your_secret_key
```

### 3. Frontend Setup
```bash
cd ../portfolio
npm install

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:5001/api
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd portfolio
npm run dev
```

### 5. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Admin Panel: http://localhost:5173/secret-admin-login

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these immediately after first login!**

## 📚 Documentation

- **[FEATURES.md](FEATURES.md)** - Complete list of all features
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Step-by-step deployment guide
- **[backend/README.md](backend/README.md)** - API documentation

## 🎨 Admin Dashboard

Access the admin dashboard at `/secret-admin-login` to manage:

1. **Projects** - Add/edit/delete portfolio projects
2. **About** - Update personal info and skills
3. **Testimonials** - Manage client reviews
4. **Blog** - Create and publish blog posts
5. **Messages** - View contact form submissions
6. **Settings** - Configure SEO, upload resume, export/import data

## 🌐 Deployment

### Quick Deploy (Free Options)

**Frontend - Vercel:**
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `portfolio`
4. Add environment variable: `VITE_API_URL`
5. Deploy!

**Backend - Railway:**
1. Connect GitHub repository
2. Set root directory to `backend`
3. Add environment variables
4. Deploy!

**Database - MongoDB Atlas:**
1. Create free cluster
2. Get connection string
3. Add to backend environment variables

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📧 Email Setup

To enable contact form emails:

1. Use Gmail with App Password
2. Enable 2-Step Verification
3. Generate App Password
4. Add to backend `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

## 🔒 Security Features

- JWT token authentication
- Protected admin routes
- Secure file uploads (5MB limit)
- Environment variables for secrets
- CORS configuration
- Input validation
- Hidden admin URL

## 📱 Mobile Responsive

- Hamburger menu for mobile
- Touch-friendly interface
- Responsive grid layouts
- Optimized images
- Mobile-first design

## 🎨 Customization

All content is managed through the admin dashboard:

1. Login to admin panel
2. Update each section:
   - Personal information
   - Projects with images
   - Skills and technologies
   - Testimonials
   - Blog posts
   - SEO settings
3. Upload resume
4. Configure contact information

## 💾 Backup & Restore

Export/Import feature in Settings tab:
- **Export**: Download all data as JSON
- **Import**: Restore from backup
- Includes: projects, blog posts, testimonials, settings

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables
- Check port 5001 is available

### Frontend can't connect to backend
- Verify `VITE_API_URL` in frontend `.env`
- Check backend is running
- Check CORS settings

### Images not uploading
- Check file size (max 5MB)
- Verify `uploads` directory exists
- Check file permissions

## 📊 API Endpoints

### Public
- `GET /api/projects` - Get all projects
- `GET /api/about` - Get about info
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog` - Get published blogs
- `POST /api/contact` - Submit contact form

### Protected (require JWT)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/upload/image` - Upload image
- `POST /api/upload/resume` - Upload resume

See [backend/README.md](backend/README.md) for complete API documentation.

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🎯 What's Next?

1. ✅ Set up your MongoDB database
2. ✅ Configure environment variables
3. ✅ Run the application locally
4. ✅ Login to admin panel
5. ✅ Customize your content
6. ✅ Upload your resume
7. ✅ Add your projects
8. ✅ Deploy to production
9. ✅ Share your portfolio!

## 💡 Tips

- Change admin password immediately
- Backup your data regularly using export feature
- Configure email for contact form
- Add Google Analytics in settings
- Optimize images before uploading
- Test on mobile devices
- Configure custom domain after deployment

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify environment variables
4. Check browser console for errors

## 🌟 Features Highlight

- ✅ Dark/Light mode with persistence
- ✅ Scroll animations
- ✅ SEO optimized
- ✅ Blog system
- ✅ Testimonials
- ✅ Contact form
- ✅ Resume download
- ✅ Admin dashboard
- ✅ Data export/import
- ✅ Analytics
- ✅ Mobile responsive

---

**Built with ❤️ using React, Node.js, and MongoDB**

Ready to showcase your work? Get started now! 🚀
