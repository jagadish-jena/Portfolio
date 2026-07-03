# Cybersecurity Portfolio

This project is split into a frontend portfolio and a backend email API.

## Structure

```text
PORTFOLIO/
  frontend/
    index.html
    styles.css
    script.js
  backend/
    package.json
    server.js
    .env.example
```

## Frontend

Open `frontend/index.html` in the browser to view the portfolio, or run the backend and visit:

```text
http://localhost:5000
```

The contact form sends data to:

```text
/api/contact
```

## Backend

The backend receives contact form data, validates it, and forwards it to your email using Gmail OAuth2.

Setup steps:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Then edit `.env` with your Gmail OAuth2 client ID, client secret, refresh token, sender, and receiver details.
