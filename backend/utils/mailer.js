const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordEmail = async (to, password) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Your Account Password',
      text: `Your temporary password is: ${password}`,
    });
  } catch (error) {
    console.error(`Failed to send password email to ${to}:`, error.message);
    throw new Error('Failed to send email1');
  }
};

module.exports = sendPasswordEmail;
