import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

export async function GET(req) {

  const transporter = nodemailer.createTransport({
    service: "gmail", 
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
    return new NextResponse("Email sent successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to send email", { status: 500 });
  }

}




// import nodemailer from "nodemailer";
// import * as XLSX from "xlsx";

// import fs from "fs";

// export async function GET(req) {
//   try {
//     // Generate the XLSX file from user data
//     const userData = [
//       // Example user data, you should replace this with your actual user data
//       { id: "1", name: "John Doe", email: "john.doe@example.com" },
//       { id: "2", name: "Jane Doe", email: "jane.doe@example.com" },
//       // Add more user data as needed
//     ];

//     const ws = XLSX.utils.json_to_sheet(userData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Users");

//     // Generate a buffer for the file
//     const fileBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

//     // Save the file to disk (optional) or use the buffer directly
//     const filePath = "./userData.xlsx";
//     fs.writeFileSync(filePath, fileBuffer); // Save file locally, optional

//     // Create the transporter for sending the email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "nepathyalibrary@gmail.com",
//         pass: "gsnrtveeyhioeaep", // Please use environment variables for sensitive data like passwords
//       },
//     });

//     const mailOptions = {
//       from: '"Nepathya Library" <nepathyalibrary@gmail.com>',
//       to: "bhvnbhsl@gmail.com", // Recipient email address
//       subject: "User Data Excel File",
//       text: "Please find attached the user data in an Excel file.",
//       attachments: [
//         {
//           filename: "userData.xlsx",
//           content: fileBuffer, // Attach the file buffer directly
//           encoding: "base64", // This is optional, but helpful to handle binary data
//         },
//       ],
//     };

//     // Send the email with the attachment
//     await transporter.sendMail(mailOptions);

//     // Return a successful response
//     return new Response("Email sent successfully with the attachment!", { status: 200 });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return new Response("Failed to send email", { status: 500 });
//   }
// }
