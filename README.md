# Hematohub 🩸

## 🌟 Overview
**Hematohub** is a web-based blood bank management system built with the MERN stack (MongoDB, Express.js, React, Node.js). It aims to streamline blood donation, inventory tracking, and emergency request handling. This project replaces the manual processes traditionally used in blood donation and distribution with an intuitive and real-time platform for donors, hospitals, and administrators.

## 📌 Features

- 🔐 User authentication and role-based access (Donor, Hospital, Admin)
- 🧾 Donor registration and donation history tracking
- 🏥 Hospital blood request management
- 📦 Real-time blood inventory monitoring
- ⏰ Blood donation appointment scheduling
- 📢 Automated notifications and emergency alerts
- 🛠️ Contact support and user feedback mechanism
- 📱 Fully responsive and cross-device compatible

## 👥 User Roles

- **Donors**: Register, schedule donations, receive notifications, track history
- **Hospitals**: Request and manage blood inventory, access donation logs
- **Admins**: Approve requests, manage users and inventory
- **Developers**: Contribute new features or fix bugs

## 💻 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Language**: JavaScript


## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Anupamak004/Hematohub.git
cd Hematohub
```

### 2. Setup Backend
```bash
cd hematohub-be
npm install
```

Create a `.env` file inside the `/backend` directory and add the following variables:

```env
PORT=8080
MONGO_URI=your_mongo_db_uri_here

BREVO_EMAIL=your_brevo_email_here
BREVO_API_KEY=your_brevo_api_key_here

```
Run the server:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd ../hematohub-fe
npm install
npm run dev
```
---

## 📸 Screenshots
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
