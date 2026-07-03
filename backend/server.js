const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static("../frontend"));

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateContactPayload(payload) {
  const requiredFields = ["name", "email", "subject", "message"];
  const missingField = requiredFields.find((field) => !String(payload[field] || "").trim());

  if (missingField) {
    return `Please provide your ${missingField}.`;
  }

  if (!isEmail(payload.email)) {
    return "Please provide a valid email address.";
  }

  if (payload.message.length > 2000) {
    return "Message is too long. Please keep it under 2000 characters.";
  }

  return null;
}

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
  });
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const errorMessage = validateContactPayload(req.body || {});

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, email, subject, message } = req.body;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `
    });

    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Email service is not configured correctly yet." });
  }
});

app.listen(port, () => {
  console.log(`Portfolio email backend running on http://localhost:${port}`);
});
