# Portfolio Backend API

Node.js + Express + MongoDB backend for portfolio management.

## Setup

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` if using Atlas or different local setup
   - Change `JWT_SECRET` to a secure random string

4. **Start the server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/about` - Get about information

### Authentication

- `POST /api/auth/register` - Register admin (use once)
  ```json
  {
    "username": "admin",
    "password": "your_password"
  }
  ```

- `POST /api/auth/login` - Login
  ```json
  {
    "username": "admin",
    "password": "your_password"
  }
  ```
  Returns: `{ "token": "...", "username": "admin" }`

### Protected Endpoints (require Bearer token)

**Projects:**
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**About:**
- `POST /api/about` - Create about info
- `PUT /api/about/:id` - Update about info

## Usage

1. **Create admin account:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"yourpassword"}'
   ```

2. **Login to get token:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"yourpassword"}'
   ```

3. **Use token for protected routes:**
   ```bash
   curl -X POST http://localhost:5000/api/projects \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"title":"My Project","description":"...","tech":["React"]}'
   ```

## Next Steps

- Connect frontend to this API
- Build admin dashboard for easy content management
- Add image upload functionality
- Deploy to production
