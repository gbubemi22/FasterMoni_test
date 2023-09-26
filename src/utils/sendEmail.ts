import nodemailer, { Transporter } from "nodemailer";

// Create a transporter using async/await
const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Verify the transporter
    await transporter.verify();

    return transporter;
  } catch (error) {
    console.error("Error creating email transporter:", error);
    throw error;
  }
};

// Function to send an email
const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"FASTMONI" ${process.env.USER}`,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email not sent:", error);
  }
};

export default sendEmail;
