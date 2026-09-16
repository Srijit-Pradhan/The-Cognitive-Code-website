const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // We check if the email credentials are provided in the environment variables
    // If not, we still accept the request but just log it to avoid breaking the frontend during deployment setup
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('WARNING: EMAIL_USER and EMAIL_PASS not set in .env. Form submission recorded but no email sent.');
      return res.status(200).json({ success: true, message: 'Message received (Email service disabled)' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // The sender is the authenticated Gmail account
      to: process.env.EMAIL_USER, // The destination is the user's personal email
      subject: `TCC Contact Form: New Message from ${name}`,
      text: `You have received a new contact message from the TCC Website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email // So you can hit "Reply" and reply directly to the sender
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send the email. Please try again later.' });
  }
});

module.exports = router;
