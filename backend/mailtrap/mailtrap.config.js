import { MailtrapClient } from "mailtrap";
import { configDotenv } from "dotenv";
import path from "path";

// Load .env file explicitly from root
configDotenv({ path: path.resolve("./.env") });

// const TOKEN = process.env.MAILTRAP_TOKEN;
// const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

// console.log(
//   "Token: ",
//   process.env.MAILTRAP_TOKEN,
//   " ",
//   "Endpoint: ",
//   process.env.MAILTRAP_ENDPOINT
// );

export const mailtrapClients = new MailtrapClient({
  // endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Sharique Aslam",
};

// const recipients = [{ email: "shariques966@gmail.com" }];

// console.log("Using Mailtrap Token:", TOKEN); // Debug token

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then((response) => {
//     console.log("Email sent successfully:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending email:", error);
//   });
