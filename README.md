# Feedback-Platform
This is a full-stack web application that allows users to submit anonymous feedback and explore what others have shared. Built with React, Tailwind CSS, Node.js, and PostgreSQL, the project demonstrates how forms collect and handle user input while enabling community interaction through voting.
## Features
**Submit Feedback**: Users enter their name, email, and a feedback message. After submission, a thank-you message confirms receipt.
**View Feedback**: A separate page displays anonymous feedback from others, along with upvote/downvote buttons to show agreement or disagreement.
**Vote Tracking**: Each feedback item shows how many users agree or disagree, helping surface the most relevant or popular opinions.
**Admin Moderation**: Includes a password-protected admin dashboard to approve or reject submitted feedback before it goes public.
and the secret code is `gudayadmin`
## Tech Stack
#### Frontend: React + Tailwind CSS
#### Backend: Node.js + Express
#### Database: PostgreSQL
## Learning Goals
#### Understand form handling and controlled components in React
#### Practice styling with Tailwind CSS
#### Build RESTful APIs with Express
#### Store and retrieve data using PostgreSQL
#### Implement voting logic and dynamic UI updates
## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/liaayuin/Feedback-Platform.git
```
### 2. Database Setup
```bash
cd feedback-platform-backend
```
Create a .env file in the feedback-platform-backend directory and add your database credentials:
`````
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=feedback_db
`````
### 3. Install Dependencies
```bash
cd feedback_platform_frontend
npm install
cd ../feedback-platform-backend
npm install
```
### 4. Run Both Services Simultaneously
I use the concurrently package to start both the React frontend and the NestJS backend with a single command from one of the folders.
```bash
cd feedback-platform-backend
npm run dev:all
```
-Frontend (React vite): Runs on `http://localhost:5173`
-Backend (NestJS API): Runs on `http://localhost:3000`
