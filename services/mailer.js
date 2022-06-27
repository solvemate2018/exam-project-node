const nodemailer = require("nodemailer");

async function getTransporter() {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "airexam@outlook.com",
      pass: "Examair123",
    },
  });

  return transporter;
}

async function confirmRegistration(receiver) {
  let transporter = await getTransporter();
  let info = await transporter.sendMail({
    from: '"Air Exam ✈️" <airexam@outlook.com>',
    to: receiver,
    subject: "Registration confirmation",
    text: `Welcome to AirExam ${receiver},\n Thank you for joining, and we are looking forward to work with you.\n Best regards,\n AirExam team!`,
  });
}

exports.confirmRegistration = confirmRegistration;
