import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClients, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  console.log(
    VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
  );

  const recipient = [{ email }];

  try {
    const response = await mailtrapClients.send({
      from: sender,
      to: recipient,
      subject: "Verification your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification", error);
    throw new Error("Error sending verification email: ", error);
  }
};
