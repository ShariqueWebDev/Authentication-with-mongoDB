import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const userAuth = async (req, res, next) => {
  try {
    // Check if token is available in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. No token found." });
    }

    
    console.log("Received Token:", token); //Debugging

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); //Debugging

    // Ensure the token has userId
    if (!decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid Token. User ID missing." });
    }

    // Fetch user from DB and exclude password field
    req.user = await userModel.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log(req.user, "Req.User....."); //Debugging

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

export default userAuth;
