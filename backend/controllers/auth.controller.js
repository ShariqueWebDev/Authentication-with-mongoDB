import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import transporter from "../config/nodemailer.js";
// import { sendVerificationEmail } from "../mailtrap/emails.js";

// Signup Api
export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.json({ sucess: false, message: "Missing Details" });
    }
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Generate Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Code Run",
      text: `Welcome to coderun website, Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "User signed up successfully" });

    // Sending Welcome Email
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// login api
export const login = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    // jwt
    generateTokenAndSetCookie(res, user._id);

    return res.json({ success: true, message: "User logged in successfully" });
  } catch (error) {}
};

// Logout Api Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({ success: true, message: "User logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send Email for OTP number
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Automatically extracted from middleware

    console.log(userId, ": userId in send verification"); // ✅ Debugging

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Send Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification OTP Sent to Email",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Verify email after user input
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user._id;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "" || null;
    user.verifyOtpExpireAt = null || 0;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Check user is Athenticated or not
export const isUserAthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User Athenticated!" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message || "User is not Athenticated",
    });
  }
};

// Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email is not found!" });
    }

    const resetOtp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = resetOtp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${resetOtp} Use this OTP to proceed with resetting your password.`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent on Email" });
  } catch (error) {
    return res.json({ success: false, message: "Otp Could not be send" });
  }
};

// Reset Password Api Controller
export const resetPassword = async (req, res) => {
  const { email, resetOtp, newPassword } = req.body;

  if (!email || !resetOtp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, New Password are required!",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found!",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== resetOtp) {
      return res.json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP Expired!",
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpireAt = null;

    user.save();

    return res.json({success:true, message:'Password has been reset successfully'})
    
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
