# 🔧 Backend Requirements & Checklist

## Overview
This document outlines what needs to be verified/implemented on your backend for the frontend to work correctly.

---

## ✅ Backend Environment Configuration

### `.env` File Should Contain:

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://user:password@cluster.mongodb.net/database_name?ssl=true&replicaSet=...

# JWT
JWT_SECRET_KEY=your_super_secret_key_here_minimum_32_characters_recommended
JWT_EXPIRE=7d

# Cookies
COOKIE_EXPIRE=7

# Frontend CORS
FRONTEND_URL=http://localhost:5173

# Cloudinary (Backend Needs Secret Key!)
CLOUDINARY_CLOUD_NAME=dlirgvu1b
CLOUDINARY_API_KEY=999176212124668
CLOUDINARY_API_SECRET=CHHUPwU6kI-mxeSbDgHIXVGwRb4
```

**❌ DO NOT** put these in frontend `.env`:
- ❌ JWT_SECRET_KEY
- ❌ DB_URL
- ❌ CLOUDINARY_API_SECRET
- ❌ NODE_ENV
- ❌ PORT

---

## 🔐 CORS Configuration

Backend must allow frontend domain:

```javascript
// Example: Express with cors
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,  // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 🛣️ API Endpoints Verification

### 1. **Authentication Endpoints**

#### POST `/api/v1/user/register`
```
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "role": "Job Seeker" | "Employer"
}

Response (200):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Job Seeker"
  },
  "token": "jwt_token_here"
}
```

**Status:** `__________` (Please verify)

---

#### POST `/api/v1/user/login`
```
Request:
{
  "email": "john@example.com",
  "password": "password123",
  "role": "Job Seeker" | "Employer"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "jwt_token_here"
}
```

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/user/logout`
- Protected: ✅ YES (requires auth)
- Response: `{ "success": true, "message": "Logged out" }`

**Status:** `__________` (Please verify)

---

### 2. **User Management Endpoints**

#### GET `/api/v1/user/getuser`
- Protected: ✅ YES
- Returns: Current logged-in user profile

```javascript
// Frontend uses:
import.meta.env.VITE_API_URL + '/user/getuser'
```

**Status:** `__________` (Please verify)

---

#### PUT `/api/v1/user/profile/update`
- Protected: ✅ YES
- Updates user profile (name, email, phone, etc.)

**Status:** `__________` (Please verify)

---

#### PUT `/api/v1/user/avatar/upload`
- Protected: ✅ YES
- Multipart form-data
- Uploads to Cloudinary
- Returns: `{ "success": true, "avatar_url": "..." }`

**Status:** `__________` (Please verify)

---

#### PUT `/api/v1/user/password/update`
- Protected: ✅ YES
- Request: `{ "oldPassword": "...", "newPassword": "..." }`

**Status:** `__________` (Please verify)

---

### 3. **Job Management Endpoints**

#### GET `/api/v1/job/getall`
- Protected: ✅ YES
- Returns: `{ jobs: [...], total: number }`

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/job/:id`
- Protected: ✅ YES
- Returns: `{ job: {...} }`

**Status:** `__________` (Please verify)

---

#### POST `/api/v1/job/post`
- Protected: ✅ YES
- Employer only
- Request: `{ title, description, category, country, city, location, fixedSalary OR salaryFrom/salaryTo }`

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/job/getmyjobs`
- Protected: ✅ YES
- Employer only
- Returns: Jobs posted by this employer

**Status:** `__________` (Please verify)

---

#### PUT `/api/v1/job/update/:id`
- Protected: ✅ YES
- Employer only
- Can only update their own jobs

**Status:** `__________` (Please verify)

---

#### DELETE `/api/v1/job/delete/:id`
- Protected: ✅ YES
- Employer only
- Can only delete their own jobs

**Status:** `__________` (Please verify)

---

### 4. **Application Endpoints**

#### POST `/api/v1/application/post`
- Protected: ✅ YES
- Job Seeker only
- Multipart form-data (resume file)
- Request includes: name, email, phone, address, coverLetter, resume (file), jobId

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/application/jobseeker/getall`
- Protected: ✅ YES
- Job Seeker only
- Returns applications by this job seeker

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/application/jobseeker`
- Protected: ✅ YES
- Job Seeker only
- (Alternative endpoint for getting seeker applications)

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/application/employer/getall`
- Protected: ✅ YES
- Employer only
- Returns applications received for their jobs

**Status:** `__________` (Please verify)

---

#### DELETE `/api/v1/application/delete/:id`
- Protected: ✅ YES
- Can delete own applications

**Status:** `__________` (Please verify)

---

### 5. **Saved Jobs Endpoints**

#### POST `/api/v1/user/saved-jobs/save`
- Protected: ✅ YES
- Request: `{ jobId: "..." }`

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/user/saved-jobs/all`
- Protected: ✅ YES
- Returns list of saved jobs

**Status:** `__________` (Please verify)

---

#### DELETE `/api/v1/user/saved-jobs/:id`
- Protected: ✅ YES
- Unsave a job

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/user/saved-jobs/check/:id`
- Protected: ✅ YES
- Check if job is saved by current user

**Status:** `__________` (Please verify)

---

### 6. **Messaging Endpoints**

#### GET `/api/v1/message/conversations`
- Protected: ✅ YES
- Returns list of conversations

**Status:** `__________` (Please verify)

---

#### GET `/api/v1/message/:userId`
- Protected: ✅ YES
- Get messages with specific user

**Status:** `__________` (Please verify)

---

#### POST `/api/v1/message/send`
- Protected: ✅ YES
- Request: `{ receiverId: "...", content: "..." }`

**Status:** `__________` (Please verify)

---

### 7. **Analytics Endpoints**

#### GET `/api/v1/analytics/jobseeker`
- Protected: ✅ YES
- Returns analytics for job seeker (applications, views, etc.)

**Status:** `__________` (Please verify)

---

## 🔑 Authentication Implementation

### JWT Strategy:

**Option 1: Cookies (More Secure - RECOMMENDED)**
```javascript
// Backend sets:
res.cookie('token', jwtToken, {
  httpOnly: true,      // Not accessible from JS
  secure: true,        // Only HTTPS
  sameSite: 'strict',  // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
});
```

**Option 2: localStorage (Current Frontend Approach)**
```javascript
// Backend returns token in response
// Frontend stores: localStorage.setItem('token', token)
// Frontend sends: Authorization: Bearer token
```

**Current Frontend Setup:** `__________` (Confirm with your backend)

---

## 📤 File Upload (Cloudinary)

### Requirements:

1. ✅ Backend has `CLOUDINARY_API_SECRET` (NOT in frontend)
2. ✅ Backend handles file upload to Cloudinary
3. ✅ Returns image URL to frontend
4. ✅ Frontend never calls Cloudinary directly

**Files that need upload:**
- Resume (application form)
- Avatar (user profile)

**Status:** `__________` (Please verify)

---

## 🔒 Security Checklist

- [ ] CORS properly configured
- [ ] JWT tokens validated on every protected route
- [ ] Passwords hashed (bcrypt or similar)
- [ ] Cloudinary API Secret NOT exposed
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (if using SQL)
- [ ] XSS protection headers set
- [ ] HTTPS in production
- [ ] Environment variables properly configured

---

## 🚀 Testing Checklist

**Test Authentication Flow:**
- [ ] Register new user - works
- [ ] Login with correct credentials - works
- [ ] Login with wrong credentials - fails
- [ ] Logout - works
- [ ] Protected route access without token - fails
- [ ] Protected route access with token - works

**Test Job Flow:**
- [ ] Employer can post job
- [ ] All jobs visible to job seekers
- [ ] Job details load correctly
- [ ] Cannot delete others' jobs

**Test Application Flow:**
- [ ] Job seeker can apply with resume
- [ ] Employer receives application
- [ ] Application can be deleted

**Test File Upload:**
- [ ] Resume upload works
- [ ] Avatar upload works
- [ ] File stored in Cloudinary

---

## 🔄 API Response Format

All endpoints should follow consistent response format:

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* your data */ }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📝 Backend `.env` Template

Copy and customize for your backend:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://user:password@your-cluster.mongodb.net/database_name?ssl=true

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=7d

# Cookie Configuration
COOKIE_EXPIRE=7

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dlirgvu1b
CLOUDINARY_API_KEY=999176212124668
CLOUDINARY_API_SECRET=CHHUPwU6kI-mxeSbDgHIXVGwRb4

# Additional Configuration
SMTP_HOST=smtp.gmail.com  # If using email
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📞 What to Provide to Frontend Team

Once backend is ready, provide:

1. ✅ Backend API URL: `__________________`
2. ✅ API is CORS-enabled: `__YES / __NO`
3. ✅ All endpoints working: `__YES / __NO`
4. ✅ JWT authentication implemented: `__YES / __NO`
5. ✅ File upload working: `__YES / __NO`
6. ✅ Database connected: `__YES / __NO`

---

## ✅ Verification Steps

### Step 1: Check Endpoints Using Postman

1. Create new GET request to `http://localhost:4000/api/v1/job/getall`
2. Send request
3. Should return job list or empty array
4. Status: `__________`

### Step 2: Check Authentication

1. POST to `/api/v1/user/login` with credentials
2. Should return user + token
3. Use token for protected routes
4. Status: `__________`

### Step 3: Check CORS

1. From frontend (`localhost:5173`), make API call
2. Should succeed (not blocked by CORS)
3. Status: `__________`

---

## 🎯 Before Deployment

- [ ] All endpoints tested and working
- [ ] CORS configured
- [ ] JWT validation implemented
- [ ] Database connected
- [ ] Error handling in place
- [ ] Cloudinary integration verified
- [ ] Passwords properly hashed
- [ ] Environment variables set
- [ ] HTTPS ready for production
- [ ] Rate limiting configured
- [ ] Logging implemented

---

## 📌 Important Notes

1. **Never** expose `CLOUDINARY_API_SECRET` to frontend
2. **Always** validate JWT tokens on protected routes
3. **Always** hash passwords before storing
4. **Always** use HTTPS in production
5. **Always** set proper CORS headers
6. **Always** validate user input
7. **Always** implement proper error handling
8. **Never** return sensitive data in error messages

---

**Frontend Ready Date:** May 19, 2026
**Status:** Waiting for backend verification
**Next Step:** Run tests and deploy together
