🎓 Placement Management and Training System (MERN Stack)
A full-stack web application designed to streamline the college placement process and enhance student training through role-based access, test automation, resource sharing, and analytics.

📌 Table of Contents
✨ Features

🧰 Tech Stack

🚀 Installation

🧪 Usage

👥 User Roles

🌐 API Structure

📸 Screenshots

🤝 Contributing

📄 License

✨ Features
📚 Training Resource Uploads (Documents, Videos, Links)

🧠 Auto-Graded Aptitude Tests

📊 Student & System Analytics

🔐 Role-Based Dashboards

🧑‍🎓 Student Progress Tracking

🧑‍🏫 Staff Advisor Approvals & Feedback

👨‍💼 Admin Management Panel

👩‍💼 Alumni Mentorship and Opportunities

🔔 Notifications for Jobs & Tests

🔍 Smart Search and Filters

🧰 Tech Stack
Frontend
React.js

Tailwind CSS

Axios

Lucide-react (Icons)

Backend
Node.js

Express.js

MongoDB with Mongoose

JWT Authentication

Multer (for file uploads)

dotenv for environment config

🚀 Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/placement-management-system.git
cd placement-management-system
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file in /backend and add:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Run the server:

bash
Copy
Edit
npm start
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

🧪 Usage
📥 Admins: Upload training resources, create tests, manage users and jobs.

🧑‍🎓 Students: Access learning materials, take tests, view their placement progress.

🧑‍🏫 Staff Advisors: Approve student data and monitor individual performance.

👨‍🎓 Alumni: Share job openings and guidance for juniors.

👥 User Roles
Role	Features
Student	Take tests, access training, view jobs and placement stats.
Admin	Manage users, placements, resources, and test analytics.
Staff Advisor	Validate student details, monitor academic/progress reports.
Alumni	Share mentorship and job referrals.



📸 Screenshots
Add screenshots of your UI here (dashboard, tests, admin panel, etc.)

🤝 Contributing
Contributions are welcome!

bash
Copy
Edit
# Fork the repository
# Create a new branch (git checkout -b feature-name)
# Make your changes
# Commit (git commit -m "Add feature")
# Push (git push origin feature-name)
# Create a Pull Request
