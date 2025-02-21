// app/api/mail/route.js
import nodemailer from "nodemailer";

export async function GET(req) {
  // Create a transport object for sending email
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or any other email provider
    auth: {
      user: "nepathyalibrary@gmail.com",
      pass: "gsnrtveeyhioeaep",
    },
  });

  const mailOptions = {
    from: '"FaceTrack"<abcd@gmail.com>',
    // from: '"Nepathya Library" <nepathyalibrary@gmail.com>',
    to: "bhvnbhsl@gmail.com", 
    subject: "Test Email",
    text: "This is a test email sent every 2 minutes!",
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to send email", { status: 500 });
  }
}
