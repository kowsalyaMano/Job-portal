import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const otpTemplate = fs.readFileSync(
  path.join(__dirname, "..", "templates", "otp.html"),
  "utf8"
);
dotenv.config();
export const sendPasswordResetEmail = (
  receiver,
  sender,
  ccReceiver,
  subject,
  content,
  details
) => {
  let templateView = "";
  var replacements = {};
  var template = "";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // const FROM_EMAIL = "aravinthselvaraj210@gmail.com";
  if (content == "job-temp") {
    template = handlebars.compile(otpTemplate);
    if (details) {
      replacements = {
        name: details.user_name,
        email:details.email,
        employee:details.employee,
        job:details.description
      };
    }
  }
  templateView = template(replacements);
  try {
    const mailOptions = {
      from: sender,
      to: receiver,
      cc: ccReceiver,
      subject: subject,
      html: templateView,
    };
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

export default sendPasswordResetEmail;
