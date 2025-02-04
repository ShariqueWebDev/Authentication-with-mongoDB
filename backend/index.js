import express from "express";
import { connectDB } from "./db/connectDB.js";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;
configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => {
  res.send("API Working fine");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port: ${port}`);
});

// zJIv1tDh86ynBuPb

// mongodb+srv://shariques966:zJIv1tDh86ynBuPb@cluster0.0lkma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://shariques966:zJIv1tDh86ynBuPb@cluster0.0lkma.mongodb.net/
