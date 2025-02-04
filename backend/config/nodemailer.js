import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
configDotenv()

const transporter = nodemailer.createTransport({
   host:"smtp-relay.brevo.com",
   port:587,
   auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
   }   
});

export default transporter;
