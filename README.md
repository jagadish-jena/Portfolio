# Jagadish Jena Portfolio

A modern personal portfolio website built to showcase projects, technical skills, and contact information in a clean and responsive design.

This project includes a React + Vite frontend and a Node.js + Express backend for handling the contact form and sending emails through Gmail using Nodemailer.

## Live Demo

[View the deployed portfolio](https://portfolio-beta-bice-58.vercel.app/)

## Overview

The portfolio is designed as a single-page application with sections for:

- Home / hero banner
- About
- Skills
- Projects
- Contact

It is built to look professional, feel lightweight, and work well on desktop and mobile devices.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS v4
- Lucide React icons

### Backend
- Node.js
- Express.js
- CORS
- dotenv
- Nodemailer

### Tools and Libraries
- Git + GitHub
- VS Code
- Postman (for API testing)
- Gmail SMTP for contact email delivery

### Why this stack?

- React + Vite provides a fast and modern frontend development experience.
- Tailwind CSS makes styling quick, flexible, and responsive without heavy custom CSS.
- Express handles the backend API cleanly and easily.
- Nodemailer allows the portfolio contact form to send real messages to your email inbox.

## Project Structure

```text
jagadish-jena-portfolio-tailwind/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── assets/
│       ├── index.css
│       └── main.jsx
├── .gitignore
├── README.md
└── package-lock.json
```

## Features

- Responsive layout for all screen sizes
- Modern dark-themed portfolio design
- Project showcase cards with links
- Resume download button
- Social links for GitHub and LinkedIn
- Working contact form powered by backend API
- Email notification delivery through Gmail

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (recommended v18 or above)
- npm
- A Gmail account with app-password support enabled

## Installation

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Install backend dependencies

```bash
cd ../backend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECEIVER_EMAIL=your-receiver-email@gmail.com
FRONTEND_URL=http://localhost:5173
PORT=5000
```

> Important: Use a Google App Password, not your normal Gmail password.

### Gmail Setup

1. Enable 2-Step Verification on your Google account.
2. Generate an App Password from Google Account settings.
3. Copy that password into `GMAIL_APP_PASSWORD`.
4. Keep your `.env` file private and never commit it to GitHub.

## Running the Project

### Start the backend

```bash
cd backend
npm run dev
```

### Start the frontend

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

Then open the local dev URL shown in the terminal, usually:

```text
http://localhost:5173
```

The frontend is configured to proxy API requests to the backend, so the contact form can reach:

```text
/api/contact
```

## Contact Form Flow

```text
Visitor → React Form → POST /api/contact → Express Server → Nodemailer → Gmail → Receiver Email
```

The sender's email is included as the `Reply-To` address so you can reply directly to the message sender.

## Deployment Notes

Before deploying the app:

- Update all portfolio links and project URLs in the frontend.
- Set the correct production backend URL for CORS and email configuration.
- Use environment variables securely in deployment settings.
- Ensure the backend is hosted on a server that supports Node.js.

## License

This project is for personal use and portfolio demonstration purposes.

## Author

Jagadish Jena

## Connect

- GitHub: https://github.com/jagadish-jena
- LinkedIn: https://www.linkedin.com/in/jagadish2408/
