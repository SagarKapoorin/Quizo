# Quizo - Quiz Management System
live link: https://quizoo-it.netlify.app/
## API Documentation
### **Authentication**
- `POST /api/demo/user` → Hardcoded login (`username: test, password: test`)

### **Quiz Management**
- `GET /api/quizzes` → Fetch all quizzes
- `POST /api/quizzes` → Create a new quiz
- `GET /api/quizzes/:id` → Get quiz details
- `PUT /api/quizzes/:id` → Update quiz details
- `DELETE /api/quizzes/:id` → Delete quiz

### **Authorization**
All quiz management routes require a hardcoded **Bearer Token** for authorization i.e.:
```
Authorization: Bearer test
```

## Overview
Quizo is a Quiz Management System designed for teachers to create, manage, and view quizzes. This web application is built using **React (frontend)** and **TypeScript (backend)** with a **PostgreSQL database**. The UI is developed using **ShadCN UI components** for a modern and responsive design.

## Features
- **User Authentication:** Static credentials (hardcoded username/password: `test`).
- **Quiz Management:** Teachers can create, view, update, and delete quizzes.
- **Responsive Design:** Uses ShadCN UI components with Tailwind for a mobile-friendly experience.
- **Authorization:** Bearer token-based authorization (hardcoded).
- **Rate Limiting:** Implemented using Redis.
- **Performance Optimization:** PM2 used for backend clustering.

## Tech Stack
### **Frontend**
- React (with TypeScript)
- ShadCN/UI components
- Tailwind CSS
- React Router DOM
- Custom hook (`useAuth`) for authentication management

### **Backend**
- TypeScript (Node.js, Express.js)
- Prisma ORM
- PostgreSQL (database)
- Redis (for rate-limiting only)
- PM2 (for clustering and process management)

## Project Structure
```
Quizo/
├── frontend/
│   ├── src/
│   │   ├── components/  # UI Components using ShadCN
│   │   ├── hooks/       # Custom hooks (useAuth)
│   │   ├── pages/       # Login & Quiz pages
│   │   ├── App.tsx      # Main app component
│   │   ├── main.tsx     # Entry point
│   ├── .env            # VITE_BACKEND_URL
│   ├── package.json    # Dependencies
│   ├── vite.config.ts  # Vite configuration
│   └── index.html      # HTML entry point
│
├── backend/
│   ├── src/
│   │   ├── middlewares/  # API middlewares
│   │   ├── routes/       # Express routes
│   │   ├── prisma/       # Prisma client
│   │   ├── middleware/   # Authorization & rate-limiting
│   │   ├── server.ts     # Main server file
│   ├── .env             # DATABASE_URL, REDIS_URL
│   ├── package.json     # Dependencies
│   ├── tsconfig.json    # TypeScript configuration
│   └── pm2.config.js    # PM2 configuration
```

## Installation & Setup
### **Frontend**
```sh
cd frontend
npm install
npm run dev
```
Set up **.env** file in `frontend/`:
```env
VITE_BACKEND_URL="http://localhost:3000/api/"
```

### **Backend**
```sh
cd backend
npm install
npm run build
npm run start
```
Set up **.env** file in `backend/`:
```env
DATABASE_URL="your_postgresql_connection_url"
redisUrl="your_redis_connection_url"
```

## Evaluation Criteria
- **Functionality:** Full implementation of login, quiz CRUD operations.
- **Code Quality:** Clean, modular, and well-commented.
- **UI/UX:** User-friendly and responsive.
- **Database & API Design:** Follows RESTful conventions.
- **Time Management:** Completed within **72 hours**.

## Deliverables
- **GitHub Repository:** [Quizo GitHub Repo](https://github.com/SagarKapoorin/Quizo)
- **Setup Instructions:** Included in this README.

---
### **Made by:** Sagar Kapoor
