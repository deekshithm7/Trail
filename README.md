# 🎓 Placement Management and Training System (MERN Stack)

A full-stack web application designed to streamline the **college placement process** and enhance **student training** through role-based access, test automation, resource sharing, and analytics.

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [🚀 Installation](#-installation)
- [🧪 Usage](#-usage)
- [👥 User Roles](#-user-roles)
- [🌐 API Structure](#-api-structure)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- 📚 **Training Resource Uploads** (Documents, Videos, Links)
- 🧠 **Auto-Graded Aptitude Tests**
- 📊 **Student & System Analytics**
- 🔐 **Role-Based Dashboards**
- 🧑‍🎓 **Student Progress Tracking**
- 🧑‍🏫 **Staff Advisor Approvals & Feedback**
- 👨‍💼 **Admin Management Panel**
- 👩‍💼 **Alumni Mentorship and Opportunities**
- 🔔 **Notifications for Jobs & Tests**
- 🔍 **Smart Search and Filters**

---

## 🧰 Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **Lucide-react** (Icons)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JWT Authentication**
- **Multer** (for file uploads)
- **dotenv** for environment config

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/placement-management-system.git
cd placement-management-system
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend` and add:

```
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the server:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

> Frontend runs on `http://localhost:3000`  
> Backend runs on `http://localhost:5000`

---

## 🧪 Usage

- 📥 **Admins**: Upload training resources, create tests, manage users and jobs.
- 🧑‍🎓 **Students**: Access learning materials, take tests, view their placement progress.
- 🧑‍🏫 **Staff Advisors**: Approve student data and monitor individual performance.
- 👨‍🎓 **Alumni**: Share job openings and guidance for juniors.

---

## 👥 User Roles

| Role        | Features |
|-------------|----------|
| **Student** | Take tests, access training, view jobs and placement stats. |
| **Admin** | Manage users, placements, resources, and test analytics. |
| **Staff Advisor** | Validate student details, monitor academic/progress reports. |
| **Alumni** | Share mentorship and job referrals. |

---

## 🌐 API Structure (Sample)

- `POST /api/auth/register` – User registration  
- `POST /api/auth/login` – User login  
- `GET /api/resources` – Fetch training materials  
- `POST /api/tests/submit` – Submit test answers  
- `GET /api/analytics/student/:id` – Student analytics  
- `GET /api/jobs` – Available job listings

---

## 📸 Screenshots

_Add screenshots of your UI here (dashboard, tests, admin panel, etc.)_

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repository
# Create a new branch (git checkout -b feature-name)
# Make your changes
# Commit (git commit -m "Add feature")
# Push (git push origin feature-name)
# Create a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
