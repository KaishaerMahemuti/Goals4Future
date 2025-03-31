# 🌱 Goals4Future

**Goals4Future** is a full-stack web application designed to help individuals and teams track personal and professional goals, monitor progress, and stay accountable. Built with a modern web stack, it offers separate interfaces for regular users and admin users, with secure login and role-based access control.

## 🚀 Live Demo

🌐 [Check out the live app here](https://goals4-future.vercel.app)

> 🧑‍💻 Log in as a regular user to track goals  
> 🔐 Log in as an admin to view all user goals across the platform

---

## 📸 Demo Video

📹 [Watch the demo video on YouTube](https://www.youtube.com/watch?v=5IukOnyWNP0&ab_channel=kaishaer-full-stack)

---

## ✨ Features

- 📝 **Create & Track Goals** — Add goals with priority levels and deadlines
- 🔁 **Progress Updates** — Update the status of each goal (e.g. pending, met, in progress)
- 🔒 **User Authentication** — Secure login with JWT-based token management
- 🧑‍💼 **Admin Dashboard** — Admins can view every user's goal list for team reviews
- 💬 **Role-Based Access Control** — User experience changes based on account type
- 🌐 **Deployed Frontend & Backend** — Frontend hosted on Vercel, backend on Render, database on MongoDB Atlas

---

## 🛠️ Tech Stack

**Frontend**  
- React  
- React Router DOM  
- Bootstrap  
- Webpack  

**Backend**  
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT for authentication  
- Bcrypt for password hashing  
- CORS, dotenv

**Deployment**  
- Vercel (Frontend)  
- Render (Backend)  
- MongoDB Atlas (Database)

---

## 🔐 Admin Access

Admin credentials are created by seeding the MongoDB database with a script:

```bash
node seed.js
When an admin logs in:

They are redirected to a special dashboard showing all user goals.

Backend checks the role from the JWT and applies middleware to restrict access.

When a regular user logs in:

They are redirected to their own goal dashboard.

They can only view, update, or delete their own goals.

🧪 How to Run Locally
bash
Copy
Edit
# Clone the repo
git clone https://github.com/KaishaerMahemuti/Goals4Future.git

# Backend setup
cd server
npm install
touch .env
# Add your MONGO_URI and JWT_SECRET to .env

# Start the backend server
npm start

# Frontend setup
cd ../client
npm install
npm start
📁 Folder Structure
bash
Copy
Edit
Goals4Future/
│
├── client/           # Frontend (React + Webpack)
│   └── src/
│       └── components/
│
├── server/           # Backend (Express + MongoDB)
│   └── models/
│   └── routes/
│   └── middleware/
│
├── seed.js           # Seed script to create admin account
└── README.md
🙌 Acknowledgments
This project was built as part of my journey through the Future Code NYC x CodeSmith Software Engineering Residency.

📫 Contact
Kaishaer Mahemuti
📧 k.mahemuti@gmail.com


