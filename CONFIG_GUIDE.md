# Configuration & Environment Setup Guide

## Overview
This document explains the new centralized configuration structure for the frontend application.

---

## 📁 Configuration Files

### 1. **`.env`** - Main Environment File
Contains frontend-only environment variables.

```env
# API Configuration
VITE_API_URL=http://localhost:4000/api/v1

# Cloudinary (Public Keys Only)
VITE_CLOUDINARY_CLOUD_NAME=dlirgvu1b
VITE_CLOUDINARY_API_KEY=999176212124668
```

**Important**: 
- Never add backend secrets (JWT, DB_URL, etc.) here
- Never add `CLOUDINARY_API_SECRET` here (backend-only)
- Only variables starting with `VITE_` are exposed to the frontend

---

### 2. **`.env.example`** - Template File
Copy this file and update it with your values. Commit this to git for documentation.

---

### 3. **`.env.local`** - Local Overrides (Git-Ignored)
Use this for machine-specific overrides during development. This file is NOT committed to git.

---

## 📂 Config Files in `src/config/`

### **1. `apiConfig.js`** - API Endpoints
Centralized definition of all API endpoints. Instead of hardcoding URLs everywhere, all endpoints are defined here.

**Usage:**
```javascript
import { API_ENDPOINTS } from '@/config/apiConfig';

// Instead of: axios.get('http://localhost:4000/api/v1/user/login')
// Use:
axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
```

**Available Endpoints:**
- `AUTH`: LOGIN, REGISTER, LOGOUT
- `USER`: GET_PROFILE, UPDATE_PROFILE, UPLOAD_AVATAR, UPDATE_PASSWORD
- `JOBS`: POST_JOB, GET_ALL_JOBS, GET_MY_JOBS, GET_JOB_BY_ID, UPDATE_JOB, DELETE_JOB
- `APPLICATIONS`: POST_APPLICATION, GET_JOBSEEKER_APPLICATIONS, GET_EMPLOYER_APPLICATIONS, DELETE_APPLICATION
- `SAVED_JOBS`: SAVE_JOB, GET_SAVED_JOBS, UNSAVE_JOB, CHECK_SAVED_JOB
- `MESSAGES`: GET_CONVERSATIONS, GET_MESSAGES, SEND_MESSAGE
- `ANALYTICS`: GET_JOBSEEKER_ANALYTICS

---

### **2. `environment.js`** - Environment Utilities
Provides environment-specific settings and logging utilities.

**Features:**
- `ENV.IS_DEVELOPMENT` - Check if running in development
- `ENV.IS_PRODUCTION` - Check if running in production
- `logger` - Logging utilities (only logs in development)
- Feature flags for toggling features

**Usage:**
```javascript
import { ENV, logger } from '@/config/environment';

if (ENV.IS_DEVELOPMENT) {
  logger.log('Debug info', data);
}
```

---

## 🔧 Service Layer

All API calls are now centralized in services:

| Service | Purpose |
|---------|---------|
| `authService.js` | Authentication (login, register, logout) |
| `userService.js` | User profile operations |
| `jobService.js` | Job posting and retrieval |
| `applicationService.js` | Application management |
| `savedJobService.js` | Saved jobs functionality |
| `messageService.js` | Messaging functionality |
| `analyticsService.js` | Analytics data |

**Usage Example:**
```javascript
import jobService from '@/services/jobService';

// Instead of: axios.get('http://localhost:4000/api/v1/job/getall')
// Use:
const jobs = await jobService.getAllJobs();
```

---

## 🚀 How to Use

### **In Components:**
```javascript
// ❌ BEFORE (Hardcoded)
axios.get('http://localhost:4000/api/v1/job/123')

// ✅ AFTER (Using Services)
import jobService from '@/services/jobService';
const job = await jobService.getJobById('123');
```

### **Changing Backend URL:**
Just update `.env`:
```env
# Development
VITE_API_URL=http://localhost:4000/api/v1

# Production
VITE_API_URL=https://api.yourdomain.com/api/v1
```

All API calls will automatically use the new URL!

---

## 🔒 Security Best Practices

### ✅ Safe for Frontend (Public):
- Cloudinary Cloud Name & API Key
- Application ID
- Frontend-only settings

### ❌ NEVER Put in Frontend:
- Database URLs
- JWT Secret Keys
- API Secret Keys
- Cloudinary API Secret
- Backend credentials
- Passwords or tokens

---

## 📝 Backend Configuration

The `.env` file in the **backend** should contain:

```env
# Backend Configuration (Backend Only!)
PORT=4000
NODE_ENV=development

# MongoDB
DB_URL=mongodb://...

# JWT
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=dlirgvu1b
CLOUDINARY_API_KEY=999176212124668
CLOUDINARY_API_SECRET=your_secret_here

# CORS
FRONTEND_URL=http://localhost:5173
```

⚠️ **IMPORTANT**: Backend `.env` is DIFFERENT from frontend `.env`

---

## 🔄 API Base URL Resolution

The API base URL is determined in this order (highest priority first):

1. `VITE_API_URL` in `.env.local` (if exists)
2. `VITE_API_URL` in `.env`
3. Fallback: `http://localhost:4000/api/v1`

---

## 📊 Configuration Structure

```
frontend/
├── .env                          # Main env file (commit to git)
├── .env.example                  # Template (commit to git)
├── .env.local                    # Local overrides (git-ignored)
├── src/
│   ├── config/
│   │   ├── apiConfig.js         # Centralized endpoints
│   │   └── environment.js       # Environment utilities
│   └── services/
│       ├── api.js               # Axios instance
│       ├── authService.js       # Auth endpoints
│       ├── jobService.js        # Job endpoints
│       ├── applicationService.js
│       ├── userService.js
│       ├── messageService.js
│       ├── savedJobService.js
│       └── analyticsService.js
```

---

## 🎯 Common Tasks

### Add a New API Endpoint:

1. **Add to `apiConfig.js`:**
   ```javascript
   NOTIFICATIONS: {
     GET_ALL: `${API_BASE_URL}/notifications/all`,
     MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/read`,
   }
   ```

2. **Create Service (if needed):**
   ```javascript
   // notificationService.js
   import api from "./api";
   import { API_ENDPOINTS } from "@/config/apiConfig";
   
   export const notificationService = {
     getAll: async () => {
       const { data } = await api.get(API_ENDPOINTS.NOTIFICATIONS.GET_ALL);
       return data;
     },
   };
   ```

3. **Use in Component:**
   ```javascript
   import notificationService from '@/services/notificationService';
   const notifications = await notificationService.getAll();
   ```

---

## ✅ Verification Checklist

- [ ] All hardcoded URLs replaced with `apiConfig`
- [ ] Services used instead of direct axios calls
- [ ] `.env` file doesn't contain backend secrets
- [ ] `.env.local` is in `.gitignore`
- [ ] `VITE_CLOUDINARY_API_SECRET` is NOT in frontend env
- [ ] All `VITE_*` variables are accessible via `import.meta.env`
- [ ] Backend and frontend have separate `.env` files

---

## 🚨 Troubleshooting

### API calls returning 404?
- Check `.env` has correct `VITE_API_URL`
- Verify backend is running on correct port
- Check `apiConfig.js` has correct endpoint path

### Variables undefined?
- Must start with `VITE_` prefix to be exposed to frontend
- Use `import.meta.env.VITE_VAR_NAME` to access
- Restart dev server after changing `.env`

### Cloudinary upload failing?
- Verify `VITE_CLOUDINARY_CLOUD_NAME` is correct
- Verify `VITE_CLOUDINARY_API_KEY` is correct
- Check backend has `CLOUDINARY_API_SECRET` (NOT in frontend!)

---

## 📚 References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Axios Documentation](https://axios-http.com/)
- [Best Practices for API Configuration](https://12factor.net/config)
