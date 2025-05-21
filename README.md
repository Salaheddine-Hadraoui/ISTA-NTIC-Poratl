ISTA NTIC Beni Mellal - Institutional Academic Management Website
Overview
This project is a web application designed for ISTA NTIC Beni Mellal to improve the management of academic events, courses, and exam schedules. It aims to enhance administrative services and strengthen the interaction between the administration, teachers, and students.

Features
Event Management
Create, update, and view academic events with attributes such as start time, end time, and location.

Course Management
Search and browse courses based on filière. Courses are added and managed by authorized teachers or admins.

Student Information
Student profiles include filière, academic year (1st or 2nd year), and group name.

User Roles and Authentication
Two main user roles:

Admins: Full access to manage events, courses, and users.

Users (Students/Teachers): Access to view events and courses.
Registration supports Google and Microsoft accounts for easy and secure login.

Technologies Used
Frontend: React.js, Redux (for state management)

Backend: Laravel (PHP framework)

Database: MySQL

Authentication: Socialite for OAuth (Google and Microsoft login)

Others: RESTful API architecture for frontend-backend communication


Setup Instructions
Prerequisites
PHP >= 8.3

Composer

Node.js & npm

MySQL

XAMPP (optional, for local development environment)

Backend Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/ista-ntic-bm.git
cd ista-ntic-bm/backend
Install dependencies:

bash
Copy
Edit
composer install
Set up .env file based on .env.example and configure your database credentials.

Run migrations and seeders:

bash
Copy
Edit
php artisan migrate --seed
Serve the backend:

bash
Copy
Edit
php artisan serve
Frontend Setup
Navigate to frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the React development server:

bash
Copy
Edit
npm start
Usage
Visit the frontend URL (usually http://localhost:3000)

Register or login using Google or Microsoft accounts.

Access your dashboard depending on your role (Admin or User).

Admins can manage events, courses, and user data.

Users can view events and search for courses.

Future Improvements
Add notifications and reminders for upcoming events and exams.

Implement role-specific dashboards with tailored features.

Add support for event registration and attendance tracking.

Mobile-friendly responsive design.

License
This project is licensed under the MIT License.