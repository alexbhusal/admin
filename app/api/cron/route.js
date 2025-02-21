import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nepathyalibrary@gmail.com",
      pass: "gsnrtveeyhioeaep",
    },
  });

  const mailOptions = {
    from: '"FaceTrack" <abcd@gmail.com>',
    to: "bhvnbhsl@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent every 2 minutes!",
  };

  try {
    await transporter.sendMail(mailOptions);
    return new NextResponse("Email sent successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to send email", { status: 500 });
  }
}
