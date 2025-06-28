# Todo App

This is a full-stack Todo App built using Node.js, Express, and Vanilla HTML/CSS/JS.
It allows users to sign up, sign in, and create/manage todos, all stored in a JSON file for persistence.

📁 Project Structure

todo-app/
│
├── data.json               # Stores user data and todos
├── server.js               # Backend Express server
├── signup.html             # User registration UI
├── signin.html             # User login UI
├── dashboard.html          # Todo dashboard UI
├── README.md               # Project documentation


🚀 How to Run the App

1. Prerequisites
Node.js installed on your machine

Basic terminal/command line knowledge

2. Install Dependencies
No third-party libraries needed (besides built-in Node.js modules and axios via CDN):

npm init -y
npm install express path fs


3. Start the Server
   node server.js

The server will start on:
📡 http://localhost:3000

4. Access the App
Sign Up → http://localhost:3000/signup

Sign In → http://localhost:3000/signin

Dashboard → http://localhost:3000/dashboard (requires token)

🛠 Features
✅ User Registration (Username & Password)

🔐 User Authentication (Basic token-based)

📝 Create, Read, Update, Delete Todos

💾 Persistent Storage (via data.json)

💡 Front-end UI with Axios for API interaction

🎨 Responsive styling using modern CSS

📦 Server (Node.js + Express)
/signup → Registers a user and stores in data.json

/signin → Validates credentials, returns token

/dashboard → Validates token, returns personalized welcome

/dashboard/todos (GET/POST/DELETE) → Full todo management

📄 Frontend (HTML/CSS + Axios)
Uses Axios to send requests

Saves the token in localStorage

Renders todos dynamically

All actions (add/delete) update the server instantly

Headers:

Authorization token passed as:  auth: <user-token>

📌 Notes
Make sure data.json exists and is readable/writable by the server.

The app does not use hashing for passwords (not production-ready).

Token is a simple random string (not JWT or session-based).

